import React from 'react';
import AppText from '../../components/AppText/AppText';
import {COLORS, STYLES} from '../../assets/theme';
import {View, TouchableOpacity} from 'react-native';
import {Fonts} from '../../assets/fonts';
import {useNavigation} from '@react-navigation/native';

const CheckboxText = ({ onPressPrivacy}) => {
  const navigation = useNavigation();

  const onPressTerms = () => {
    navigation.navigate('PrivacyPolicyScreen');
  }

  return (
    <View style={STYLES.row}>
      <AppText
        title={'I agree to the '}
        color={COLORS.dark.black}
        extraStyle={[{fontFamily: Fonts.PoppinsRegular}]}
      />
      <TouchableOpacity onPress={onPressTerms}>
        <AppText
          title={'Terms '}
          color={COLORS.dark.primary}
          extraStyle={[{fontFamily: Fonts.PoppinsRegular}]}
          onPress={onPressTerms}
        />
      </TouchableOpacity>

      <AppText
        title={'of use and '}
        color={COLORS.dark.black}
        extraStyle={[{fontFamily: Fonts.PoppinsRegular}]}
      />
      <TouchableOpacity onPress={onPressTerms}>
        <AppText
          title={'Privacy Policy'}
          color={COLORS.dark.primary}
          extraStyle={[{fontFamily: Fonts.PoppinsRegular}]}
          onPress={onPressPrivacy}
        />
      </TouchableOpacity>
    </View>
  );
};

export default CheckboxText;
