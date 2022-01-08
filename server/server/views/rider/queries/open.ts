import { Infrastructure } from '../../../infrastructure';
import { Readable } from 'stream';
import { QueryHandler, QueryResultItem, Schema } from 'wolkenkit';
import { RideState } from '@rideshare/ride';

export type AllResultItem = QueryResultItem;

const OPEN_STATES = [
  RideState.Requested,
  RideState.Driving,
  RideState.AwaitingPickup
];

export const open: QueryHandler<AllResultItem, Infrastructure> = {
  type: 'stream',

  getResultItemSchema (): Schema {
    return {
      type: 'object',
      properties: {
        id: {
          type: "string"
        },
        from: {
          type: "string"
        },
        to: {
          type: "string",
        },
        state: {
          type: "string",
          enum: OPEN_STATES
        },
        riderId: {
          type: "string"
        },
        driverId: {
          type: "string"
        }
      },
      required: [],
      additionalProperties: false
    };
  },

  async handle(options, { infrastructure }): Promise<Readable> {
    // get the rides
    let rides = infrastructure.ask.viewStore.rides;

    // filter by states
    rides = rides.filter(ride => OPEN_STATES.includes(ride.state));
    
    // here we would filter by user
    // @TODO

    // return them
    return Readable.from(rides);
  },

  isAuthorized (): boolean {
    return true;
  }
};
