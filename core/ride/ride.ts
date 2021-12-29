export enum RideState {
  Requested = 'requested',
  AwaitingPickup = 'awaiting-pickup',
  Riding = 'riding',

  // termination states
  DriverNotFound = 'driver-not-found',
  Declined = 'declined',
  Finished = 'finished'

}

export interface Ride {
  id: string;
  from: string;
  to: string;
  state: RideState;
  riderId: string;
  driverId?: string;
}