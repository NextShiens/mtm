import React from 'react';
import Icon from '../../components/Icon/Icon';
import styles from './styles';
import {TouchableOpacity, Text} from 'react-native';
import {SVG} from '../../assets/svg';
import {COLORS} from '../../assets/theme';

const CustomCheckbox = ({
  selected,
  onPress,
  extraStyle = {container: {}},
  textStyle,
  size = 30,
  color,
  text = '',
  ...props
}) => {
  return (
    <TouchableOpacity
      style={[styles.checkBox, extraStyle.container]}
      onPress={onPress}
      {...props}>
      <Icon
        size={size}
        color={color}
        SVGIcon={
          selected ? (
            <SVG.CheckboxFilled
              fill={color ? color : COLORS.dark.inputBorder}
              height={18}
              width={18}
            />
          ) : (
            <SVG.checkboxUnfilled
              fill={COLORS.dark.inputBorder}
              height={18}
              width={18}
            />
          )
        }
        onPress={onPress}
      />
      <Text style={textStyle}> {text} </Text>
    </TouchableOpacity>
  );
};

export default CustomCheckbox;
