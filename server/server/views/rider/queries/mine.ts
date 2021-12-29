import { Infrastructure } from '../../../infrastructure';
import { Readable } from 'stream';
import { QueryHandler, QueryResultItem, Schema } from 'wolkenkit';
import { RideState } from '@rideshare/ride';

export type AllResultItem = QueryResultItem;

export const mine: QueryHandler<AllResultItem, Infrastructure> = {
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
          enum: [
            RideState.Requested,
            RideState.Riding,
            RideState.AwaitingPickup,
            RideState.Declined,
            RideState.DriverNotFound,
            RideState.Finished
          ]
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
    // here we would filter by user
    return Readable.from(infrastructure.ask.viewStore.rides);
  },

  isAuthorized (): boolean {
    return true;
  }
};
