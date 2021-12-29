import { FlowUpdated } from '../definitions/flow-updated';
import { Infrastructure } from '../../infrastructure';
import { NotificationHandler } from 'wolkenkit';

const flowRidesUpdated: NotificationHandler<FlowUpdated, Infrastructure> = {
  isAuthorized (): boolean {
    return true;
  }
};

export { flowRidesUpdated };