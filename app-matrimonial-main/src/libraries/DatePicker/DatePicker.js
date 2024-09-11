import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import DatePicker from 'react-native-date-picker';
import {Fonts} from '../../assets/fonts';
import {COLORS} from '../../assets/theme';
import AppText from '../../components/AppText/AppText';
import {LABELS} from '../../labels';
import {styles} from './styles';
import { color } from 'react-native-elements/dist/helpers';

const BirthDatePicker = ({
  placeholder,
  onConfirm,
  onCancel,
  selectedDate,
  open,
  onOpen,
  placeholderColor,
}) => {
  const style = styles;
  return (
    <>
      <View>
        <TouchableOpacity style={style.InputContainer} onPress={onOpen}>
          <AppText
            // title={LABELS.birthdayPlaceholder}
            title={placeholder ? placeholder : LABELS.birthdayPlaceholder}
            variant={'h5'}
            color={
              placeholderColor ? placeholderColor : COLORS.dark.inputBorder
            }
            extraStyle={{
              fontFamily: Fonts.PoppinsRegular,
              textAlignVertical: 'center',
              color: '#949494', 
            }}
            onPress={onOpen}
          />
        </TouchableOpacity>
        <DatePicker
          modal
          open={open}
          date={selectedDate}
          mode="date"
          onConfirm={onConfirm}
          onCancel={onCancel}
     
        />
      </View>
    </>
  );
};

export default BirthDatePicker;
