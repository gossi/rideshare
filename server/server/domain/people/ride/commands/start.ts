import { CommandData, CommandHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type StartData = CommandData;

export const start: CommandHandler<RideState, StartData, Infrastructure> = {
  getSchema (): Schema {
    return {
      type: 'object',
      properties: {},
      additionalProperties: false
    };
  },

  isAuthorized (): boolean {
    return true;
  },

  handle (state, command, { aggregate, error }): void {
    if (!aggregate.isPristine()) {
      throw new error.CommandRejected('Ride was already started.');
    }

    aggregate.publishDomainEvent<StartData>('started', {});
  }
};
