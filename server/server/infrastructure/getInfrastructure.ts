import { Infrastructure } from '.';
import { Ride } from '@rideshare/ride';
// import { processenv } from 'processenv';
// import { Collection, MongoClient } from 'mongodb';

const getInfrastructure = async function (): Promise<Infrastructure> {
  // const url = processenv('MONGODB_URL') as string;
  let rides: Ride[] = [];

  // if (url) {
  //   const connection = await MongoClient.connect(url, {
  //     // eslint-disable-next-line id-length
  //     w: 1
  //   });

  //   rides = connection.db().collection('rides');
  // }

  return {
    ask: {
      viewStore: {
        rides
      }
    },
    tell: {
      viewStore: {
        rides
      }
    }
  };
};

export { getInfrastructure };
