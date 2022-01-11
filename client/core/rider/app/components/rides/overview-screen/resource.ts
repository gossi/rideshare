import { Ride } from '@rideshare/ride';
import { Resource } from 'ember-resources';
import { useQuery } from 'glimmer-apollo';
import { gql } from 'glimmer-apollo';

export const RIDES = gql`
  query Rides {
    rider {
      open {
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
    open: Pick<Ride, 'id' | 'from' | 'to' | 'state'>[];
  };
};

export type RidesQueryVariables = Record<string, unknown>;

export class RidesResource extends Resource {
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
    return this.query.data?.rider.open;
  }
}
