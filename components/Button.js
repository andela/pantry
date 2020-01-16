import React from 'react';
import {Text, TouchableHighlight} from 'react-native';

const Button = ({onPress, btnStyle, textStyle, text}) => (
  <TouchableHighlight onPress={onPress} style={btnStyle} underlayColor={'#fff'}>
    <Text style={textStyle}>{text}</Text>
  </TouchableHighlight>
);

export default Button;
