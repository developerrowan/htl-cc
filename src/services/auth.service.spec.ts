import { beforeEach, describe, expect, it } from 'vitest';
import { login, logout } from './auth.service';

const CURRENT_USER_ID_KEY = 'currentUserId';
const AUTH_EXPIRATION_EPOCH_KEY = 'authExpirationEpoch';
const TEST_USER_ID = 'a-user-id';

beforeEach(() => {
  localStorage.clear();
});

describe('Authentication service', () => {
  describe('login', () => {
    it('should supply user ID and auth expiration fields in localStorage', () => {
      login(TEST_USER_ID);

      expect(localStorage.getItem(CURRENT_USER_ID_KEY)).toBeTruthy();
      expect(localStorage.getItem(CURRENT_USER_ID_KEY)).toStrictEqual(TEST_USER_ID);

      expect(localStorage.getItem(AUTH_EXPIRATION_EPOCH_KEY)).toBeTruthy();
      expect(+localStorage.getItem(AUTH_EXPIRATION_EPOCH_KEY)).toBeLessThanOrEqual(Date.now() + 60 * 1000);
    });
  });

  describe('logout', () => {
    it('should clear user ID and auth expiration fields in localStorage, without deleting the keys', () => {
      logout();

      expect(localStorage.getItem(CURRENT_USER_ID_KEY)).toBeDefined();
      expect(localStorage.getItem(CURRENT_USER_ID_KEY)).toStrictEqual('');

      expect(localStorage.getItem(AUTH_EXPIRATION_EPOCH_KEY)).toBeDefined();
      expect(localStorage.getItem(AUTH_EXPIRATION_EPOCH_KEY)).toStrictEqual('');
    });
  });
});
