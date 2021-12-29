import { UserType } from '@rideshare/user';
import Base from 'ember-simple-auth/authenticators/base';

const KEY = 'auth';

export default class SayYesAuthenticator extends Base {
  restore() {
    const as = window.localStorage.getItem(KEY);

    if (as) {
      return Promise.resolve({ as });
    }

    return Promise.reject();
  }

  authenticate({ as }: { as: UserType }) {
    window.localStorage.setItem(KEY, as);
    return Promise.resolve({ as });
  }

  invalidate() {
    window.localStorage.removeItem(KEY);
    return Promise.resolve();
  }
}
