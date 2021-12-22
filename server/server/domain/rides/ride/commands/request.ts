import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';
import { CommandData, CommandHandler, Schema } from 'wolkenkit';

export type RequestRideCommandData = CommandData;

export const request: CommandHandler<RideState, RequestRideCommandData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {},
      required: [],
      additionalProperties: false
    };
  },

  isAuthorized (): boolean {
    return true;
  },

  handle (): void {
    // ...
  }
};
