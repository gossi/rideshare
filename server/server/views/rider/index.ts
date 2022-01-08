import { open } from './queries/open';
import { ride } from './queries/ride';
import { View } from 'wolkenkit';

const rides: View = {
  queryHandlers: {
    open,
    ride
  },

  notificationSubscribers: {}
};

export default rides;
