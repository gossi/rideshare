import { gql } from 'glimmer-apollo';

export const REQUEST_RIDE = gql`
  mutation RequestRide($input: NoteInput!) {
    command {
      rides_ride_request(input: $input) {
        id
        title
        description
      }
    }
  }
`;
