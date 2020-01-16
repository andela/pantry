import React from 'react';
import {StyleSheet} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import Colors from '../constants/Colors';

export default function TabBarIcon(props) {
  return (
    <Ionicons
      name={props.name}
      size={26}
      style={styles.icon}
      color={props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

const styles = StyleSheet.create({
  icon: {marginBottom: -3},
});
