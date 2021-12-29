import { FlowHandler } from 'wolkenkit';
import { FlowUpdated } from '../../../notifications/definitions/flow-updated';
import { Infrastructure } from '../../../infrastructure';
import { Ride, RideState } from '@rideshare/ride';
import { RequestedData } from '../../../domain/rider/ride/events/requested';

const handleRideRequested: FlowHandler<RequestedData, Infrastructure> = {
  isRelevant ({ fullyQualifiedName }): boolean {
    return fullyQualifiedName === 'rider.ride.requested';
  },

  async handle (domainEvent, { infrastructure, notification }): Promise<void> {
    const ride: Ride = {
      id: domainEvent.aggregateIdentifier.id,
      from: domainEvent.data.from,
      to: domainEvent.data.to,
      riderId: domainEvent.data.riderId,
      state: RideState.Requested
    };

    infrastructure.tell.viewStore.rides.push(ride);

    await notification.publish<FlowUpdated>('flowRidesUpdated', {});

    return;
  }
};

export { handleRideRequested };