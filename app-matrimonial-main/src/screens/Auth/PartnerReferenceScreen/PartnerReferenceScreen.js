import React, { useState } from 'react';
import { ScrollView, TouchableOpacity, View, Image, ActivityIndicator } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, STYLES } from '../../../assets/theme';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import Space from '../../../components/Space/Space';
import { QualificationList, indianCastes, indianMotherTongues, workLocationList, occupationList } from '../../../data/appData';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import { useRoute } from '@react-navigation/native';

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
  partnerAnnualIncome: ['50,000', '2,50,000', '4,50,000', '6,50,000', '8,50,000', '10,50,000',
    '12,50,000', '14,50,000', '16,50,000', '18,50,000', '20,50,000', '22,50,000',
    '24,50,000', '26,50,000', '28,50,000', '30,50,000', '32,50,000', '34,50,000',
    '36,50,000', '38,50,000', '40,50,000', '42,50,000', '44,50,000', '46,50,000',
    '48,50,000', '50,50,000', '52,50,000', '54,50,000', '56,50,000', '58,50,000',
    '60,50,000', '62,50,000', '64,50,000', '66,50,000', '68,50,000', '70,50,000',
    '72,50,000', '74,50,000', '76,50,000', '78,50,000', '80,50,000', '82,50,000',
    '84,50,000', '86,50,000', '88,50,000', '90,50,000', '92,50,000', '94,50,000',
    '96,50,000', '98,50,000', '1,00,00,000'],
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

  const handlenext = () => {
    console.log('allProfileData', allProfileData);
    navigation.navigate('BasicPreferenceForm', { profileData: allProfileData });
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
              onPress={handlenext}
            />
          )}
          <Space mT={20} />
        </View>
      </View>
    </ScrollView>
  );
};

export default PartnerReferenceScreen;
