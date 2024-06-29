import auth from '@react-native-firebase/auth';
import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {Fonts} from '../../../assets/fonts';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, STYLES} from '../../../assets/theme';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import AppLogo from '../../../components/AppLogo/AppLogo';
import AppText from '../../../components/AppText/AppText';
import LayoutImage from '../../../components/LayoutImage/LayoutImage';
import SocialAuth from '../../../components/SocialAuth/SocialAuth';
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import {ERRORS} from '../../../labels/error';
import CustomCheckbox from '../../../libraries/Checkbox/Checkbox';
import {Toast} from '../../../utils/native';
import {styles} from './styles';
import {loginUser} from '../../../services/firebase';
import {isValidatedLogin} from '../../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';

const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation();
  const style = styles;

  const toggleCheckbox = () => {
    setIsChecked(!isChecked);
  };
  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const googleAuthHandler = async () => {};
  const forgotPassHandler = () => {
    navigation.navigate('ForgotPassword');
  };
  const verifyUserEmail = async () => {
    try {
      const response = await fetch(`${API_URL}/user/verifyEmail`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
   };
const loginAndGetAccessToken = async () => { 
    const data = await fetch(
      `${API_URL}/user/login`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${await AsyncStorage.getItem('AccessToken')}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      },
    );

    const content = await data.json();
    await AsyncStorage.setItem('AccessToken', content.token);
    console.log("Access token set" + content.token);
  };
  const loginHandler = async () => {
    if (!email && !password) {
      Toast(ERRORS.emptyForm);
    } else {
      if (isValidatedLogin({email, password})) {
        await loginUser(email, password).then(res => {
          if (res) {
            const setUid = async () => {
              // fcm token
              await AsyncStorage.setItem('loginToken', res);
              await loginAndGetAccessToken();
              await verifyUserEmail();
              // navigation.navigate('OTPScreen', {email});
              navigation.navigate('ProfileCreateScreen');
            };
            setUid();
          } else {
            console.log('There is an error');
          }
        });

        // if (message) {
        //   Toast(message);
        // } else {
        //   Toast('Signed in!');
        // await AsyncStorage.setItem('loginToken',)
        //   navigation.navigate('OTPScreen');
        // }
      }
    }
  };

  const onEnterEmail = item => {
    setEmail(item);
  };
  const onPasswordEnter = item => {
    setPassword(item);
  };

  const signUpPageNavigationHandler = () => {
    navigation.navigate('RegisterScreen');
  };

  return (
    <ScrollView style={STYLES.bgColor(COLORS.dark.white)}>
      <View style={[style.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{container: {position: 'absolute'}}}
          onLeftIconPress={backNavigationHandler}
        />

        <View style={[style.contentContainer]}>
          <AppLogo extraStyle={{container: [STYLES.bottom('10%')]}} />
          <View style={[style.formContainer]}>
            <AppText
              title={LABELS.welcomeBack}
              variant={'h2'}
              extraStyle={[
                STYLES.fontSize(22),
                STYLES.fontFamily(Fonts.PoppinsSemiBold),
              ]}
              alignSelf={'center'}
            />

            <AppText
              title={LABELS.loginMessage}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'center'}
              color={COLORS.dark.gray}
            />

            <Space mT={10} />

            <AppText
              title={LABELS.emailAddress}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.emailPlaceholder}
              onChangeText={onEnterEmail}
            />

            <Space mT={10} />

            <AppText
              title={LABELS.Password}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.passwordPlaceholder}
              secureTextEntry={true}
              keyboardType={'default'}
              onChangeText={onPasswordEnter}
            />
            <Space mT={10} />

            <View style={[STYLES.row]}>
              <CustomCheckbox
                selected={isChecked}
                onPress={toggleCheckbox}
                color={COLORS.dark.primary}
              />
              <View style={[STYLES.rowCenterBt, STYLES.width('92%')]}>
                <AppText
                  title={LABELS.rememberMe}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                  color={COLORS.dark.checkboxText}
                />
                <TouchableOpacity onPress={forgotPassHandler}>
                  <AppText
                    title={LABELS.forgotPass}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                    color={COLORS.dark.black}
                    onPress={forgotPassHandler}
                  />
                </TouchableOpacity>
              </View>
            </View>
            <Space mT={20} />

            <AppButton
              title={LABELS.login}
              variant="filled"
              textVariant={'h5'}
              onPress={loginHandler}
            />
            <Space mT={20} />

            <View style={style.hrContainer}>
              <View style={style.hr}></View>
              <AppText
                title={LABELS.continueWith}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                color={COLORS.dark.black}
                variant={'h5'}
              />
              <View style={style.hr}></View>
            </View>
            <Space mT={30} />

            <SocialAuth
              onGoogleAuth={googleAuthHandler}
            />
            <Space mT={20} />
            <TouchableOpacity style={[STYLES.rowCenter, STYLES.JCCenter]}>
              <AppText
                title={LABELS.alreadyHaveAccount}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                color={COLORS.dark.black}
              />
              <AppText
                title={LABELS.signUp}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                color={COLORS.dark.primary}
                variant={'h5'}
                onPress={signUpPageNavigationHandler}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default LoginScreen;
