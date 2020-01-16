import React, {useRef, useEffect, useState} from 'react';
import {StyleSheet} from 'react-native';
import NfcManager, {NfcEvents} from 'react-native-nfc-manager';
import axios from 'axios';

import MonoText from '../components/StyledText';
import Layout from '../components/Layout';
import ScreenLayout from '../components/ScreenLayout';
import Animation from '../components/Animation';
import {NFC_ANIMATION_NAME} from '../constants';
import showError from '../utils/error';
import showResponse from '../utils/response';
import {PANTRY_TAP_URL} from '../constants/Url';
import decodeNdefRecord from '../utils/decodeNdefRecord';

export default function HomeScreen() {
  const ref = useRef(null);
  const [isLoading, setLoading] = useState(false);

  const startReadingNFC = async () => {
    try {
      await NfcManager.registerTagEvent();
    } catch (error) {
      showError('Error registering NFC engine. Please restart Pantry.');
      NfcManager.unregisterTagEvent().catch(() => 0);
    }
  };

  const tap = async slackUserId => {
    if (isLoading) {
      return;
    }
    setLoading(true);
    let response = {};

    try {
      const payload = new FormData();
      payload.append('slackUserId', slackUserId);

      const opts = {headers: {'Content-Type': 'multipart/form-data'}};
      const {data} = await axios.post(PANTRY_TAP_URL, payload, opts);
      console.log(data, 'API rsponse-----');

      response.message = data.message;
      response.status = 'success';
      return response;
    } catch (error) {
      /**
       * You might wonder why I did this, this way. For some weird reason, catching the
       * error here doesn't let me do stuff, it still breaks the app which is weird.
       *
       * I'm certain there's a better way to do this but for now its TODO!
       * I have partner work. 0 If you can raise a PR, I'm happy to look at it.
       */
      const errorMessage = error.response
        ? error.response.data.message
        : error.message;

      response.message = errorMessage;
      response.status = 'error';
      return response;
    } finally {
      setLoading(false);
    }
  };

  const handleTagTap = async payload => {
    try {
      const {ndefMessage} = payload;
      const [parsedArray] = ndefMessage.map(decodeNdefRecord);

      if (!parsedArray) {
        return;
      }

      // eslint-disable-next-line no-unused-vars
      const [_, slackId] = parsedArray;
      const response = await tap(slackId);

      showResponse(response);
    } catch (error) {
      const errorMessage = error.message || error;
      showError(`An error occured: ${errorMessage}`);
    }
  };

  useEffect(() => {
    NfcManager.start();
    NfcManager.setEventListener(NfcEvents.DiscoverTag, handleTagTap);
    startReadingNFC();

    return () => {
      NfcManager.setEventListener(NfcEvents.DiscoverTag, null);
      NfcManager.unregisterTagEvent().catch(() => 0);
    };
  });

  return (
    <ScreenLayout>
      <Layout>
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
