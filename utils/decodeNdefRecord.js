import {Ndef} from 'react-native-nfc-manager';

const decodeNdefRecord = record => {
  if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_TEXT)) {
    return ['text', Ndef.text.decodePayload(record.payload)];
  } else if (Ndef.isType(record, Ndef.TNF_WELL_KNOWN, Ndef.RTD_URI)) {
    return ['uri', Ndef.uri.decodePayload(record.payload)];
  }

  return ['unknown', '---'];
};

export default decodeNdefRecord;
