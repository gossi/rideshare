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

// type LocateEvent =
//   | { type: 'LOCATE_ME'; locate: boolean }
//   | { type: 'GEOPOSITON' };

// interface LocateContext {
//   coords?: [number, number];
// }

// export const LocateMachine = createMachine<LocateContext, LocateEvent>(
//   {
//     initial: 'unknown',
//     context: {
//       coords: undefined
//     },
//     states: {
//       unknown: {
//         on: {
//           LOCATE_ME: 'located'
//         },
//         always: [
//           {
//             target: 'located',
//             cond: 'isOnRequest'
//           },
//           {
//             target: 'unlocated'
//           }
//         ]
//       },
//       located: {
//         initial: 'idle',
//         states: {
//           idle: {
//             entry: [
//               send((_context, event) => {
//                 if (event.locate) {
//                   return {
//                     type: 'GEOPOSITON'
//                   };
//                 }
//                 return { type: undefined };
//               })
//             ],
//             on: {
//               GEOPOSITON: 'busy'
//             }
//           },
//           busy: {
//             entry: [
//               assign({
//                 coords: undefined
//               })
//             ],
//             invoke: {
//               src: 'getGeoposition',
//               onDone: 'success',
//               onError: 'error'
//             }
//           },
//           success: {
//             entry: [
//               assign({
//                 coords: (
//                   _context: unknown,
//                   event: {
//                     type: string;
//                     data: {
//                       coords: {
//                         latitude: number;
//                         longitude: number;
//                       };
//                     };
//                   }
//                 ) => {
//                   return [
//                     event.data.coords.latitude,
//                     event.data.coords.longitude
//                   ];
//                 }
//               })
//             ],
//             on: {
//               GEOPOSITON: 'busy'
//             }
//           },
//           error: {
//             on: {
//               GEOPOSITON: 'busy'
//             }
//           }
//         }
//       },
//       unlocated: {
//         on: {
//           LOCATE_ME: {
//             target: 'located',
//             actions: ['transitionToRequest']
//           }
//         }
//       }
//     }
//   },
//   {
//     actions: {
//       locateMe() {
//         // implement me
//       },

//       transitionToRequest() {
//         // implement this
//         console.log('implement this');
//       }
//     },
//     services: {
//       async getGeoposition(): Promise<void> {
//         // implement me
//       }
//     },
//     guards: {
//       isOnRequest() {
//         // implement me
//         return false;
//       }
//     }
//   }
// );
