/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

// AppProvider.js
import React, {useContext} from 'react';
import Storage from '../utils/storage';
import userAction from '../actions/user';

const AppContext = React.createContext();

export function withApp(Component) {
  return props => {
    return <Component {...props} {...useContext(AppContext)} />;
  };
}

const AppContextProvider = ({children}) => (
  <AppContext.Provider
    value={{
      userStore: userAction.userStore({}),
      myFavoritesStore: Storage.useAsyncStorage('myFavorites', []),
    }}>
    {children}
  </AppContext.Provider>
);

export default AppContextProvider;
