import Session from 'ember-simple-auth/services/session';
import { tracked } from '@glimmer/tracking';
import { UserType } from '@rideshare/user';
import type { User } from '@rideshare/user';

export default class SessionService extends Session {
  @tracked user?: User;

  async setup() {
    await super.setup();
    this.loadUser();
  }

  loadUser() {
    const data = this.data?.authenticated;

    if (data && data.as) {
      if (data.as === UserType.Driver) {
        this.user = {
          id: UserType.Driver,
          name: 'Dan Driver',
          type: UserType.Driver
        };
      }

      if (data.as === UserType.Rider) {
        this.user = {
          id: UserType.Rider,
          name: 'Ron Rider',
          type: UserType.Rider
        };
      }
    }
  }
}
