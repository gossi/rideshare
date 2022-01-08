import { User, UserType } from './user';

export function isRider(user: User) {
  return user.type === UserType.Rider;
}

export function isDriver(user: User) {
  return user.type === UserType.Driver;
}
