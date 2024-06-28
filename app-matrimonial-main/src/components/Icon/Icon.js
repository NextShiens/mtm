import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import AppText from '../AppText/AppText';
import Space from '../Space/Space';

const Icon = ({
  SVGIcon = null,
  title = '',
  color = 'black', 
  variant = 'h6',
  iconLeft = true,
  mB = 0,
  mL = 0,
  extraStyle = {container: {}, subContainer: {}, title: {}},
  alignSelf = 'flex-start',
  onPress = () => {},
}) => (
  <TouchableOpacity
    style={[{alignSelf}, extraStyle.container]}
    onPress={onPress}
    activeOpacity={0.8}>
    <View
      style={[
        {flexDirection: iconLeft ? 'row' : 'row-reverse'},
        extraStyle.subContainer,
      ]}>
      {SVGIcon && <Space mL={mL} />}
      {SVGIcon}
      {title && (
        <AppText
          onPress={onPress}
          title={title}
          variant={variant}
          color={color}
          extraStyle={extraStyle.title}
          alignSelf={alignSelf}
        />
      )}
    </View>
    {!!mB && <Space mB={mB} />}
  </TouchableOpacity>
);

export default Icon;
