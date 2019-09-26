import {configure} from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

configure({adapter: new Adapter()});

let items = {};

jest
  .mock('react-native-safe-area-view', () => 'SafeAreaView')
  .mock('@react-native-community/async-storage', () => ({
    setItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        items[item] = value;
        resolve(value);
      });
    }),
    multiSet: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        items[item] = value;
        resolve(value);
      });
    }),
    getItem: jest.fn((item, value) => {
      return new Promise((resolve, reject) => {
        resolve(items[item]);
      });
    }),
    multiGet: jest.fn(item => {
      return new Promise((resolve, reject) => {
        resolve(items[item]);
      });
    }),
    removeItem: jest.fn(item => {
      return new Promise((resolve, reject) => {
        resolve(delete items[item]);
      });
    }),
    getAllKeys: jest.fn(items => {
      return new Promise(resolve => {
        resolve(items.keys());
      });
    }),
    clear: jest.fn(() => {
      return new Promise((resolve, reject) => resolve((items = {})));
    }),
  }))
  .mock('react-native-reanimated', () => 'Animated')
  .mock('@fortawesome/react-native-fontawesome', () => 'FontAwesomeIcon')
  .mock('react-navigation', () => ({
    createAppContainer: jest
      .fn()
      .mockReturnValue(function NavigationContainer(props) {
        return null;
      }),
    createDrawerNavigator: jest.fn(),
    createMaterialTopTabNavigator: jest.fn(),
    createStackNavigator: jest.fn(),
    StackActions: {
      push: jest
        .fn()
        .mockImplementation(x => ({...x, type: 'Navigation/PUSH'})),
      replace: jest
        .fn()
        .mockImplementation(x => ({...x, type: 'Navigation/REPLACE'})),
    },
    NavigationActions: {
      navigate: jest.fn().mockImplementation(x => x),
    },
  }))
  .mock('react-navigation-tabs', () => ({
    createBottomTabNavigator: jest.fn(),
  }));
