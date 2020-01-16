import React, {useRef} from 'react';
import {NavigationEvents} from 'react-navigation';
import {StyleSheet} from 'react-native';

import MonoText from '../components/StyledText';
import Layout from '../components/Layout';
import ScreenLayout from '../components/ScreenLayout';
import Animation from '../components/Animation';
import {NFC_ANIMATION_NAME} from '../constants';

export default function HomeScreen() {
  const ref = useRef(null);

  console.log(ref, '<<<>>>>')

  return (
    <ScreenLayout isBlue={false}>
      <Layout>
        {/* <NavigationEvents
          onDidFocus={() => ref.current.play()}
        /> */}
        <Animation ref={ref} file={NFC_ANIMATION_NAME} />
        <MonoText style={styles.text}>Listening to NFC</MonoText>
      </Layout>
    </ScreenLayout>
  );
}

const styles = StyleSheet.create({text: {fontSize: 25}});

HomeScreen.navigationOptions = {
  title: 'Tap',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#6CABF7',
  },
};
