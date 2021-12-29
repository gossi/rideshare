import { action } from '@ember/object';
import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';
import { matchesState, useMachine } from 'ember-statecharts';
import { RidesMachine } from './flows';

export default class AuthenticatedRoute extends Route {
  @service declare session: Session;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
  }

  @action
  openRide(_context: unknown, { id }: { type: string; id: string }): void {
    console.log('open ride @ route', id);

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

  @matchesState('rides', 'flow') rides?: boolean;
  @matchesState('request', 'flow') request?: boolean;
  @matchesState('ride', 'flow') ride?: boolean;

  model() {
    return {
      flow: this.flow,
      rides: this.rides,
      request: this.request,
      ride: this.ride
    };
  }
}
