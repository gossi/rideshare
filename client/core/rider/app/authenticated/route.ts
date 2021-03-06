import { action } from '@ember/object';
import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import { service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';
import { useMachine } from 'ember-statecharts';
import { RidesMachine } from './flows';

export default class AuthenticatedRoute extends Route {
  @service declare session: Session;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  @action
  openRide(_context: unknown, { id }: { type: string; id: string }): void {
    this.transitionTo('authenticated.ride', { id });
  }

  flow = useMachine(this, () => {
    return {
      machine: RidesMachine.withConfig({
        actions: {
          openRide: this.openRide
        }
      })
    };
  });

  model() {
    return {
      flow: this.flow
    };
  }
}
