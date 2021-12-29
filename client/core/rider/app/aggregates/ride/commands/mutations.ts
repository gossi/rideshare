import { gql } from 'glimmer-apollo';

export const REQUEST_RIDE = gql`
  mutation RequestRide($data: Rider_ride_requestT0!) {
    command {
      rider_ride_request(data: $data) {
        aggregateIdentifier {
          id
        }
      }
    }
  }
`;

export type RequestRideMutation = {
  __typename?: 'Mutation';

  command: {
    rider_ride_request: {
      aggregateIdentifier: {
        id: string;
      };
    };
  } | null;
};

export type RequestRideMutationVariables = {
  data: {
    from: string;
    to: string;
    riderId: string;
  };
};
