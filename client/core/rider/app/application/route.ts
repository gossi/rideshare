import Route from '@ember/routing/route';
import { inject as service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';

export default class ApplicationRoute extends Route {
  @service declare session: SessionService;

  async beforeModel() {
    await this.session.setup();
  }
}
