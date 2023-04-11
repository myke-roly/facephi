import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';

const SelphiTopBar = ({ onPress }) => 
{
  return (
    <View style={styles.container}>
      <Text style={styles.textTitle}> Selphi </Text>
      <View style={{ position: "absolute", right: 10 }}>
        <TouchableOpacity onPress={ onPress } ><Image source={require('../../assets/images/icons-settings-24.png')}/></TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 0.1,
    backgroundColor: '#0099af',
    alignItems: 'center',
    width: '100%',
    height: '100%',
    justifyContent: 'center', // center, space-around
  },
  textTitle: {
    color:'#ffffff',
    fontFamily: 'CircularStd-Bold',
    fontSize: 20,
  },
});

export default SelphiTopBar;