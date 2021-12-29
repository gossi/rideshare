// import { Collection } from 'mongodb';
import { getInfrastructure } from './getInfrastructure';
import { setupInfrastructure } from './setupInfrastructure';
import { AskInfrastructure, TellInfrastructure } from 'wolkenkit';
import { Ride } from '@rideshare/ride';

export interface Infrastructure extends AskInfrastructure, TellInfrastructure {
  ask: {
    viewStore: {
      rides: Ride[];
    };
  };
  tell: {
    viewStore: {
      rides: Ride[];
    };
  };
}

export default { getInfrastructure, setupInfrastructure };
