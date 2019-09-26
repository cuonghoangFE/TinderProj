import React from 'react';
import {renderHook} from '@testing-library/react-hooks';
import {act} from 'react-test-renderer';

import AsyncStorage from '@react-native-community/async-storage';
import storageUtils from '../../../src/utils/storage.js';

describe('storageUtils', () => {
  describe('setItem method', () => {
    it('will save storage with key and JSON stringify value', () => {
      storageUtils.setItem('key', true);
      expect(AsyncStorage.setItem).toBeCalledWith('key', 'true');
    });
  });

  describe('getItem method', () => {
    it('will save storage with key and JSON stringify value', async () => {
      AsyncStorage.getItem.mockResolvedValue('true');
      const returnValue = await storageUtils.getItem('key');
      expect(returnValue).toBeTruthy();
    });

    test('will throw error when value undefined or not save before', async () => {
      AsyncStorage.getItem.mockResolvedValue(undefined);
      await expect(storageUtils.getItem('key')).rejects.toThrow();
    });
  });

  describe('removeItem method', () => {
    it('will remove item from storage', async () => {
      await storageUtils.removeItem('key');
      expect(AsyncStorage.removeItem).toBeCalledWith('key');
    });
  });

  describe('clearAll method', () => {
    it('will clear all item in storage', async () => {
      await storageUtils.clearAll();
      expect(AsyncStorage.clear).toBeCalled();
    });
  });

  describe('useAsyncStorage method', () => {
    
    it('will setState with default value when not found key in store', () => {
      const setState = jest.fn();
      const useStateSpy = jest.spyOn(React, 'useState');
      useStateSpy.mockImplementation(init => [init, setState]);

      const {result} = renderHook(() =>
        storageUtils.useAsyncStorage('test', ''),
      );

      act(() => {
        result.current[1]('new title');
      });

      expect(result.current[0]).toBe('');
    });
  });
});
