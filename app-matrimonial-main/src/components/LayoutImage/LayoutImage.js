import React from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import { IMAGES } from '../../assets/images';
import { STYLES } from '../../assets/theme';
import { styles } from './styles';
const LayoutImage = ({imgSrc = IMAGES.layout1}) => {
  const style = styles;
  return (
    <View style={[style.imgContainer]}>
      <FastImage source={imgSrc} style={[STYLES.flex1]} resizeMode='cover'/>
    </View>
  );
};

export default LayoutImage;
