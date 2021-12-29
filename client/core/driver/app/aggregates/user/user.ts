export enum UserType {
  // eslint-disable-next-line no-unused-vars
  Rider = 'rider',
  // eslint-disable-next-line no-unused-vars
  Driver = 'driver'
}

export interface User {
  id: string;
  name: string;
  type: UserType;
}
