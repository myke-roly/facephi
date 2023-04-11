import React from 'react';
import {StyleSheet, View, Image} from 'react-native';

const styles = StyleSheet.create({
  selphiImageContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    margin: 5,
    flex: 0.5,
    width: '70%',
    backgroundColor: '#e8e6e6',
    borderRadius: 15,
    
  },
  selphiImage: {
    height: '100%',
    width: '100%',
    borderRadius: 15,
  },
});

const SelphiImage = ({image}) => {
  return (
    <View style={styles.selphiImageContainer}>
      <Image
        style={styles.selphiImage}
        source={{
          uri: 'data:image/jpeg;base64,' + image,
        }}
      />
    </View>
  );
};

export default SelphiImage;