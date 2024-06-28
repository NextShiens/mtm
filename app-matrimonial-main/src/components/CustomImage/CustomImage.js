import React from 'react';
import { TouchableOpacity } from 'react-native';
import FastImage from 'react-native-fast-image';
import { STYLES } from '../../assets/theme';
import { styles } from './styles';

const CustomImage = props => {
  const {
    source,
    uri,
    size = 150,
    alignSelf = 'center',
    resizeMode = 'cover',
    extraStyle = {container: {}},
    onPress,
  } = props;
  const style = styles;
  return (
    <TouchableOpacity onPress={onPress} style={extraStyle.container}>
      <FastImage
        source={uri ? {uri} : source}
        style={[
          style.container(size),
          STYLES.alignSelf(alignSelf),
        ]}
        resizeMode={resizeMode}
      />
    </TouchableOpacity>
  );
};

export default CustomImage;