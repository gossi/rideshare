import { Infrastructure } from '../../infrastructure';
import { NotificationHandler } from 'wolkenkit';
import { ViewUpdated } from '../definitions/view-updated';

const viewRidesUpdated: NotificationHandler<ViewUpdated, Infrastructure> = {
  isAuthorized (): boolean {
    return true;
  }
};

export { viewRidesUpdated };