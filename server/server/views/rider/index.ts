import { View } from 'wolkenkit';
import { flowRidesUpdatedNotificationSubscriber } from './notification-subscribers/flow-rides-updated';
import { open } from './queries/open';
import { ride } from './queries/ride';

const rides: View = {
  queryHandlers: {
    open,
    ride
  },

  notificationSubscribers: {
    flowRidesUpdatedNotificationSubscriber
  }
};

export default rides;
