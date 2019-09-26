// utils/API.js

import AsyncStorage from '@react-native-community/async-storage';
import {useEffect, useState} from 'react';

const setItem = (key, value) =>
  AsyncStorage.setItem(key, JSON.stringify(value));

const getItem = async key => {
  const value = await AsyncStorage.getItem(key);

  if (!value || typeof value !== 'string') {
    throw new Error(`${key} was not found!`);
  }

  return JSON.parse(value);
};

const removeItem = async key => AsyncStorage.removeItem(key);

const clearAll = async () => AsyncStorage.clear();

// const useAsyncStorage = <T>(key: string, defaultValue: T): [T, (newValue: T) => void, boolean]
const useAsyncStorage = (key, defaultValue) => {
  const [state, setState] = useState({
    synced: false,
    storageValue: defaultValue,
  });
  const {synced, storageValue} = state;

  const pullFromStorage = async () => {
    getItem(key)
      .then(itemValue => setState({synced: true, storageValue: itemValue}))
      .catch(e => console.log(e.message));
  };

  const updateStorage = async newValue => {
    setState({synced: false, storageValue: newValue});
    setItem(key, newValue);
  };

  useEffect(() => {
    pullFromStorage();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return [storageValue, updateStorage, synced];
};

export default {
  useAsyncStorage,
  setItem,
  getItem,
  removeItem,
  clearAll,
};
