import { FlowHandler } from 'wolkenkit';
import { AcceptedData } from '../../../domain/people/ride/events';
import { Infrastructure } from '../../../infrastructure';
import { FlowUpdated } from '../../../notifications/definitions/flow-updated';

const handleRideAccepted: FlowHandler<AcceptedData, Infrastructure> = {
  isRelevant ({ fullyQualifiedName }): boolean {
    return fullyQualifiedName === 'people.ride.accepted';
  },

  async handle(domainEvent, { infrastructure, notification }): Promise<void> {
    const id = domainEvent.aggregateIdentifier.id;
    const ride = infrastructure.tell.viewStore.rides.find(ride => ride.id === id);

    ride!.driverId = domainEvent.data.driverId;
    ride!.state = domainEvent.data.state;

    await notification.publish<FlowUpdated>('flowRidesUpdated', {});

    return;
  }
};

export { handleRideAccepted };
