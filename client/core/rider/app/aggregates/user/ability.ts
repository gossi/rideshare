import { service } from '@ember/service';
import SessionService from '@rideshare/rider/services/session';
import { isDriver, isRider } from '@rideshare/user';

export class UserAbility {
  @service declare session: SessionService;

  isDriver = () => {
    return Boolean(this.session.user && isDriver(this.session.user));
  };

  isRider = () => {
    return Boolean(this.session.user && isRider(this.session.user));
  };
}
