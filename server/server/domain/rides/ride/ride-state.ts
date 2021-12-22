import { GetInitialState, State } from 'wolkenkit';

export enum RideStatus {
  Requested = 'requested',
  Declined = 'declined',
  
}

export interface RideState extends State {
  from: string;
  to: string;
  status: RideStatus;
}


export const getInitialState: GetInitialState<RideState> = function (): RideState {
  return {
    from: '',
    to: '',
    status: RideStatus.Requested
  };
};
