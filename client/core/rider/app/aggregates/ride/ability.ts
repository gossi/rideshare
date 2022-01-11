import { service } from '@ember/service';
import SessionService from '@rideshare/auth/services/session';
import { canCancel, canDecline } from '@rideshare/ride';
import { UserType } from '@rideshare/user';
import { User } from '../user';
import { Ride } from './ride';

export default class RideAbility {
  @service declare session: SessionService;

  canRequest = (user: User) => {
    return user?.type === UserType.Rider;
  };

  canDecline = (ride: Ride) => {
    return canDecline(ride, this.session.user as User);
  };

  canCancel = (ride: Ride) => {
    return canCancel(ride, this.session.user as User);
  };
}
