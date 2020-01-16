import React from 'react';
import {Platform} from 'react-native';
import {createStackNavigator} from 'react-navigation-stack';
import {createBottomTabNavigator} from 'react-navigation-tabs';

import TabBarIcon from '../components/TabBarIcon';
import HomeScreen from '../screens/HomeScreen';
import ReportScreen from '../screens/ReportScreen';
import AuthScreen from '../screens/AuthScreen';

const config = Platform.select({
  web: {headerMode: 'screen'},
  default: {},
});

const TapStack = createStackNavigator(
  {
    Home: HomeScreen,
  },
  config,
);

TapStack.navigationOptions = {
  tabBarLabel: 'Tap',
  tabBarIcon: ({focused}) => (
    <TabBarIcon
      focused={focused}
      // name={
      //   Platform.OS === 'ios'
      //     ? `ios-information-circle${focused ? '' : '-outline'}`
      //     : 'md-information-circle'
      // }
      name={'md-bonfire'}
    />
  ),
};

TapStack.path = '';

const ReportStack = createStackNavigator(
  {
    Report: ReportScreen,
  },
  config,
);

ReportStack.navigationOptions = {
  tabBarLabel: 'Report',
  tabBarIcon: ({focused}) => (
    // since I dpn't care about ios
    <TabBarIcon
      focused={focused}
      name={`md-information-circle${focused ? '-outline' : ''}`}
    />
  ),
};

ReportStack.path = '';

export const AuthStack = createStackNavigator({Auth: AuthScreen});

AuthStack.path = '';

const tabNavigator = createBottomTabNavigator({
  TapStack,
  ReportStack,
});

tabNavigator.path = '';

export default tabNavigator;
