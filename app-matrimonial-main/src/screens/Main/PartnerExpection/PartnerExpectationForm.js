import React, { useState } from 'react';
import { ScrollView, View, ActivityIndicator, TextInput } from 'react-native';
// import { Fonts } from '../../../assets/fonts';
import { SVG } from '../../../assets/svg';
import { COLORS, STYLES } from '../../../assets/theme';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../../utils/native';

const PartnerExpectationForm = ({ navigation }) => {
  const route = useRoute();
  const previousProfileData = route.params?.profileData || {};

  const [allProfileData, setAllProfileData] = useState({
    ...previousProfileData,
    partnerExpectation: '',
  });

  const [isLoading, setIsLoading] = useState(false);

  const style = styles;

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const updatePartnerExpectation = (value) => {
    setAllProfileData(prevData => ({
      ...prevData,
      partnerExpectation: value
    }));
  };

  const handleSubmit = async () => {
    console.log('All profile data:', allProfileData);
    setIsLoading(true);
    try {
      const response = await fetch(`${API_URL}/user/completeProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${await AsyncStorage.getItem('AccessToken')}`
        },
        body: JSON.stringify(allProfileData),
      });

      if (!response.ok) {
        console.error('Failed to update profile:', response.statusText);
        Toast('Failed to update profile. Please try again.');
        return;
      }

      const responseData = await response.json();
      Toast('Account Created successfully!');
      navigation.navigate('LoginScreen');
    } catch (error) {
      console.error('Error updating profile:', error.message);
      Toast('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView>
      <View style={style.container}>
        <View style={style.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={backNavigationHandler}
            title={LABELS.partnerExpectation}
          />
        </View>
        <Space mT={20} />
        <View style={style.contentContainer}>
          <AppText
            title={LABELS.partnerExpectation}
            variant={'h4'}
          />
          <Space mT={20} />
          <TextInput
            style={style.input}
            multiline
            numberOfLines={6}
            placeholder={'Write your partner expectation here'}
            value={allProfileData.partnerExpectation}
            onChangeText={updatePartnerExpectation}
          />
          <Space mT={20} />
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          ) : (
            <AppButton
              variant="filled"
              title={isLoading ? 'Saving...' : LABELS.save}
              textVariant={'h5'}
              onPress={handleSubmit}
            />
          )}
          <Space mT={20} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PartnerExpectationForm;