import { Ride, RideState as State } from '@rideshare/ride';
import { DomainEventData, DomainEventHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type RequestedData = DomainEventData & Pick<Ride, 'from' | 'to' | 'riderId'>;

export const requested: DomainEventHandler<RideState, RequestedData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {
        from: { type: 'string' },
        to: { type: 'string' },
        riderId: { type: 'string' },
        state: { type: 'string', enum: [State.AwaitingPickup] }
      },
      required: ['from', 'to', 'riderId'],
      additionalProperties: false
    };
  },

  isAuthorized (): boolean {
    return true;
  },

  handle (state, domainEvent): Partial<RideState> {
    return {
      ...state,
      from: domainEvent.data.from,
      to: domainEvent.data.to,
      riderId: domainEvent.data.riderId
    };
  }
};
