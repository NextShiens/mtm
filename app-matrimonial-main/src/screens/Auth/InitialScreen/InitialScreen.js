import React, { useState, useEffect } from 'react';
import { ImageBackground, View } from 'react-native';
import { IMAGES } from '../../../assets/images';
import AppButton from '../../../components/AppButton/AppButton';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles as styling } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { getCurrentUser, getCurrentUserWithToken } from '../../../services/firebase';
import { get } from 'react-native/Libraries/TurboModule/TurboModuleRegistry';

const InitialScreen = ({ navigation }) => {
  const [isLoading, setLoading] = useState(false);
  const [loginToken, setLoginToken] = useState('');
  useEffect(() => {
    const checkLogin = async () => {
      const AccessToken = await AsyncStorage.getItem('AccessToken');
      setLoginToken(AccessToken);
      let currentUser = getCurrentUser();
      if (currentUser && AccessToken) {
        navigation.navigate('DrawerNavigation');
        navigation.reset({
          index: 0,
          routes: [{ name: 'DrawerNavigation' }],
        });
      } else {
        console.log("No user is currently signed in.");
      }
    };
    checkLogin();
  }, []);
  const styles = styling;
  const signUpNavigation = () => {
    navigation.navigate('RegisterScreen');
  };
  const loginNavigation = () => {
    if (loginToken) {
      console.log("Login Token is available", loginToken);
      // navigation.navigate('DrawerNavigation');
      navigation.reset({
        index: 0,
        routes: [{ name: 'DrawerNavigation' }],
      });
    } else {
      navigation.navigate('LoginScreen');
    }
  };
  return (
    <>
      <View style={styles.container}>
        <ImageBackground
          source={IMAGES.initialBackground}
          resizeMode="cover"
          style={styles.image}>
          <ImageBackground
            source={IMAGES.gradientBg}
            resizeMode="cover"
            style={styles.image}>
            <View style={styles.contentContainer}>
              <View style={{ alignSelf: 'center' }}>
                <CustomImage
                  source={IMAGES.initialLogo}
                  size={190}
                  resizeMode={'contain'}
                />
                <AppText
                  title={LABELS.initialMessage}
                  alignSelf={'center'}
                  color={'white'}
                  variant={'h5'}
                  extraStyle={styles.textPara}
                />
                <AppText
                  title={LABELS.continueInitialMsg}
                  alignSelf={'center'}
                  color={'white'}
                  variant={'h5'}
                  extraStyle={styles.textPara}
                />
              </View>

              <Space mT={20} />
              <AppButton
                title={LABELS.createAccount}
                variant="filled"
                textVariant={'h5'}
                onPress={signUpNavigation}
                onPressText={signUpNavigation}
              />
              <Space mT={20} />
              <AppButton
                title={LABELS.login}
                variant="outlined"
                textVariant={'h5'}
                onPress={loginNavigation}
                onPressText={loginNavigation}
              />
              <Space mB={20} />
            </View>
          </ImageBackground>
        </ImageBackground>
      </View>
    </>
  );
};

export default InitialScreen;
