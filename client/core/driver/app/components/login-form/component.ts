import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { UserType } from '@rideshare/driver/aggregates/user/user';
import Session from 'ember-simple-auth/services/session';

export default class LoginComponent extends Component {
  @service declare session: Session;

  @action
  loginAsRider() {
    this.session.authenticate('authenticator:say-yes', {
      as: UserType.Rider
    });
  }

  @action
  loginAsDriver() {
    this.session.authenticate('authenticator:say-yes', {
      as: UserType.Driver
    });
  }
}
