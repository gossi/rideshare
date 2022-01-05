import { service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';
import {
  RequestRideMutation,
  RequestRideMutationVariables,
  REQUEST_RIDE
} from '@rideshare/rider/aggregates/ride/commands/mutations';
import { RidesStatechart } from '@rideshare/rider/authenticated/flows';
import { Command } from 'ember-command';
import { useMutation } from 'glimmer-apollo';
import { User } from '../../user';

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

    const id = response?.command?.rider_ride_request.aggregateIdentifier.id;
    if (id) {
      this.#flow.send('OPEN', { id });
    }
  }
}
