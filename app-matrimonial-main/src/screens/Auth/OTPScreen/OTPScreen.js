import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, STYLES } from '../../../assets/theme';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppLogo from '../../../components/AppLogo/AppLogo';
import AppText from '../../../components/AppText/AppText';
import LayoutImage from '../../../components/LayoutImage/LayoutImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import OTPTextInput from '../../../libraries/OTPTextInput/OTPTextInput';
import { Toast } from '../../../utils/native';
import { styles } from './styles';
import { API_URL } from '../../../../constant';
import { useRoute } from '@react-navigation/native';

const OTPScreen = () => {
  const route = useRoute();
  const userEmailParams = route.params?.email || '';

  console.log('userEmail from otp page ', userEmailParams);
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isLoading, setIsLoading] = useState(false);
  const navigation = useNavigation();
  const style = styles;

  const handleInputChange = (index, text) => {
    const updatedOTP = [...otp];
    updatedOTP[index] = text;
    setOtp(updatedOTP);
  };

  const verifyUserEmail = async () => {
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/verifyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email: userEmailParams }),
      });
      const data = await response.json();
      console.log(data);
      Toast('Verification email sent successfully');
    } catch (error) {
      console.error(error);
      Toast('Failed to send verification email');
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async () => {
    const enteredOTP = otp.join('');
    if (enteredOTP.length > 3) {
      setIsLoading(true);
      try {
        const response = await fetch(`${API_URL}/user/confirmEmail`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            code: enteredOTP,
            email: `${userEmailParams}`
          })
        });
        const data = await response.json();
        console.log('data from otp page ', data);
        if (response.ok) {
          navigation.navigate('ProfileCreateScreen');
        } else {
          Toast('Verification error');
        }
      } catch (error) {
        console.error('Error:', error);
        Toast('An unexpected error occurred');
      } finally {
        setIsLoading(false);
      }
    } else if (enteredOTP.length === 0) {
      Toast('Please enter OTP');
    } else {
      Toast('Incorrect OTP');
    }
  };

  const resendCodeHandler = () => {
    verifyUserEmail();
  };

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={STYLES.bgColor(COLORS.dark.white)}>
      <View style={[style.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{ container: STYLES.position('absolute') }}
          onLeftIconPress={backNavigationHandler}
        />

        <View style={[style.contentContainer]}>
          <AppLogo extraStyle={{ container: [STYLES.bottom('10%')] }} />
          <View style={[style.formContainer]}>
            <AppText
              title={LABELS.enterVeification}
              variant={'h2'}
              extraStyle={[
                STYLES.fontSize(22),
                STYLES.fontFamily(Fonts.PoppinsSemiBold),
              ]}
              alignSelf={'center'}
            />

            <AppText
              title={LABELS.verificationMsg}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'center'}
              color={COLORS.dark.gray}
            />

            <Space mT={20} />
            <OTPTextInput
              length={4}
              onChangeText={handleInputChange}
              value={otp}
            />

            <Space mT={20} />
            {isLoading ? (
              <ActivityIndicator size="large" color={COLORS.dark.primary} />
            ) : (
              <AppButton
                title={LABELS.verify}
                variant="filled"
                textVariant={'h5'}
                onPress={handleSubmit}
              />
            )}
            <Space mT={20} />
            <AppText
              title={LABELS.resendCode}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              variant={'h5'}
              color={COLORS.dark.primary}
              alignSelf={'center'}
              onPress={resendCodeHandler}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default OTPScreen;