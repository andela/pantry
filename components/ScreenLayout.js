import React from 'react';
import {ScrollView, StyleSheet} from 'react-native';

const ScreenLayout = ({children, isBlue}) => (
  <ScrollView contentContainerStyle={styles.container}>{children}</ScrollView>
);

ScreenLayout.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flex: 1,
    backgroundColor: '#f7f7f7',
  },
});

export default ScreenLayout;
