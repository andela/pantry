import React from 'react';
import {View, StyleSheet, Text, TouchableHighlight} from 'react-native';

export default ({toggleModal, response}) => {
  const btnBackground = response.status ? '#6CABF7' : '#ffbcbc';
  const btnStyle = {backgroundColor: btnBackground};

  return (
    <View style={styles.container}>
      <View style={{...styles.widget}}>
        <Text style={styles.title}>Pantry says</Text>
        <Text style={styles.response}>{response.message}</Text>
        <TouchableHighlight
          onPress={toggleModal}
          style={{...styles.btn, ...btnStyle}}>
          <Text style={styles.btnText}>OK</Text>
        </TouchableHighlight>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
  },
  widget: {
    width: 300,
    height: 200,
    justifyContent: 'center',
    paddingLeft: 40,
    paddingRight: 40,
    backgroundColor: 'white',
  },
  btn: {
    marginTop: 30,
    width: '100%',
    backgroundColor: 'yellow',
    padding: 10,
  },
  btnText: {
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center',
  },
  title: {
    fontWeight: '500',
    alignSelf: 'flex-start',
    fontSize: 17,
    textAlign: 'center',
  },
  response: {
    fontWeight: 'bold',
    fontSize: 20,
    marginTop: 20,
  },
});
