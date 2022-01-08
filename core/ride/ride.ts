export enum RideState {
  Requested = 'requested',
  AwaitingPickup = 'awaiting-pickup',
  Driving = 'driving',

  /** Ride is finished */
  Finished = 'finished',

  /** Rider declined the ride */
  Declined = 'declined',
  /** Rider canceled the request */
  Canceled = 'canceled',

  /** Requested timed out, no driver found */
  DriverNotFound = 'driver-not-found'
}

export interface Ride {
  id: string;
  from: string;
  to: string;
  state: RideState;
  riderId: string;
  driverId?: string;
}