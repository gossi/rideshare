import BaseSessionService from '@rideshare/auth/services/session';

export default class SessionService extends BaseSessionService {
  handleAuthentication(routeAfterAuthentication: string): void {
    const data = this.data?.authenticated;
    const route = data?.as ? 'authenticated' : routeAfterAuthentication;

    this.attemptedTransition = null;
    super.handleAuthentication(route);

    this.loadUser();
  }

  handleInvalidation(routeAfterInvalidation: string): void {
    super.handleInvalidation(routeAfterInvalidation);

    this.user = undefined;
  }
}
