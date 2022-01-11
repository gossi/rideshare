import { service } from '@ember/service';
import Component from '@glimmer/component';
import SessionService from '@rideshare/auth/services/session';
import { Ride, RideMachine } from '@rideshare/ride';
import RideAbility from '@rideshare/rider/aggregates/ride/ability';
import CancelRide from '@rideshare/rider/aggregates/ride/commands/cancel';
import { di } from '@rideshare/rider/utils/container';
import { User } from '@rideshare/user';
import { command, commandFor } from 'ember-command';
import { useResource } from 'ember-resources';
import { useMachine } from 'ember-statecharts';
import { RideResource } from './resource';

interface RideScreenArgs {
  id: string;
}

export default class RideScreenComponent extends Component<RideScreenArgs> {
  @service declare session: SessionService;

  @di
  ability = new RideAbility();

  get ride(): Ride | undefined {
    return this.resource.ride;
  }

  resource = useResource(this, RideResource, () => {
    return {
      id: this.args.id,
      flow: this.flow
    };
  });

  flow = useMachine(this, () => {
    return {
      machine: RideMachine.withContext({
        ride: this.ride,
        user: this.session.user as User
      })
    };
  });

  // actions
  @command
  cancel = commandFor(new CancelRide(this.ride as Ride));
}
