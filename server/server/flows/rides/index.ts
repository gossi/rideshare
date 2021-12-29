import { Flow } from 'wolkenkit';
import { handleRideRequested } from './handlers/requested';

const rides: Flow = {
  replayPolicy: 'always',

  domainEventHandlers: {
    handleRideRequested
  }
};

export default rides;