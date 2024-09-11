import React from 'react';
import { TextInput, View } from 'react-native';
import { styles } from './styles';
import { COLORS } from '../../assets/theme';
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
    extraStyle = { textInputCont: {}, textInput: {} },
  } = props;

  return (
    <View style={[styles.textInputCont, extraStyle.textInputCont]}>
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
        editable={!disabled}
        placeholder={placeholder}
        placeholderTextColor={placeholderTextColor || '#949494'}
        style={[styles.textInput, extraStyle.textInput]}
        value={value}
        onChangeText={onChangeText}
        onFocus={onFocus}
      />
    </View>
  );
};

export default AppInput;