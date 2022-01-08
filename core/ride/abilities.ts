import { isDriver, isRider, User } from '@rideshare/user';
import { Ride, RideState } from './ride';

export function canAccept(ride: Ride, user: User) {
  return ride.state === RideState.Requested && isDriver(user);
}

export function canCancel(ride: Ride, user: User) {
  return ride.state === RideState.Requested && isRider(user);
}

export function canStart(ride: Ride, user: User) {
  return ride.state === RideState.AwaitingPickup && isDriver(user);
}

export function canDecline(ride: Ride, user: User) {
  return ride.state === RideState.AwaitingPickup && isRider(user);
}

export function canFinish(ride: Ride, user: User) {
  return ride.state === RideState.Driving && isDriver(user);
}
