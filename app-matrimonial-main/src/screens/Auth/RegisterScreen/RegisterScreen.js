import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator, TouchableOpacity } from 'react-native';
import { CountryPicker } from 'react-native-country-codes-picker';
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
import { ERRORS } from '../../../labels/error';
import CustomCheckbox from '../../../libraries/Checkbox/Checkbox';
import CheckboxText from '../../../libraries/CheckboxText/CheckboxText';
import CustomCountryCodePicker from '../../../libraries/CustomCountryCodePicker/CustomCountryCodePicker';
import { RegisterUser } from '../../../services/firebase';
import { Toast } from '../../../utils/native';
import { isValidatedSignup } from '../../../utils/validation';
import { API_URL } from '../../../../constant';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Svg, Path } from 'react-native-svg';

const RegisterScreen = ({ navigation }) => {
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [countryShow, setCountryShow] = useState(false);
  const [isChecked, setIsChecked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const style = styles;

  const PasswordEyeIcon = ({ showPassword}) => {
    return showPassword ? (
   <Svg width={24} height={24} viewBox="0 0 24 24" fill="black">
     <Path
     d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8-11-8-11-8z"
     fill="black"
     />
     <Path
       d="M12 15a3 3 0 100-6 3 3 0 000 6z"
       stroke="#A9A9A9"
       strokeWidth="2"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
     </Svg>
   ) : (
   <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
     <Path
        d="M12 4.5C7.78 4.5 4.3 7.5 3 12c1.3 4.5 4.78 7.5 9 7.5s7.7-3 9-7.5c-1.3-4.5-4.78-7.5-9-7.5z
        M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z
        M-1 1L25 25"
       stroke="black"
       strokeWidth="1"
       strokeLinecap="round"
       strokeLinejoin="round"
     />
   </Svg>
 );
};

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const termsHandler = () => { };
  const privacyHandler = () => { };

  const openCountryModal = () => {
    setCountryShow(true);
  };

  const onSelectCountry = item => {
    setCountryCode(item.dial_code);
    setSelectedCountry(item.code);
    setCountryShow(false);
  };

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    phoneNumber: '',
    isChecked: isChecked,
  });

  const handleInputChange = (key, value) => {
    setFormData({ ...formData, [key]: value });
  };

  const userFirstTimeReg = async (userFirebaseId) => {
    const res = await fetch(`${API_URL}/user/register`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: formData.name,
        email: formData.email,
        password: formData.password,
        phone: formData.phoneNumber,
        fcmToken: userFirebaseId
      }),
    });
    const data = await res.json();
    if (data.error) {
      console.log('Error:', data.error);
      Toast(data.error);
    } else {
      await AsyncStorage.setItem('AccessToken', data.token);
      Toast('User registered successfully');
      navigation.navigate('OTPScreen', { email: formData.email });
    }
  };

  const verifyUserEmail = async () => {
    try {
      const response = await fetch(`${API_URL}/user/verifyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: formData.email }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
      Toast('Failed to send verification email. Please try again.');
    }
  };

  const onRegisterPress = async () => {
    const { name, email, phoneNumber, password } = formData;
    if (!name || !email || !password || !phoneNumber || !isChecked) {
      Toast(ERRORS.emptyForm);
      return;
    }

    if (isValidatedSignup({
      name,
      email,
      phoneNumber,
      countryCode,
      selectedCountry,
      password,
      isChecked,
    })) {
      setIsLoading(true);
      try {
        const userFirebaseId = await RegisterUser(email, password);
        if (userFirebaseId) {
          console.log('User Firebase Id:', userFirebaseId);
          await userFirstTimeReg(userFirebaseId);
          await verifyUserEmail();
        }
      } catch (error) {
        console.error('Error:', error);
        Toast('An unexpected error occurred. Please try again.');
      } finally {
        setIsLoading(false);
      }
    }
  };

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={[style.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{container: STYLES.position('absolute')}}
          onLeftIconPress={backNavigationHandler}
        />

        <View style={[style.contentContainer]}>
          <AppLogo extraStyle={{container: STYLES.bottom('10%')}} />
          <View style={[style.formContainer]}>
            <AppText
              title={LABELS.register}
              variant={'h2'}
              extraStyle={[
                STYLES.fontSize(22),
                STYLES.fontFamily(Fonts.PoppinsSemiBold),
                STYLES.bottom('6%'),
              ]}
              alignSelf={'center'}
            />

            <AppText
              title={LABELS.registerMsg}
              variant={'h5'}
              extraStyle={[
                STYLES.fontFamily(Fonts.PoppinsRegular),
                STYLES.bottom('5%'),
              ]}
              alignSelf={'center'}
              color={COLORS.dark.checkboxText}
            />

            <AppText
              title={LABELS.fullName}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.johnSmith}
              onChangeText={text => handleInputChange('name', text)}
              textColor={COLORS.dark.black}
            />

            <Space mT={10} />

            <AppText
              title={LABELS.emailAddress}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.emailPlaceholder}
              onChangeText={text => handleInputChange('email', text)}
            />

            <Space mT={10} />
            <AppText
              title={LABELS.phoneNumber}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <View style={style.countrySelectContainer}>
              <CustomCountryCodePicker
                countryShow={countryShow}
                onOpen={openCountryModal}
                countryCode={countryCode}
                onSelectCountry={onSelectCountry}
              />
              <AppInput
                keyboardType="numeric"
                extraStyle={{
                  textInputCont: style.countryCodeContainer,
                }}
                placeholder={LABELS.phonePlaceholder}
                onChangeText={text =>
                  handleInputChange('phoneNumber', text.trim())
                }
              />
            </View>

            <Space mT={10} />
            {/* <View> */}
            <AppText
              title={LABELS.Password}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.passwordPlaceholder}
              secureTextEntry={!showPassword} // Modify this line to use showNewPassword
              keyboardType={'default'}
              onChangeText={text => handleInputChange('password', text)}
            />

            <Space mT={10} />

            <TouchableOpacity
              onPress={() => setShowPassword(!showPassword)}
              style={styles.PasswordEyeIcon}>
              <PasswordEyeIcon showPassword={showPassword} />
            </TouchableOpacity>

            <View style={[STYLES.row]}>
              <CustomCheckbox
                selected={isChecked}
                onPress={toggleCheckbox}
                color={COLORS.dark.primary}
              />
              <CheckboxText
                onPressTerms={termsHandler}
                onPressPrivacy={privacyHandler}
              />
            </View>
            <Space mT={20} />
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.dark.primary} />
            ) : (
              <AppButton
                title={isLoading ? 'Logging in...' : LABELS.next}
                variant="filled"
                textVariant={'h5'}
                onPress={onRegisterPress}
              />
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default RegisterScreen;