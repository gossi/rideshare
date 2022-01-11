import { NotificationService, NotificationSubscriber } from 'wolkenkit';
import { Infrastructure } from '../../../infrastructure';
import { FlowUpdated } from '../../../notifications/definitions/flow-updated';
import { ViewUpdated } from '../../../notifications/definitions/view-updated';

const flowRidesUpdatedNotificationSubscriber: NotificationSubscriber<FlowUpdated, Infrastructure> = {
  isRelevant ({ name }: { name: string }): boolean {
    return name === 'flowRidesUpdated';
  },

  async handle (data: FlowUpdated['data'], { notification }: {
    notification: NotificationService;
  }): Promise<void> {
    await notification.publish<ViewUpdated>('viewRidesUpdated', {});
  }
};

export { flowRidesUpdatedNotificationSubscriber };
