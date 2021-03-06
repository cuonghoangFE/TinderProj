import React from 'react';
import {StyleSheet, StatusBar} from 'react-native';
import SafeAreaView from 'react-native-safe-area-view';

import AppProvider from './src/core/AppProvider';
import AppContainer from './src/modules/Navigation';
import withRequestNetwork from './src/core/RequestNetwork';

const App = () => (
  <AppProvider>
    <StatusBar barStyle="dark-content" />
    <SafeAreaView style={styles.safeArea} forceInset={{bottom: 'never'}}>
      <AppContainer />
    </SafeAreaView>
  </AppProvider>
);

export default withRequestNetwork(App);

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: 'white',
  },
});
