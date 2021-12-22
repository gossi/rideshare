import { all } from './queries/all';
import { View } from 'wolkenkit';

const rides: View = {
  queryHandlers: {
    all
  },

  notificationSubscribers: {}
};

export default rides;
