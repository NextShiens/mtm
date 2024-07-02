import React from 'react';
import FastImage from 'react-native-fast-image';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
const CustomImageGallery = ({ imageUrls, size = 100, resizeMode = 'cover', onPress }) => {
  // Function to generate dynamic styles based on size
  console.log('imageUrls', imageUrls);
  const getDynamicStyles = () => ({
    imageContainer: {
      width: size,
      height: size,
      margin: 5,
      justifyContent: 'center',
      alignItems: 'center',
    },
    galleryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    imageStyle: {
      width: '100%',
      height: '100%',
    },
  });

  const styles = StyleSheet.create(getDynamicStyles(size));

  return (
    <View style={styles.galleryContainer}>
      {imageUrls.map((imageUrl, index) => (
        <TouchableOpacity key={index} onPress={() => onPress(imageUrl)} style={styles.imageContainer}>
          <Image
            source={{ uri: imageUrl }}
            style={styles.imageStyle}
            resizeMode={resizeMode}
          />
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default CustomImageGallery;