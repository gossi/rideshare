import { Ride, RideState as State } from '@rideshare/ride';
import { DomainEventData, DomainEventHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type AcceptedData = DomainEventData & Pick<Ride, 'driverId' | 'state'>;

export const accepted: DomainEventHandler<RideState, AcceptedData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {
        driverId: { type: 'string' },
        state: { type: 'string', enum: [State.AwaitingPickup] }
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
      state: State.AwaitingPickup,
      driverId: domainEvent.data.driverId
    };
  }
};
