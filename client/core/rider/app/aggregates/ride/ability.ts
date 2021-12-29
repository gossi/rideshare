import { UserType } from '@rideshare/user';
import { User } from '../user';

export default class RideAbility {
  canRequestRide(user: User) {
    return user?.type === UserType.Rider;
  }
}
