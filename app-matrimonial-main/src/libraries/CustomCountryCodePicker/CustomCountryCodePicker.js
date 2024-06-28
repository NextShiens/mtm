import React from 'react';
import {Text, TouchableOpacity} from 'react-native';
import {CountryPicker} from 'react-native-country-codes-picker';
import {styles} from './styles';

const CustomCountryCodePicker = ({
  countryShow,
  onOpen = () => {},
  countryCode,
  onSelectCountry,
}) => {
  const style = styles;
  return (
    <>
      <TouchableOpacity onPress={onOpen} style={style.countryContainer}>
        <Text style={style.text} >
          {countryCode ? countryCode : '+91'}
        </Text>
      </TouchableOpacity>
      <CountryPicker
        show={countryShow}
        pickerButtonOnPress={onSelectCountry}
        searchMessage="Search here"
        showOnly={true}
        
      />
    </>
  );
};

export default CustomCountryCodePicker;
