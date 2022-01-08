import { Ride, RideState as State } from '@rideshare/ride';
import { DomainEventData, DomainEventHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type StartedData = DomainEventData & Pick<Ride, 'state'>;

export const started: DomainEventHandler<RideState, StartedData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {
        driverId: { type: 'string' },
        state: { type: 'string', enum: [State.Driving] }
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
      state: State.Driving
    };
  }
};
