import React from 'react';
import {Text, TextInput, View} from 'react-native';
import {styles} from './styles';
import {COLORS} from '../../assets/theme';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';

const AppInput = props => {
  const {
    iconLeft = null,
    iconRigth = null,
    placeholder,
    placeholderTextColor,
    value,
    onChangeText = () => {},
    secureTextEntry = false,
    keyboardType = 'default',
    multiline = false,
    numberOfLines = 1,
    disabled = false,
    onFocus = () => {},
    extraStyle = {textInputCont: {}, textInput: {}},
  } = props;
  const style = styles;
  return (
    <View style={[style.textInputCont, extraStyle.textInputCont]}>
      {iconLeft && (
        <>
          <Icon SVGIcon={iconLeft} iconLeft={true} alignSelf="center" />
          <Space mL={10} />
        </>
      )}
      
      <TextInput
        {...props}
        secureTextEntry={secureTextEntry}
        keyboardType={keyboardType}
        multiline={multiline}
        numberOfLines={numberOfLines}
        disabled={disabled}
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={
          placeholderTextColor ? placeholderTextColor : COLORS.dark.inputBorder
        }
        style={[style.textInput, extraStyle.textInput]}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus} 
      />
    </View>
  );
};

export default AppInput;
