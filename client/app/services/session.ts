import Session from 'ember-simple-auth/services/session';
import { tracked } from '@glimmer/tracking';
import { User, UserType } from '@rideshare/client/aggregates/user';

export default class SessionService extends Session {
  @tracked user?: User;

  handleAuthentication(routeAfterAuthentication: string): void {
    const data = this.data?.authenticated;
    const route =
      data?.as === UserType.Driver
        ? 'authenticated.driver'
        : data?.as === UserType.Rider
        ? 'authenticated.rider'
        : routeAfterAuthentication;

    // eslint-disable-next-line ember/classic-decorator-no-classic-methods
    this.set('attemptedTransition', null);
    super.handleAuthentication(route);

    this.loadUser();
  }

  handleInvalidation(routeAfterInvalidation: string): void {
    super.handleInvalidation(routeAfterInvalidation);

    this.user = undefined;
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
