import {Alert} from 'react-native';

export default ({status, message}) => {
  const title = status === 'success' ? 'Tap Successful' : 'Tap Failure';
  return Alert.alert(title, message, [{text: 'OK', onPress: () => {}}], {
    cancelable: true,
  });
};
