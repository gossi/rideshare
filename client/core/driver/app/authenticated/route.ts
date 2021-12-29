import Transition from '@ember/routing/-private/transition';
import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';

export default class AuthenticatedRoute extends Route {
  @service declare session: Session;

  beforeModel(transition: Transition) {
    this.session.requireAuthentication(transition, 'login');
  }
}
