import auth from '@react-native-firebase/auth';
import { useNavigation } from '@react-navigation/native';
import React, { useEffect, useState } from 'react';
import { Alert, ScrollView, TouchableOpacity, View, ActivityIndicator, TextInput } from 'react-native';
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
import SocialAuth from '../../../components/SocialAuth/SocialAuth';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { ERRORS } from '../../../labels/error';
import CustomCheckbox from '../../../libraries/Checkbox/Checkbox';
import { Toast } from '../../../utils/native';
import { styles } from './styles';
import { loginUser } from '../../../services/firebase';
import { isValidatedLogin } from '../../../utils/validation';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';
import { signInWithGoogle } from '../../../services/authServices';
import { Svg, Path } from 'react-native-svg';
import CustomAlert from '../../../components/globalAlert';

const LoginScreen = () => {
  const [isChecked, setIsChecked] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [alertVisible, setAlertVisible] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const navigation = useNavigation();
  const style = styles;

  const PasswordEyeIcon = ({ showPassword }) => {
    return showPassword ? (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
        <Path
          d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8-11-8-11-8z"
          fill="#E5E5E5"
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
          stroke="#E5E5E5"
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
  //   const googleAuthHandler = async () => { 
  // };
  const forgotPassHandler = () => {
    navigation.navigate('ForgotPassword');
  };

  const getSubscriptions = async () => {
    try {
      const response = await fetch(`${API_URL}/user/getSubscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });
      const data = await response.json();
      await AsyncStorage.setItem('subscriptions', JSON.stringify(data));
    } catch (error) {
      console.log(error.message);
    } finally {
      console.log('done');
    }
  };
  const loginAndGetAccessToken = async () => {
    try {
      let fcToke= await AsyncStorage.getItem('fcmToken')
      console.log('fc',fcToke)
      const response = await fetch(`${API_URL}/user/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${await AsyncStorage.getItem('AccessToken')}`
        },
        body: JSON.stringify({
          email: email,
          password: password,
          fcmToken:fcToke.toString()
        }),
      });

      const content = await response.json();
      console.log(content);

      if (!response.ok) {
        throw new Error(content.message || 'An error occurred during login.');
      }

      if (!content.user.isActive) {
        throw new Error('Your account is not active. Please wait for the admin to activate it.');
      }

      await AsyncStorage.setItem('AccessToken', content.token);
      await AsyncStorage.setItem('theUser', JSON.stringify(content));

      return content;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };

  const loginHandler = async () => {
    if (!email || !password) {
      setAlertMessage(ERRORS.emptyForm);
      setAlertVisible(true);
      return;
    }

    if (!isValidatedLogin({ email, password })) {
      setAlertMessage('Invalid email or password');
      setAlertVisible(true);
      return;
    }

    setIsLoading(true);

    try {
      const user = await loginUser(email, password);
      const backendLoginResult = await loginAndGetAccessToken();
      await AsyncStorage.setItem('loginToken', backendLoginResult.token);
      await getSubscriptions();

      // If we've made it this far, all checks have passed
      // navigation.navigate('DrawerNavigation');
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigation' }],
      });
    } catch (error) {
      console.error('Login error:', error);
      setAlertMessage(error.message || 'An error occurred during login');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      setIsLoading(true);
      const { user } = await signInWithGoogle();
      if (user) {
        console.log('Google Sign-In success:', user);
        await loginAndGetAccessToken();
        await getSubscriptions();
        navigation.navigate('DrawerNavigation');
      }
    } catch (error) {
      console.error('Google Sign-In error:', error);
      setAlertMessage('An error occurred during Google Sign-In');
      setAlertVisible(true);
    } finally {
      setIsLoading(false);
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
      <CustomAlert
        visible={alertVisible}
        title="Notice"
        message={alertMessage}
        onClose={() => setAlertVisible(false)}
      />
      <View style={[style.container]}>

        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{ container: { position: 'absolute' } }}
          onLeftIconPress={backNavigationHandler}
        />

        <View style={[style.contentContainer]}>
          <AppLogo extraStyle={{ container: [STYLES.bottom('10%')] }} />
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

            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={LABELS.emailPlaceholder}
                  keyboardType={'email-address'}
                  onChangeText={onEnterEmail}
                  placeholderTextColor="#949494"
                  style={styles.input}
                />
              </View>
            </View>

            <Space mT={10} />

            <AppText
              title={LABELS.Password}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <View style={styles.container}>
              <View style={styles.inputContainer}>
                <TextInput
                  placeholder={LABELS.passwordPlaceholder}
                  secureTextEntry={!showPassword}
                  keyboardType={'default'}
                  onChangeText={setPassword}
                  placeholderTextColor="#949494"
                  style={styles.input}
                />
                <TouchableOpacity
                  onPress={() => setShowPassword(!showPassword)}
                  style={styles.iconContainer}>
                  <PasswordEyeIcon showPassword={showPassword} color="#E5E5E5" />
                </TouchableOpacity>
              </View>
            </View>

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
              title={isLoading ? 'Logging in...' : LABELS.login}
              variant="filled"
              textVariant={'h5'}
              onPress={loginHandler}
              disabled={isLoading}
            >
              {isLoading && (
                <ActivityIndicator size="small" color={COLORS.dark.white} style={{ marginLeft: 10 }} />
              )}
            </AppButton>
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
              onGoogleAuth={handleGoogleSignIn}
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