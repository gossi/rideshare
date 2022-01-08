import { Ride } from '@rideshare/ride';
import { CommandData, CommandHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type RequestData = CommandData & Pick<Ride, 'from' | 'to' | 'riderId'>;

export const request: CommandHandler<RideState, RequestData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {
        from: { type: 'string', description: 'Start of the ride' },
        to: { type: 'string' },
        riderId: { type: 'string' }
      },
      required: ['from', 'to', 'riderId'],
      additionalProperties: false
    };
  },

  isAuthorized (): boolean {
    return true;
  },

  handle (state, command, { aggregate, error }): void {
    if (!command.data.from) {
      throw new error.CommandRejected('From is missing.');
    }

    if (!command.data.to) {
      throw new error.CommandRejected('To is missing.');
    }

    if (!command.data.riderId) {
      throw new error.CommandRejected('Rider is missing.');
    }

    if (!aggregate.isPristine()) {
      throw new error.CommandRejected('Ride was already requested.');
    }

    aggregate.publishDomainEvent<RequestData>('requested', {
      from: command.data.from,
      to: command.data.to,
      riderId: command.data.riderId
    });
  }
};
