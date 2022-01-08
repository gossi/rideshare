import { CommandData, CommandHandler, Schema } from 'wolkenkit';
import { Infrastructure } from '../../../../infrastructure';
import { RideState } from '../ride-state';

export type CancelData = CommandData;

export const cancel: CommandHandler<RideState, CancelData, Infrastructure> = {
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
      throw new error.CommandRejected('Ride was already canceled.');
    }

    aggregate.publishDomainEvent<CancelData>('canceled', {});
  }
};
