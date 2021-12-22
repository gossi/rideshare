import Controller from '@ember/controller';
import UserAbility from '@rideshare/client/aggregates/user/abilities/user';
import { di } from '@rideshare/client/utils/container';
import { inject as service } from '@ember/service';
import Session from 'ember-simple-auth/services/session';
import { action } from '@ember/object';

export default class ApplicationController extends Controller {
  @service declare session: Session;

  @di
  userAbility = new UserAbility();

  @action
  logout() {
    this.session.invalidate();
  }
}
