import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet} from 'react-native';

const AuthLoadingScreen = props => {
  const bootstrapAsync = async () => {
    // const userToken = await AsyncStorage.getItem('userToken');
    const userToken = false;

    props.navigation.navigate(userToken ? 'Main' : 'Auth');
  };

  useEffect(() => {
    bootstrapAsync();
  });

  return (
    <View style={styles.container}>
      <ActivityIndicator />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default AuthLoadingScreen;
