import { Aggregate } from 'wolkenkit';
import { request } from './commands/request';
import { requested } from './events/requested';
import { getInitialState, RideState } from './ride-state';

const ride: Aggregate<RideState> = {
  getInitialState,
  commandHandlers: {
    request
  },
  domainEventHandlers: {
    requested
  }
};

export default ride;