import React from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { Image } from 'react-native';
import { Svg, Path, Rect,Circle } from 'react-native-svg';

const GalleryIcon = ({ size, color }) => (
  <Svg width={25} height={25} viewBox="0 0 24 24" fill="none" stroke={color} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
    <Rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
    <Circle cx="8.5" cy="8.5" r="1.5" />
    <Path d="M21 15l-5-5L5 21" />
  </Svg>
);

const CustomImageGallery = ({ imageUrls, size = 100, resizeMode = 'cover', onPress }) => {
  // Function to generate dynamic styles based on size
  const getDynamicStyles = () => ({
    imageContainer: {
      marginLeft: 5,
      height: 100,
      width: 85,
      backgroundColor: '#D9D9D945',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    galleryContainer: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      justifyContent: 'center',
    },
    imageStyle: {
      width: '100%',
      height: '100%',
      borderRadius: 8,
    },
  });

  const styles = StyleSheet.create(getDynamicStyles(size));

  if (!imageUrls || imageUrls.length === 0) {
    return (
      <View style={styles.galleryContainer}>
        <TouchableOpacity onPress={() => onPress()} style={styles.imageContainer}>
          <GalleryIcon size={size * 0.5} color="#888" />
        </TouchableOpacity>
      </View>
    );
  }

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