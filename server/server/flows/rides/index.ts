import { Flow } from 'wolkenkit';
import {
  handleRideAccepted,
  handleRideCanceled,
  handleRideDeclined,
  handleRideFinished,
  handleRideRequested,
  handleRideStarted
} from './handlers';

const rides: Flow = {
  replayPolicy: 'always',

  domainEventHandlers: {
    handleRideAccepted,
    handleRideCanceled,
    handleRideDeclined,
    handleRideFinished,
    handleRideRequested,
    handleRideStarted
  }
};

export default rides;