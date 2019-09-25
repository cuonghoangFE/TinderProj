/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import AppProvider from './src/core/AppProvider';
import AppContainer from './src/modules/Navigation';

export default class App extends React.Component {
  render() {
    return (
      <AppProvider>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={styles.safeArea} forceInset={{bottom: 'never'}}>
          <AppContainer />
        </SafeAreaView>
      </AppProvider>
    );
  }
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});
