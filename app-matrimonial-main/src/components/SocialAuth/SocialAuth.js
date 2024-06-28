import React from 'react';
import {Text, View, TouchableOpacity} from 'react-native';
import {styles} from './styles';
import CustomImage from '../CustomImage/CustomImage';
import {IMAGES} from '../../assets/images';
const SocialAuth = ({onGoogleAuth, onFacebookAuth, onAppleAuth}) => {
  const style = styles;
  return (
    <View style={style.container}>
      <TouchableOpacity
        style={style.googleIconContainer}
        onPress={onGoogleAuth}>
        <CustomImage source={IMAGES.google} size={25} resizeMode={'contain'} />
      </TouchableOpacity>

      <TouchableOpacity style={style.appleIconContainer} onPress={onAppleAuth}>
        <CustomImage source={IMAGES.apple} size={25} resizeMode={'contain'} />
      </TouchableOpacity>
      <TouchableOpacity
        style={style.facebookIconContainer}
        onPress={onFacebookAuth}>
        <CustomImage
          source={IMAGES.facebook}
          size={25}
          resizeMode={'contain'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default SocialAuth;
