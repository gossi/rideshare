import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';

export default class LoginRoute extends Route {
  @service declare session: Session;

  beforeModel() {
    // this.session.prohibitAuthentication('application');
  }
}
