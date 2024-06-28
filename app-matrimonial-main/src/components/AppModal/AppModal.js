import React, {useState} from 'react';
import {TextInput, View} from 'react-native';
import Modal from 'react-native-modal';
import {LABELS} from '../../labels';
import Space from '../Space/Space';
import {styles} from './styles';
import CustomCheckbox from '../../libraries/Checkbox/Checkbox';
import {COLORS, STYLES} from '../../assets/theme';
import AppText from '../AppText/AppText';
import {Fonts} from '../../assets/fonts';
import AppButton from '../AppButton/AppButton';

const AppModal = ({isVisible, onBtnPress, onClose}) => {
  const [isChecked, setIsChecked] = useState(false);
  const style = styles;
  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  return (
    <View>
      <Modal isVisible={isVisible}>
        <View style={style.container}>
          <TextInput
            style={style.textInpuCont}
            placeholder={LABELS.cardNumber}
          />
          <Space mT={20} />
          <TextInput
            style={style.textInpuCont}
            placeholder={LABELS.cardNumber}
          />
          <Space mT={10} />
          <View style={style.dropdownCont}>
            <TextInput style={style.dropDown} placeholder={LABELS.cardNumber} />
            <TextInput style={style.dropDown} placeholder={LABELS.cardNumber} />
            <TextInput style={style.dropDown} placeholder={LABELS.cardNumber} />
          </View>
          <Space mT={10} />
          <View style={STYLES.row}>
            <CustomCheckbox
              selected={isChecked}
              onPress={toggleCheckbox}
              color={COLORS.dark.primary}
            />
            <AppText
              title={LABELS.saveCreditInfo}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
          </View>
          <Space mT={10} />
          <AppButton title={LABELS.confirm} />
          <Space mT={20} />
          <AppButton
            title={LABELS.back}
            variant="outlined"
            extraStyle={{container: style.backBtn, text: style.backBtnText}}
            onPress={onClose}
          />
        </View>
      </Modal>
    </View>
  );
};


