import { Ride } from '@rideshare/ride';
import { Resource } from 'ember-resources';
import { useQuery } from 'glimmer-apollo';
import { gql } from 'glimmer-apollo';

export const RIDES = gql`
  query Rides {
    rider {
      mine {
        id
        from
        to
        state
      }
    }
  }
`;

export type RidesQuery = {
  __typename?: 'Query';
  rider: {
    mine: Pick<Ride, 'id' | 'from' | 'to' | 'state'>[];
  };
};

export type RidesQueryVariables = Record<string, unknown>;

export class RidesResource extends Resource {
  // constructor(owner: unknown, args: RideArgs, previous: RidesResource) {
  //   super(owner, args, previous);

  //   console.log('ride resource', args);
  // }

  query = useQuery<RidesQuery, RidesQueryVariables>(this, () => [RIDES]);

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
    return this.query.data?.rider.mine;
  }
}
