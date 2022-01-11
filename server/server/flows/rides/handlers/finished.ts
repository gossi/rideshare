import { FlowHandler } from 'wolkenkit';
import { DeclinedData } from '../../../domain/people/ride/events';
import { Infrastructure } from '../../../infrastructure';
import { FlowUpdated } from '../../../notifications/definitions/flow-updated';

const handleRideFinished: FlowHandler<DeclinedData, Infrastructure> = {
  isRelevant ({ fullyQualifiedName }): boolean {
    return fullyQualifiedName === 'people.ride.finished';
  },

  async handle(domainEvent, { infrastructure, notification }): Promise<void> {
    const id = domainEvent.aggregateIdentifier.id;
    const ride = infrastructure.tell.viewStore.rides.find(ride => ride.id === id);

    ride!.state = domainEvent.data.state;

    await notification.publish<FlowUpdated>('flowRidesUpdated', {});

    return;
  }
};

export { handleRideFinished };
