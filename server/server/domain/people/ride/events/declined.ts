import { Ride, RideState as State } from '@rideshare/ride';
import { DomainEventData, DomainEventHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type DeclinedData = DomainEventData & Pick<Ride, 'state'>;

export const declined: DomainEventHandler<RideState, DeclinedData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {
        driverId: { type: 'string' },
        state: { type: 'string', enum: [State.Declined] }
      },
      additionalProperties: false
    };
  },

  isAuthorized (): boolean {
    return true;
  },

  handle (state, domainEvent): Partial<RideState> {
    return {
      ...state,
      state: State.Declined
    };
  }
};
