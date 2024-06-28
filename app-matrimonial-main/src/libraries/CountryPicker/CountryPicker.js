import React, { useState } from 'react';
import CountryPicker from 'react-native-country-picker-modal';
import { styles } from './styles';

const CustomCountryPicker = ({
  onContactEnter,
  countryCallingCode2,
  placeholder,
  onCountrySelect,
  value,
}) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [completeNum, setCompleteNum] = useState('');

  const style = styles();
  return (
    <CountryPicker
      onSelect={onCountrySelect}
      withFilter={true}
      placeholder={placeholder ? `+${placeholder}` : countryCode}
    />
  );
};

export default CustomCountryPicker;
