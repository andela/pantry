import React, {useState, useRef, Fragment} from 'react';
import {StyleSheet, View, Text} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import {NavigationEvents} from 'react-navigation';

import MonoText from '../components/StyledText';
import Button from '../components/Button';
import ScreenLayout from '../components/ScreenLayout';
import {PANTRY_REPORT_URL} from '../constants/Url';
import Animation from '../components/Animation';
import {LOADER_ANIMATION_NAME, REPORT_ANIMATION_NAME} from '../constants';
import Analytics from '../components/Analytics';
import showError from '../utils/error';

const ReportScreen = () => {
  const [date, setDate] = useState(new Date());
  const [showPicker, setShowPicker] = useState(false);
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  const selectDate = (e, _date) => {
    const today = new Date();
    setShowPicker(false);

    if (!_date) {
      return;
    }

    if (_date > today) {
      showError('Date is greater than current date.');
    }

    setDate(_date);
    fetchReport(_date);
  };

  const fetchReport = async _date => {
    try {
      const [dateString] = _date.toISOString().split('T');
      setLoading(true);
      const _res = await fetch(`${PANTRY_REPORT_URL}?date=${dateString}`);
      const res = await _res.json();
      setData(res.data);
    } catch (error) {
      showError('Error fetching report. Please try again!');
    } finally {
      setLoading(false);
    }
  };

  const ref = useRef(null);

  const renderContent = () => {
    if (loading) {
      return (
        <Fragment>
          <Animation ref={ref} file={LOADER_ANIMATION_NAME} />
          <MonoText style={styles.loadingText}>Fetching report ...</MonoText>
        </Fragment>
      );
    }

    if (data.count === undefined) {
      return (
        <Fragment>
          <Analytics />
          <MonoText style={styles.directionText}>
            Fetch report for a certain date
          </MonoText>
        </Fragment>
      );
    }

    return (
      <Fragment>
        <Animation ref={ref} file={REPORT_ANIMATION_NAME} />
        <MonoText style={styles.resultText}>
          Displaying result for {date.toDateString()}
          {'\n'}
          Total number of Taps: {''}
          <MonoText style={styles.countText}>{data.count}</MonoText>
        </MonoText>
      </Fragment>
    );
  };

  const onScreenFocus = () => {
    setData({});
  };

  return (
    <ScreenLayout isBlue={false}>
      <NavigationEvents onDidFocus={onScreenFocus} />
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>
          Displaying report for {''}
          <Text style={styles.dateText}>{date.toDateString()}</Text>
        </Text>

        <Button
          onPress={() => setShowPicker(true)}
          btnStyle={styles.pickerBtn}
          text={'Select Date'}
          textStyle={styles.selectText}
        />
      </View>

      <View style={styles.mainContainer}>{renderContent()}</View>

      {showPicker && (
        <DateTimePicker value={date} display="default" onChange={selectDate} />
      )}
    </ScreenLayout>
  );
};

ReportScreen.navigationOptions = {
  title: 'Report',
  headerTintColor: '#fff',
  headerStyle: {
    backgroundColor: '#6CABF7',
  },
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 15,
    backgroundColor: '#f7f7f7',
  },
  infoContainer: {
    padding: 50,
    alignSelf: 'flex-start',
    width: '100%',
  },
  pickerBtn: {
    backgroundColor: '#6CABF7',
    width: 150,
    justifyContent: 'center',
    alignItems: 'center',
    height: 40,
    alignSelf: 'flex-start',
  },
  infoText: {
    fontSize: 30,
    marginBottom: 20,
  },
  selectText: {
    textTransform: 'uppercase',
    fontSize: 15,
    color: '#0b0b0b',
  },
  resultText: {
    fontSize: 25,
    textAlign: 'center',
  },
  dateText: {
    fontWeight: 'bold',
    color: '#0b0b0b',
  },
  fetchBtn: {
    backgroundColor: '#A1CCFF',
    width: 150,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 40,
  },
  fetchText: {
    color: '#0b0b0b',
    textTransform: 'uppercase',
    fontSize: 15,
    fontWeight: 'bold',
  },
  directionText: {
    fontSize: 20,
    alignSelf: 'center',
    marginTop: 50,
  },
  mainContainer: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    width: '100%',
  },
  loadingText: {
    fontSize: 25,
    alignSelf: 'center',
  },
  countText: {
    fontWeight: '700',
  },
});

export default ReportScreen;
