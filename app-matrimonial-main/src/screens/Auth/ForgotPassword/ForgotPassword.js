import React, {useState} from 'react';
import {ScrollView, View} from 'react-native';
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

// const changepassword =async () => { 
//     const data = await fetch(
//       `${API_URL}/user/change-password`,
//       {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({
//           email: email,
//           password: password,
//         }),
//       },
//     );
//     const response = await data.json();
//     if (response.status === 200) {
//       console.log('response', response);
//       await AsyncStorage.setItem('AccessToken', response.data.token);
//       navigation.navigate('DrawerNavigation');
//     } else {
//       console.log('response', response);
//       Toast(response.message);
//     }
//   };

const ForgotPassword = ({navigation}) => {
  const onRegisterPress = () => {
    console.log('change password clicked');
  };
  const onCancelHandler = () =>{
    navigation.navigate('LoginScreen')
  }
  const style = styles;
  const backNavigationHandler = () => {
    navigation.goBack();
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
              onChangeText={text => handleInputChange('password', text)}
            />
            <Space mT={35} />
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
