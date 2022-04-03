import { storage } from './localStorage';

const AUTH_KEY = 'auth';

export const auth = {
  set(authStatus) {
    storage.set(AUTH_KEY, authStatus);
  },
  delete() {
    storage.delete(AUTH_KEY);
  },
  get() {
    return storage.get(AUTH_KEY);
  },
};
