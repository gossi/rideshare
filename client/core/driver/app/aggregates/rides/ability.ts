import SessionService from '@rideshare/driver/services/session';
import { inject as service } from '@ember/service';
import { UserType } from '@rideshare/driver/aggregates/user';

export default class RideAbility {
  @service declare session: SessionService;

  canRequestRide = () => {
    return this.session.user?.type === UserType.Rider;
  };
}
