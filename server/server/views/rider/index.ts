import { mine } from './queries/mine';
import { ride } from './queries/ride';
import { View } from 'wolkenkit';

const rides: View = {
  queryHandlers: {
    mine,
    ride
  },

  notificationSubscribers: {}
};

export default rides;
