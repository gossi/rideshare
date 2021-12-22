import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';
import { DomainEventData, DomainEventHandler, Schema } from 'wolkenkit';

export type RideRequestedDomainEventData = DomainEventData;

export const requested: DomainEventHandler<RideState, RideRequestedDomainEventData, Infrastructure> = {
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

  handle (): Partial<RideState> {
    return {
      // ...
    };
  }
};
