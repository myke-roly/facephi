import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';

const styles = StyleSheet.create({
  selphiButtonContainer: {
    alignItems: 'center',
    flex: 0.25,
    width: '80%',
    justifyContent: 'center',
  },
  selphiButtonTouchable: {
    alignItems: 'center',
    flex: 0.25,
    width: '80%',
    borderRadius: 20,
    borderColor: '#0099af',
    backgroundColor: '#0099af',
    justifyContent: 'center',
  },
  selphiButtonText: {
    fontFamily: 'CircularStd-Bold',
    fontSize: 18,
    color: '#ffffff',
    alignSelf: 'center',
    textTransform: 'capitalize',
  },
});

const SelphiButton = ({onPress, text}) => {
  return (
    <View style={styles.selphiButtonContainer}>
      <TouchableOpacity style={styles.selphiButtonTouchable} onPress={onPress}>
        <Text style={styles.selphiButtonText}>{text}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SelphiButton;
