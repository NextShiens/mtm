import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import CustomImage from '../CustomImage/CustomImage';
import {IMAGES} from '../../assets/images';
const AppLogo = ({extraStyle = {container: {}}}) => {
  const style = styles
  return (
    <View style={[style.logoContainer, extraStyle.container]}>
      <CustomImage source={IMAGES.appLogo} size={100} resizeMode={'contain'} />
    </View>
  );
};

export default AppLogo;
