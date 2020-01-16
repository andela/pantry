import React from 'react';
import {View, StyleSheet} from 'react-native';

const Layout = ({children}) => <View style={styles.container}>{children}</View>;

const styles = StyleSheet.create({
  container: {
    marginTop: 50,
    marginBottom: 50,
    width: '100%',
    marginLeft: 10,
    marginRight: 10,
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default Layout;
