import { CommandData, CommandHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type DeclineData = CommandData;

export const decline: CommandHandler<RideState, DeclineData, Infrastructure> = {
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
      throw new error.CommandRejected('Ride was already declined.');
    }

    aggregate.publishDomainEvent<DeclineData>('declined', {});
  }
};
