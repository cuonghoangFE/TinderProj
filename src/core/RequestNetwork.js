/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// AppProvider.js
import React, {Component} from 'react';
import {Alert} from 'react-native';

import apiInstance from '../utils/API.js';
import commonUtils from '../utils/common';

export default WrappedComponent =>
  class RequestNetwork extends Component {
    constructor() {
      super();

      const onRequestSuccess = config => {
        return config;
      };
      const onRequestError = err => Promise.reject(err);
      const onResponseSuccess = response => response;
      // eslint-disable-next-line handle-callback-err
      const onResponseError = err => {
        /**
         * Handle error
         */
        // const statusCode = err.status || err.response.data.code;
        // if (statusCode === 403 || statusCode === 401) {
        // Handle for error authenticate
        // }
        // if (statusCode === 500) {
        // Handle for server internal error
        // }
        // ...More to come
        // return Promise.reject(err);
        Alert.alert(
          'Alert',
          err.response.data.code + ': ' + err.response.data.description ||
            'Something went wrong',
        );
      };

      this.apiRequestInterceptor = apiInstance.interceptors.request.use(
        onRequestSuccess,
        onRequestError,
      );
      this.apiResponseInterceptor = apiInstance.interceptors.response.use(
        onResponseSuccess,
        commonUtils.debounce(onResponseError, 500),
      );
    }

    componentWillUnmount() {
      apiInstance.interceptors.request.eject(this.apiRequestInterceptor);
      apiInstance.interceptors.request.eject(this.apiResponseInterceptor);
    }

    render() {
      return <WrappedComponent />;
    }
  };
