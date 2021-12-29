import Controller from '@ember/controller';
import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';

export default class ApplicationController extends Controller {
  @service declare session: SessionService;

  @action
  logout() {
    this.session.invalidate();
  }
}
