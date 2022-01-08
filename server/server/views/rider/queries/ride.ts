import { Infrastructure } from '../../../infrastructure';
import { Readable } from 'stream';
import { QueryHandler, QueryResultItem, Schema } from 'wolkenkit';
import { RideState } from '@rideshare/ride';

export interface RideResultItem extends QueryResultItem {

}

interface RideQuery {
  id: string;
}

export const ride: QueryHandler<RideResultItem, Infrastructure, RideQuery> = {
  type: 'value',

  getOptionsSchema(): Schema {
    return {
      type: 'object',
      properties: {
        id: { type: "string" }
      },
      required: ['id'],
      additionalProperties: false,
    }
  },

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
            RideState.Driving,
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
      required: ['id'],
      additionalProperties: false
    };
  },

  async handle(options, { infrastructure }) {
    return infrastructure.ask.viewStore.rides.find((ride) => ride.id === options.id);
  },

  isAuthorized (): boolean {
    return true;
  }
};
