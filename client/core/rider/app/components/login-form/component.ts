import { action } from '@ember/object';
import { inject as service } from '@ember/service';
import Component from '@glimmer/component';
import { UserType } from '@rideshare/user';
import Session from 'ember-simple-auth/services/session';

export default class LoginComponent extends Component {
  @service declare session: Session;

  @action
  login() {
    this.session.authenticate('authenticator:say-yes', {
      as: UserType.Rider
    });
  }
}
