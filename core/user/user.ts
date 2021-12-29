export enum UserType {
  Rider = 'rider',
  Driver = 'driver'
}

export interface User {
  id: string;
  name: string;
  type: UserType;
}
