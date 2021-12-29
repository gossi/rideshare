import { flowRidesUpdated } from './handlers/flow-rides-updated';
import { Notifications } from 'wolkenkit';
import { viewRidesUpdated } from './handlers/view-rides-updated';

const notifications: Notifications = {
  flowRidesUpdated,
  viewRidesUpdated
};

export default notifications;