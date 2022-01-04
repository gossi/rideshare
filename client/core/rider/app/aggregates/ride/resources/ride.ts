import { RideState } from '@rideshare/ride';
import { ArgsWrapper, Resource } from 'ember-resources';
import { useQuery } from 'glimmer-apollo';
import { gql } from 'glimmer-apollo';

export const OPEN_RIDE = gql`
  query OpenRide($id: String!) {
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

export type OpenRideQuery = {
  __typename?: 'Query';
  rider: {
    ride: {
      id: string;
      from: string;
      to: string;
      state: RideState;
    }[];
  };
};

export type OpenRideQueryVariables = {
  id: string;
};

interface RideArgs extends ArgsWrapper {
  positional: [string];
}

export class RideResource extends Resource<RideArgs> {
  constructor(owner: unknown, args: RideArgs, previous: RideResource) {
    super(owner, args, previous);

    console.log('ride resource', args);
  }

  get id() {
    return this.args.positional[0];
  }

  query = useQuery<OpenRideQuery, OpenRideQueryVariables>(this, () => [
    OPEN_RIDE,
    {
      variables: { id: this.id }
    }
  ]);

  get loading() {
    return this.query.loading;
  }

  get error() {
    return this.query.error;
  }

  get network() {
    return this.query.networkStatus;
  }

  get data() {
    return this.query.data?.rider.ride[0];
  }
}
