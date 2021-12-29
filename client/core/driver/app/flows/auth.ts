import { createMachine } from 'xstate';

export const AUTH_FLOW = {
  initial: 'unauthenticated',
  states: {
    unauthenticated: {
      on: {
        AUTHENTICATE: 'authenticating'
      }
    },
    authenticating: {
      entry: ['authenticate'],
      on: {
        AUTHENTICATED: 'authenticated',
        ERROR: 'unauthenticated'
      }
    },
    authenticated: {}
  }
};

export default createMachine(AUTH_FLOW);
