import React from 'react';
import {TextInput, View} from 'react-native';
import PhoneInput from 'react-native-phone-number-input';
import {COLORS} from '../../assets/theme';

const CustomPhoneInput = ({
  value,
  selectedCountry,
  onChangeText,
  ...restProps
}) => {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center'}}>
      <View style={{flex: 1, borderRadius: 6}}>
        <PhoneInput
          defaultValue={value}
          defaultCode={selectedCountry}
          flagButtonStyle={{display: 'none'}}
          textContainerStyle={{
            borderTopWidth: 1,
            borderBottomWidth: 1,
            borderRightWidth: 1,
            borderColor: COLORS.dark.inputBorder,
            backgroundColor:'transparent',
            borderTopRightRadius: 6,
            borderBottomRightRadius: 6,
            height: 50,
          }}
          codeTextStyle={{
            borderWidth: 0,
            display: 'none',
          }}
          textInputProps={{
            value,
            onChangeText,
            style: {height: 40, padding: 8},
            ...restProps,
          }}
        />
      </View>
    </View>
  );
};

export default CustomPhoneInput;
