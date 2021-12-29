import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';

export default class LoginRoute extends Route {
  @service declare session: SessionService;

  beforeModel() {
    this.session.prohibitAuthentication('authenticated');
  }
}
