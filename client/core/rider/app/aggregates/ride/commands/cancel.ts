import { service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';
import { Ride } from '@rideshare/ride';
import { Command } from 'ember-command';
import { gql, useMutation } from 'glimmer-apollo';

export const CANCEL = gql`
  mutation CancelRide($id: String!) {
    command {
      people_ride_cancel(aggregateIdentifier: { id: $id }) {
        id
      }
    }
  }
`;

export type CancelRideMutation = {
  __typename?: 'Mutation';

  command: {
    people_ride_cancel: {
      id: string;
    };
  } | null;
};

export type CancelRideMutationVariables = {
  id: string;
};

export default class CancelRide extends Command {
  @service declare session: SessionService;

  #ride: Ride;

  requestRide = useMutation<CancelRideMutation, CancelRideMutationVariables>(
    this,
    () => [CANCEL, {}]
  );

  constructor(ride: Ride) {
    super();

    this.#ride = ride;
  }

  async execute(data: FormData): Promise<void> {
    await this.requestRide.mutate({
      id: this.#ride.id
    });
  }
}
