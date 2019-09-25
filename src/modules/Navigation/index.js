import {createAppContainer} from 'react-navigation';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import HomeScreen from '../Home';
import FavoriteScreen from '../Favorite';

const AppNavigator = createBottomTabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Favorite: {
      screen: FavoriteScreen,
    },
  },
  {
    tabBarOptions: {
      showIcon: false,
      activeTintColor: 'green',
      style: {
        alignItems: 'center',
      },
    },
  },
);

export default createAppContainer(AppNavigator);
