import { service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';
import { RidesStatechart } from '@rideshare/rider/authenticated/flows';
import { Command } from 'ember-command';
import { gql, useMutation } from 'glimmer-apollo';
import { User } from '../../user';

export const REQUEST_RIDE = gql`
  mutation RequestRide($data: People_ride_requestT0!) {
    command {
      people_ride_request(data: $data) {
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
    people_ride_request: {
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

export default class RequestRide extends Command {
  @service declare session: SessionService;

  #flow: RidesStatechart;

  requestRide = useMutation<RequestRideMutation, RequestRideMutationVariables>(
    this,
    () => [REQUEST_RIDE, {}]
  );

  constructor(flow: RidesStatechart) {
    super();
    this.#flow = flow;
  }

  async execute(data: FormData): Promise<void> {
    const response = await this.requestRide.mutate({
      data: {
        to: data.get('to') as string,
        from: data.get('from') as string,
        riderId: (this.session.user as User).id
      }
    });

    const id = response?.command?.people_ride_request.aggregateIdentifier.id;
    if (id) {
      this.#flow.send('OPEN', { id });
    }
  }
}
