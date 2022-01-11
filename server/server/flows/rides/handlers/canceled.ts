import { FlowHandler } from 'wolkenkit';
import { CanceledData } from '../../../domain/people/ride/events';
import { Infrastructure } from '../../../infrastructure';
import { FlowUpdated } from '../../../notifications/definitions/flow-updated';

const handleRideCanceled: FlowHandler<CanceledData, Infrastructure> = {
  isRelevant ({ fullyQualifiedName }): boolean {
    return fullyQualifiedName === 'people.ride.canceled';
  },

  async handle(domainEvent, { infrastructure, notification }): Promise<void> {
    const id = domainEvent.aggregateIdentifier.id;
    const ride = infrastructure.tell.viewStore.rides.find(ride => ride.id === id);

    ride!.state = domainEvent.data.state;

    await notification.publish<FlowUpdated>('flowRidesUpdated', {});

    return;
  }
};

export { handleRideCanceled };
