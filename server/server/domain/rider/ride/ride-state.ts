import { GetInitialState, State } from 'wolkenkit';
import { Ride, RideState as RideStatus } from '@rideshare/ride';

export interface RideState extends State, Pick<Ride, 'from' | 'to' | 'state' | 'riderId'> {
}

export const getInitialState: GetInitialState<RideState> = function (): RideState {
  return {
    from: '',
    to: '',
    state: RideStatus.Requested,
    riderId: ''
  };
};
