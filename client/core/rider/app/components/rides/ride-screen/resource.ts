import { Ride, RideContext, RideEvent, RideState } from '@rideshare/ride';
import { tracked } from 'ember-deep-tracked';
import { ArgsWrapper, Resource } from 'ember-resources';
import { gql, useQuery } from 'glimmer-apollo';
import { Statechart } from 'ember-statecharts/-private/usables';
import { subscribeToEvent } from '@rideshare/rider/data/events';

type LocalRide = Pick<Ride, 'id' | 'from' | 'to' | 'state'> &
  Partial<Pick<Ride, 'riderId' | 'driverId'>>;

export const RIDE = gql`
  query Ride($id: String!) {
    rider {
      ride(options: { id: $id }) {
        id
        from
        to
        state
      }
    }
  }
`;

export type RideQuery = {
  __typename?: 'Query';
  rider: {
    ride: LocalRide[];
  };
};

export type RideQueryVariables = {
  id: string;
};

interface RideArgs extends ArgsWrapper {
  named: {
    id: string;
    flow: Statechart<RideContext, never, RideEvent>;
  };
}

interface StateChangeEvent {
  state: RideState;
}

export class RideResource extends Resource<RideArgs> {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  @tracked ride?: Ride = {};

  get id() {
    return this.args.named.id;
  }

  get flow() {
    return this.args.named.flow;
  }

  query = useQuery<RideQuery, RideQueryVariables>(this, () => [
    RIDE,
    {
      variables: { id: this.id },
      onComplete: (data) => {
        const ride = data?.rider.ride[0] as LocalRide;

        this.ride = {
          id: ride.id,
          from: ride.from,
          to: ride.to,
          state: ride.state
        } as Ride;
      }
    }
  ]);

  accepted = subscribeToEvent<StateChangeEvent>(
    this,
    'people.ride.accepted',
    this.id,
    (data) => {
      if (this.ride) {
        this.ride.state = data.state;
        this.flow.send('ACCEPT');
      }
    }
  );

  started = subscribeToEvent<StateChangeEvent>(
    this,
    'people.ride.started',
    this.id,
    (data) => {
      if (this.ride) {
        this.ride.state = data.state;
        this.flow.send('START');
      }
    }
  );

  get loading() {
    return this.query.loading;
  }

  get error() {
    return this.query.error;
  }

  get network() {
    return this.query.networkStatus;
  }
}
