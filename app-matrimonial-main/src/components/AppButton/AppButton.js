import React from 'react';
import { TouchableOpacity } from 'react-native';
import { COLORS } from '../../assets/theme';
import AppText from '../AppText/AppText';
import { styles } from './styles';

const AppButton = ({
  title = '',
  textVariant,
  color,
  extraStyle = {container: {}, text: {}, SVGIcon: {}},
  onPressIcon = () => {},
  onPress = () => {},
  onPressText = () => {},
  SVGLeft = null,
  SVGRight = null,
  variant = 'filled',
  textAlign = 'center',
  alignSelf = 'center',
  activeOpacity = variant == 'outlined' ? 0.4 : 0.8,
}) => {
  const style = styles(variant);
  return (
    <>
      <TouchableOpacity
        style={[
          style.container,
          extraStyle.container,
          {alignSelf: alignSelf},
        ]}
        onPress={onPress}
        activeOpacity={activeOpacity}>
        <AppText
          title={title}
          alignSelf={textAlign}
          extraStyle={[style.text, extraStyle.text]}
          color={
            color ? color : variant == 'filled' ? 'white' : COLORS.dark.primary
          }
          variant={textVariant}
          onPress={onPress}
        />
      </TouchableOpacity>
    </>
  );
};

export default AppButton;
