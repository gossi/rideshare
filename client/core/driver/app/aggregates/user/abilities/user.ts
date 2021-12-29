import { inject as service } from '@ember/service';
import SessionService from '@rideshare/driver/services/session';
import { UserType } from '@rideshare/driver/aggregates/user';

export default class UserAbility {
  @service declare session: SessionService;

  isAuthenticated = () => {
    return this.session.isAuthenticated;
  };

  isDriver = () => {
    return this.session.user?.type === UserType.Driver;
  };

  isRider = () => {
    return this.session.user?.type === UserType.Rider;
  };
}
