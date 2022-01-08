import { Aggregate } from 'wolkenkit';
import {
  accept,
  cancel,
  decline,
  finish,
  request,
  start
} from './commands';
import {
  accepted,
  canceled,
  declined,
  finished,
  requested,
  started
} from './events';
import { getInitialState, RideState } from './ride-state';

const ride: Aggregate<RideState> = {
  getInitialState,
  commandHandlers: {
    accept,
    cancel,
    decline,
    finish,
    request,
    start
  },
  domainEventHandlers: {
    accepted,
    canceled,
    declined,
    finished,
    requested,
    started
  }
};

export default ride;