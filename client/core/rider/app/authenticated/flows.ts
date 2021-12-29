import { Statechart } from 'ember-statecharts/-private/usables';
import { createMachine, EventObject, StateSchema } from 'xstate';

export type RidesStatechart = Statechart<
  unknown,
  StateSchema<unknown>,
  EventObject
>;

export const RIDES = {
  initial: 'rides',
  states: {
    rides: {
      on: {
        REQUEST: 'request',
        OPEN: 'ride'
      }
    },
    request: {
      on: {
        OPEN: 'ride'
      }
    },
    ride: {
      entry: 'openRide',
      on: {
        CLOSE: 'rides'
      }
    }
  }
};

export const RidesMachine = createMachine(RIDES, {
  actions: {
    openRide() {
      // implement this
      console.log('implement this');
    }
  }
});
