import React from 'react';
import {Text, StyleSheet} from 'react-native';

const MonoText = props => (
  // TODO: Remove this or use to replace normal text!
  <Text {...props} style={[props.style, styles.textStyle]} />
);

const styles = StyleSheet.create({});

export default MonoText;
