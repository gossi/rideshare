import { Ride } from '@rideshare/ride';
import { CommandData, CommandHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type AcceptData = CommandData & Pick<Ride, 'driverId'>;

export const accept: CommandHandler<RideState, AcceptData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {
        driverId: { type: 'string' }
      },
      required: ['driverId'],
      additionalProperties: false
    };
  },

  isAuthorized (): boolean {
    return true;
  },

  handle (state, command, { aggregate, error }): void {
    if (!aggregate.isPristine()) {
      throw new error.CommandRejected('Ride was already accepted.');
    }

    aggregate.publishDomainEvent<AcceptData>('accepted', {
      driverId: command.data.driverId
    });
  }
};
