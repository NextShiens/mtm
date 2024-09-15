import React, {useState} from 'react';
import {ScrollView, View, Alert, TouchableOpacity} from 'react-native';
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
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../../constant';
import {Path, Svg} from 'react-native-svg';
import {Text} from 'react-native';

const ForgotPassword = ({navigation}) => {
  const [email, setEmail] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setloading] = useState(false);

  const handleInputChange = (field, value) => {
    if (field === 'email') setEmail(value);
    if (field === 'newPassword') setNewPassword(value);
    if (field === 'confirmPassword') setConfirmPassword(value);
  };

  const onRegisterPress = async () => {
    setloading(true);
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
          Authorization: `Bearer ${await AsyncStorage.getItem('AccessToken')} `,
        },
        body: JSON.stringify({
          email: email,
          password: newPassword,
        }),
      });

      const result = await response.json();

      if (response.ok) {
        setloading(false);
        Alert.alert('Success', 'Password changed successfully');
        navigation.navigate('LoginScreen');
      } else {
        setloading(false);
        Alert.alert('Error', result.message || 'Something went wrong');
      }
    } catch (error) {
      setloading(false);
      Alert.alert('Error', 'Failed to change password');
    }
  };

  const onCancelHandler = () => {
    navigation.navigate('LoginScreen');
  };

  const backNavigationHandler = () => {
    navigation.goBack();
  };
  const PasswordEyeIcon = ({showPassword}) => {
    return showPassword ? (
      <Svg width={24} height={24} viewBox="0 0 24 24" fill="black">
        <Path d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8-11-8-11-8z" fill="black" />
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

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={[styles.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{container: STYLES.position('absolute')}}
          onLeftIconPress={backNavigationHandler}
        />

        <View style={[styles.contentContainer]}>
          <AppLogo extraStyle={{container: STYLES.bottom('10%')}} />
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
            <View style={styles.inputContainer}>
              <AppInput
                placeholder={LABELS.passwordPlaceholder}
                secureTextEntry={!showNewPassword}
                keyboardType={'default'}
                onChangeText={text => handleInputChange('newPassword', text)}
              />
              <TouchableOpacity
                onPress={() => setShowNewPassword(!showNewPassword)}
                style={styles.PasswordEyeIcon}>
                <PasswordEyeIcon showPassword={showNewPassword} />
              </TouchableOpacity>
            </View>
            <Space mT={5} />
            <AppText
              title={LABELS.confirmPassword}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <View style={styles.inputContainer}>
              <AppInput
                placeholder={LABELS.passwordPlaceholder}
                secureTextEntry={!showConfirmPassword}
                keyboardType={'default'}
                onChangeText={text =>
                  handleInputChange('confirmPassword', text)
                }
              />
              <TouchableOpacity
                onPress={() => setShowConfirmPassword(!showConfirmPassword)}
                style={styles.PasswordEyeIcon}>
                <PasswordEyeIcon showPassword={showConfirmPassword} />
              </TouchableOpacity>
            </View>
            <Space mT={20} />
            <TouchableOpacity
              onPress={onRegisterPress}
              disable={loading}
              style={{
                backgroundColor: '#F97B22',
                paddingVertical: 15,
                alignItems: 'center',
                justifyContent: 'center',
                borderRadius:20
              }}>
              <Text style={{color: 'white'}}>
                {loading ? 'Loading...' : LABELS.changePass}
              </Text>
            </TouchableOpacity>

            <Space mT={15} />
            <AppButton
              title={LABELS.cancel}
              variant="outlined"
              textVariant={'h5'}
              extraStyle={{container: {borderColor: COLORS.dark.inputBorder}}}
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
