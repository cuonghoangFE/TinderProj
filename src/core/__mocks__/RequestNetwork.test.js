import {Alert} from 'react-native';
import {
  onRequestSuccess,
  onRequestError,
  onResponseSuccess,
  onResponseError,
} from '../../../src/core/RequestNetwork.js';

describe('RequestNetwork', () => {
  describe('onRequestSuccess method', () => {
    it('should return value', () => {
      expect(onRequestSuccess('a')).toEqual('a');
    });
  });

  describe('onRequestError method', () => {
    it('should return promise reject', async () => {
      expect.assertions(1);
      expect(onRequestError('error string')).rejects.toEqual('error string')
    });
  });

  describe('onResponseSuccess method', () => {
    it('should return value', () => {
      expect(onResponseSuccess('a')).toEqual('a');
    });
  });

  describe('onResponseError method', () => {
    it('should show alert modal', () => {
      Alert.alert = jest.fn();
      onResponseError({
        response: {
          data: {
            code: 500,
            description: 'Server internal error',
          },
        },
      });

      expect(Alert.alert).toBeCalledWith('Alert', '500: Server internal error');
    });

    it('should show alert modal with error message', () => {
      Alert.alert = jest.fn();
      onResponseError({message: 'Something went wrong'});

      expect(Alert.alert).toBeCalledWith('Alert', 'Something went wrong');
    });
  });
});
