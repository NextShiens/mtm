import React from 'react';
import { Text } from 'react-native';
import { COLORS, STYLES, TYPOGRAPHY } from '../../assets/theme';
import { styles } from './styles';

const AppText = props => {
  const {
    onPress = () => {},
    extraStyle = {},
    variant = 'body2',
    color = '',
    title = '',
    alignSelf = 'center',
    numberOfLines,
    elipsizeMode,
  } = props;
  const style = styles;
  return (
    <Text
      {...props}
      ellipsizeMode={elipsizeMode}
      numberOfLines={numberOfLines}
      style={[
        TYPOGRAPHY[variant],
        STYLES.fontSize(
          TYPOGRAPHY[variant] ? TYPOGRAPHY[variant].fontSize : 12,
        ),
        STYLES.color(color),
        extraStyle,
      ]}
      onPress={onPress}>
      {title}
    </Text>
  );
};

export default AppText;
