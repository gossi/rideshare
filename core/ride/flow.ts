import { User } from '@rideshare/user';
import { createMachine } from 'xstate';
import { canAccept, canCancel, canDecline, canFinish, canStart } from './abilities';
import { Ride, RideState } from './ride';

type RideEvent =
  | { type: 'ACCEPT' }
  | { type: 'CANCEL' }
  | { type: 'TIME_OUT' }
  | { type: 'START' }
  | { type: 'DECLINE' }
  | { type: 'FINISH' };

interface RideContext {
  user: User;
  ride: Ride;
}

export const RideMachine = createMachine<RideContext, RideEvent>({
  initial: RideState.Requested,
  states: {
    [RideState.Requested]: {
      on: {
        ACCEPT: {
          target: RideState.AwaitingPickup,
          cond: 'canAccept'
        },
        CANCEL: {
          target: RideState.Canceled,
          cond: 'canCancel'
        },
        TIME_OUT: RideState.DriverNotFound
      }
    },
    [RideState.AwaitingPickup]: {
      on: {
        START: {
          target: RideState.Driving,
          cond: 'canStart'
        },
        DECLINE: {
          target: RideState.Declined,
          cond: 'canDecline'
        }
      }
    },
    [RideState.Driving]: {
      on: {
        FINISH: {
          target: RideState.Finished,
          cond: 'canFinish'
        }
      }
    },
    [RideState.Finished]: {},
    [RideState.DriverNotFound]: {},
    [RideState.Declined]: {},
    [RideState.Canceled]: {}
  }
}, {
  guards: {
    canAccept(context) {
      return canAccept(context.ride, context.user);
    },
    canCancel(context) {
      return canCancel(context.ride, context.user);
    },
    canStart(context) {
      return canStart(context.ride, context.user);
    },
    canDecline(context) {
      return canDecline(context.ride, context.user);
    },
    canFinish(context) {
      return canFinish(context.ride, context.user);
    }
  }
});
