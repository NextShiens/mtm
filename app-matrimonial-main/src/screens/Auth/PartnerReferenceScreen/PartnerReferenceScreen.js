import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, STYLES } from '../../../assets/theme';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import Space from '../../../components/Space/Space';
import UserDetailsCard from '../../../components/UserDetailsCard/UserDetailsCard';
import { QualificationList, indianCastes, indianMotherTongues, workLocationList, occupationList } from '../../../data/appData';
import { preferDetails } from '../../../data/appData';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';
import { API_URL } from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../../utils/native';

const headData = {
  partnerAge: ['18-25', '26-35', '36-45', '46+'],
  partnerMaritalStatus: ['Single', 'Divorced', 'Married', 'Widowed'],
};

const demoData = {
  partnerHeight: [
    '4 feet 0 inches', '4 feet 1 inch', '4 feet 2 inches', '4 feet 3 inches', '4 feet 4 inches', '4 feet 5 inches',
    '4 feet 6 inches', '4 feet 7 inches', '4 feet 8 inches', '4 feet 9 inches', '4 feet 10 inches', '4 feet 11 inches',
    '5 feet 0 inches', '5 feet 1 inch', '5 feet 2 inches', '5 feet 3 inches', '5 feet 4 inches', '5 feet 5 inches',
    '5 feet 6 inches', '5 feet 7 inches', '5 feet 8 inches', '5 feet 9 inches', '5 feet 10 inches', '5 feet 11 inches',
    '6 feet 0 inches', '6 feet 1 inch', '6 feet 2 inches', '6 feet 3 inches', '6 feet 4 inches', '6 feet 5 inches',
    '6 feet 6 inches', '6 feet 7 inches', '6 feet 8 inches', '6 feet 9 inches', '6 feet 10 inches', '6 feet 11 inches',
    '7 feet 0 inches'
  ],
  education: QualificationList,
  partnerOccupation: occupationList,
  partnerMotherTongue: indianMotherTongues,
  partnerAnnualIncome: ['0-5 Lac', '5-10 Lac', '10-20 Lac', '20+ Lac'],
  partnerSect: indianCastes,
  partnerCity: workLocationList,
};


const PartnerReferenceScreen = ({ navigation }) => {
  const route = useRoute();
  const previousProfileData = route.params?.profileData || {};

  const [allProfileData, setAllProfileData] = useState({
    age: previousProfileData.age || '',
    height: previousProfileData.height || '',
    gender: previousProfileData.gender || '',
    maritalStatus: previousProfileData.maritalStatus || '',
    religion: previousProfileData.religion || '',
    motherTongue: previousProfileData.motherTongue || '',
    sect: previousProfileData.sect || '',
    city: previousProfileData.city || '',
    DOB: previousProfileData.dateOfBirth || '',

    // Fields from ProfileDetailsScreen
    highestDegree: previousProfileData.highestDegree || '',
    occupation: previousProfileData.occupation || '',
    employedIn: previousProfileData.employer || '',
    annualIncome: previousProfileData.annualIncome || '',
    workLocation: previousProfileData.workLocation || '',

    // Fields for PartnerReferenceScreen
    partnerPreference: {
      partnerAge: '',
      partnerMaritalStatus: '',
      partnerHeight: '',
      education: '',
      partnerOccupation: '',
      partnerMotherTongue: '',
      partnerAnnualIncome: '',
      partnerSect: '',
      partnerCity: '',
    }
  });

  const [isLoading, setIsLoading] = useState(false);

  const style = styles;

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const updatePartnerPreference = (field, value) => {
    setAllProfileData(prevData => ({
      ...prevData,
      partnerPreference: {
        ...prevData.partnerPreference,
        [field]: value
      }
    }));
  };

  const nextPageNavigationHandler = async () => {
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
            title={LABELS.partnerPreference}
            iconRight={
              <TouchableOpacity onPress={() => {
                navigation.navigate('NotificationScreen');
              }}>
                <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
              </TouchableOpacity>
            }
          />
        </View>
        <Space mT={20} />
        <View style={style.contentContainer}>
          <AppText
            title={LABELS.match}
            variant={'h4'}
            extraStyle={{ fontFamily: Fonts.PoppinsMedium }}
          />
          <Space mT={20} />
          <View>
            {Object.entries(headData).map(([field, data]) => (
              <View key={field}>
                <CustomDropdown
                  placeholder={LABELS[field] || field}
                  data={data}
                  field={field}
                  setSelected={val => {
                    updatePartnerPreference(field, val);
                  }}
                  searchPlaceholder={`Search ${field}`}
                />
                <View style={style.hr}></View>
              </View>
            ))}
          </View>
          <Space mT={15} />
          <AppText
            title={LABELS.contentPartnerPreference}
            alignSelf={'center'}
            variant={'h6'}
            color={COLORS.dark.gray}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          />
          <Space mT={10} />
          <AppText
            title={LABELS.addMore}
            variant={'h4'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
          />
          <Space mT={20} />
          <View>
            {Object.entries(demoData).map(([field, data]) => (
              <View key={field}>
                <CustomDropdown
                  placeholder={LABELS[field] || field}
                  data={data}
                  field={field}
                  setSelected={val => {
                    updatePartnerPreference(field, val);
                  }}
                  searchPlaceholder={`Search ${field}`}
                />
                <View style={style.hr}></View>
              </View>
            ))}
          </View>
          <Space mT={20} />
          {isLoading ? (
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          ) : (
            <AppButton
              variant="filled"
              title={isLoading ? 'Registering...' : LABELS.save}
              extraStyle={{
                text: [STYLES.fontFamily(Fonts.PoppinsMedium)],
              }}
              textVariant={'h5'}
              onPress={nextPageNavigationHandler}
            />
          )}
          <Space mT={20} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PartnerReferenceScreen;