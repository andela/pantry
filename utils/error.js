import {Alert} from 'react-native';

export default errorMessage => {
  return Alert.alert(
    'Error Occured',
    errorMessage,
    [{text: 'OK', onPress: () => console.log('OK Pressed')}],
    {cancelable: true},
  );
};
