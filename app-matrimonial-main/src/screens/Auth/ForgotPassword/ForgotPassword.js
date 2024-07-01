import React, { useState } from 'react';
import { ScrollView, View, Alert } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, STYLES } from '../../../assets/theme';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import AppLogo from '../../../components/AppLogo/AppLogo';
import AppText from '../../../components/AppText/AppText';
import LayoutImage from '../../../components/LayoutImage/LayoutImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';

const ForgotPassword = ({ navigation }) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'newPassword') setNewPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
  };

  const onRegisterPress = async () => {
    if (!newPassword || !confirmPassword) {
      Alert.alert('Error', 'New password and confirm password cannot be empty');
      return;
    }

    if (newPassword !== confirmPassword) {
      Alert.alert('Error', 'New password and confirm password do not match');
      return;
    }

    try {
      const response = await fetch(`${API_URL}/user/forgotPassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${await AsyncStorage.getItem('AccessToken')} `
        },
        body: JSON.stringify({
          email: email,
          password: newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        Alert.alert('Success', 'Password changed successfully');
        navigation.navigate('LoginScreen');
      } else {
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      Alert.alert('Error', 'Failed to change password');
    }
  };

  const onCancelHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={{ backgroundColor: 'white' }}>
      <View style={[styles.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{ container: STYLES.position('absolute') }}
          onLeftIconPress={backNavigationHandler}
        />

        <View style={[styles.contentContainer]}>
          <AppLogo extraStyle={{ container: STYLES.bottom('10%') }} />
          <View style={[styles.formContainer]}>
            <AppText
              title={LABELS.changePass}
              variant={'h2'}
              extraStyle={[
                STYLES.fontSize(22),
                STYLES.fontFamily(Fonts.PoppinsSemiBold),
                STYLES.bottom('6%'),
              ]}
              alignSelf={'center'}
            />
            <AppText
              title={LABELS.chnagePassMsg}
              variant={'h5'}
              extraStyle={[
                STYLES.fontFamily(Fonts.PoppinsRegular),
                STYLES.bottom('5%'),
              ]}
              alignSelf={'center'}
              color={COLORS.dark.checkboxText}
            />
            <Space mT={20} />
            <AppText
              title={LABELS.emailAddress}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={15} />

            <AppInput
              placeholder={LABELS.emailPlaceholder}
              onChangeText={text => handleInputChange('email', text)}
            />

            <Space mT={15} />
            <AppText
              title={LABELS.newPass}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.passwordPlaceholder}
              secureTextEntry={true}
              keyboardType={'default'}
              onChangeText={text => handleInputChange('newPassword', text)}
            />
            <Space mT={10} />
            <AppText
              title={LABELS.confirmPass}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />
            <AppInput
              placeholder={LABELS.passwordPlaceholder}
              secureTextEntry={true}
              keyboardType={'default'}
              onChangeText={text => handleInputChange('confirmPassword', text)}
            />
            <Space mT={20} />
            <AppButton
              title={LABELS.changePass}
              variant="filled"
              textVariant={'h5'}
              onPress={onRegisterPress}
            />
            <Space mT={15} />
            <AppButton
              title={LABELS.cancel}
              variant="outlined"
              textVariant={'h5'}
              extraStyle={{ container: { borderColor: COLORS.dark.inputBorder } }}
              color={COLORS.dark.inputBorder}
              onPress={onCancelHandler}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ForgotPassword;