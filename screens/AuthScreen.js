import React, {useState} from 'react';
import {
  View,
  TouchableHighlight,
  StyleSheet,
  TextInput,
  Text,
  ActivityIndicator,
} from 'react-native';

import MonoText from '../components/StyledText';
import ScreenLayout from '../components/ScreenLayout';
import {PANTRY_AUTH_URL} from '../constants/Url';

const AuthScreen = ({navigation}) => {
  const [value, onChangeText] = useState('');
  const [loading, setLoading] = useState(false);

  const login = async () => {
    try {
      setLoading(true);
      const opts = {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({passPhrase: value}),
      };
      await fetch(PANTRY_AUTH_URL, opts);
      setLoading(false);
      navigation.navigate('Main');
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  return (
    <ScreenLayout isBlue>
      <View style={styles.container}>
        <Text style={styles.authText}>Pantry App</Text>

        <MonoText style={styles.passPhraseText}>
          Sign in with the passphrase below!
        </MonoText>

        <TextInput
          style={styles.textInput}
          onChangeText={text => onChangeText(text)}
          value={value}
          secureTextEntry={true}
          placeholder={'Enter Passphrase'}
          disabl
        />

        {loading ? (
          <ActivityIndicator />
        ) : (
          <TouchableHighlight style={styles.button} onPress={login}>
            <Text style={styles.signInText}>SignIn!</Text>
          </TouchableHighlight>
        )}
      </View>
    </ScreenLayout>
  );
};

AuthScreen.navigationOptions = {
  header: null,
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#FFF',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 10,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
    borderRadius: 9,
    width: 400,
    height: 400,
    justifyContent: 'center',
    alignItems: 'center',
  },
  authText: {
    color: '#000',
    marginBottom: 10,
    fontSize: 30,
  },
  textInput: {
    width: '90%',
    borderColor: 'gray',
    borderWidth: 3,
    height: 50,
    padding: 10,
    marginBottom: 40,
    fontSize: 20,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#7CABF9',
    padding: 10,
    borderRadius: 5,
    width: 150,
  },
  signInText: {
    fontWeight: 'bold',
    fontSize: 20,
    textTransform: 'uppercase',
  },
  passPhraseText: {marginBottom: 10},
});

export default AuthScreen;
