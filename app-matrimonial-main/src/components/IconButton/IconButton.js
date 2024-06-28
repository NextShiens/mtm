import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {styles} from './styles';
import AppText from '../AppText/AppText';
import {COLORS, STYLES} from '../../assets/theme';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';

const IconButton = ({
  leftIconAlign = 'center',
  rightIconAlign,
  title = '',
  textVariant,
  color,
  extraStyle = {container: {}, text: {}, SVGIcon: {}},
  onLeftIconPress = () => {},
  onRightIconPress = () => {},
  onPress = () => {},
  onPressText = () => {},
  iconLeft = null,
  iconRight = null,
  variant,
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
          STYLES.alignSelf(alignSelf),
        ]}
        activeOpacity={activeOpacity}
        onPress={onPress}>
        {iconLeft && (
          <>
            <Icon
              SVGIcon={iconLeft}
              alignSelf={leftIconAlign}
              onPress={onLeftIconPress}
            />
          </>
        )}

        <View style={[STYLES.alignSelf('center'), STYLES.flex1]}>
          <AppText
            title={title}
            alignSelf={'center'}
            extraStyle={[style.text, extraStyle.text]}
            color={
              color
                ? color
                : variant == 'filled'
                ? 'white'
                : COLORS.dark.primary
            }
            variant={textVariant}
            onPress={onPressText}
          />
        </View>
        {iconRight && (
          <>
            <View onPress={onRightIconPress}>
              <Icon SVGIcon={iconRight} alignSelf={rightIconAlign} />
              <Space mL={10} />
            </View>
          </>
        )}
      </TouchableOpacity>
    </>
  );
};

export default IconButton;
