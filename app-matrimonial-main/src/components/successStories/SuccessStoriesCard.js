import { View, Text, StyleSheet, Dimensions, TouchableOpacity } from 'react-native';
import React from 'react';
import FastImage from 'react-native-fast-image';

const { width } = Dimensions.get('window'); 

export default function SuccessStoriesCard({ image, name, des, onPress }) {
  console.log('image:', image);
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <FastImage
        source={{ uri: image }} // Updated to use the `image` prop
        style={style.image}
      />
      <View style={{ flex: 1 }}>
        <Text style={style.name}>{name}</Text>
        <Text style={style.des} numberOfLines={4}>{des}</Text>
      </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    flex: 1,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection: 'row',
    gap: 15,
    padding: 5,
    marginTop: 10,
    borderRadius: 10,
    width: '97%',
    alignSelf: 'center',
    marginBottom: 10
  },
  name: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    marginTop: 10
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 10
  },
  des: {
    fontSize: 13,
    color: '#949494',
    width: width - 160
  }
});
