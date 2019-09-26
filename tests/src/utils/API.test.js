import apiInstance, {
  setAuthToken,
  clearAuthToken,
} from '../../../src/utils/API.js';

describe('apiInstance', () => {
  describe('setAuthToken method', () => {
    it('will assign Authorization token to header', () => {
      const token = 'Bearer 1234567890';
      setAuthToken(token);
      expect(apiInstance.defaults.headers.common.Authorization).toEqual(token);
    });
  });

  describe('clearAuthToken method', () => {
    it('will delete Authorization token from header', () => {
      clearAuthToken();
      expect(apiInstance.defaults.headers.common.Authorization).toBe(undefined);
    });
  });
});
