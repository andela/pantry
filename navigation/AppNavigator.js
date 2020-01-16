import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import MainTabNavigator, {AuthStack} from './MainTabNavigator';

// screens
import AuthLoadingScreen from '../screens/AuthLoadingScreen';

// eslint-disable-next-line no-unused-vars
const navigators = [
  {
    AuthLoading: AuthLoadingScreen,
    Main: MainTabNavigator,
    Auth: AuthStack,
  },
  {
    initialRouteName: 'AuthLoading',
  },
];

export default createAppContainer(
  // createSwitchNavigator(...navigators)
  createSwitchNavigator({Main: MainTabNavigator}),
);
