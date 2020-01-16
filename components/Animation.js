import React, {forwardRef} from 'react';
import LottieView from 'lottie-react-native';
import {View, StyleSheet} from 'react-native';

import {
  REPORT_ANIMATION_NAME,
  LOADER_ANIMATION_NAME,
  DORMANT_ANIMATION_NAME,
  NFC_ANIMATION_NAME,
} from '../constants';

const animations = {
  [REPORT_ANIMATION_NAME]: require('../assets/animations/reportSuccess.json'),
  [LOADER_ANIMATION_NAME]: require('../assets/animations/ringloader.json'),
  [DORMANT_ANIMATION_NAME]: require('../assets/animations/dormant.json'),
  [NFC_ANIMATION_NAME]: require('../assets/animations/nfcloader.json'),
};

const Animation = forwardRef((props, ref) => {
  const animation = animations[props.file];

  return (
    <LottieView
      ref={ref}
      style={styles.lotieView}
      source={animation}
      loop
      autoPlay
    />
  );
});

const styles = StyleSheet.create({
  lotieView: {
    width: 400,
    height: 400,
  },
});

export default Animation;
