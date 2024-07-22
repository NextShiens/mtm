import {useNavigation, useRoute} from '@react-navigation/native';
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
import {
  QualificationList,
  occupationList,
  workLocationList,
} from '../../../data/appData';
import {LABELS} from '../../../labels';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import {isValidProfileDetails} from '../../../utils/validation';
import {styles} from './styles';
import {Toast} from '../../../utils/native';
import {ERRORS} from '../../../labels/error';

const ProfileDetailsScreen = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const previousProfileData = route.params?.profileData || {};

  const style = styles;
  const [formData, setFormData] = useState({
    highestDegree: '',
    occupation: '',
    employedIn: '',
    annualIncome: '',
    workLocation: '',
  });

  const annualIncomeList = [
    '50,000', '2,50,000', '4,50,000', '6,50,000', '8,50,000', '10,50,000',
    '12,50,000', '14,50,000', '16,50,000', '18,50,000', '20,50,000', '22,50,000',
    '24,50,000', '26,50,000', '28,50,000', '30,50,000', '32,50,000', '34,50,000',
    '36,50,000', '38,50,000', '40,50,000', '42,50,000', '44,50,000', '46,50,000',
    '48,50,000', '50,50,000', '52,50,000', '54,50,000', '56,50,000', '58,50,000',
    '60,50,000', '62,50,000', '64,50,000', '66,50,000', '68,50,000', '70,50,000',
    '72,50,000', '74,50,000', '76,50,000', '78,50,000', '80,50,000', '82,50,000',
    '84,50,000', '86,50,000', '88,50,000', '90,50,000', '92,50,000', '94,50,000',
    '96,50,000', '98,50,000', '1,00,00,000'
  ];

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const navigationHandler = () => {
    const {highestDegree, occupation, employedIn, annualIncome, workLocation} =
      formData;
    if (
      !highestDegree &&
      !occupation &&
      !employedIn &&
      !annualIncome &&
      !workLocation
    ) {
      Toast(ERRORS.emptyForm);
    } else {
      if (isValidProfileDetails({...formData})) {
        console.log('formData', formData);

        Toast('one more step...');
        navigation.navigate('BasicPreferenceForm', {
          profileData: {
            ...previousProfileData,
            ...formData
          }
        });
      }
    }
  };

  const onEducationSelect = val => {};
  const onWorkLocationSelect = val => {};

  return (
    <ScrollView style={{backgroundColor: 'white'}}>
      <View style={[style.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          extraStyle={{container: {position: 'absolute'}}}
          onLeftIconPress={backNavigationHandler}
        />
        <View style={[style.contentContainer]}>
          <AppLogo extraStyle={{container: STYLES.bottom('10%')}} />
          <View style={[style.formContainer]}>
            <AppText
              title={LABELS.profileCreation}
              variant={'h2'}
              extraStyle={[
                STYLES.fontSize(22),
                STYLES.fontFamily(Fonts.PoppinsSemiBold),
              ]}
              alignSelf={'center'}
            />

            <AppText
              title={LABELS.profileCreateMsg}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'center'}
              color={COLORS.dark.gray}
            />
            <Space mT={20} />

            <AppText
              title={LABELS.highestDegree}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown
              data={QualificationList}
              placeholder={LABELS.select}
              onSelect={onEducationSelect}
              search={false}
              setSelected={val => {
                setFormData({...formData, highestDegree: val});
              }}
              searchPlaceholder="Search degree..."
            />

            <Space mT={20} />

            <AppText
              title={LABELS.occupation}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />
            <CustomDropdown
              data={occupationList}
              placeholder={LABELS.select}
              setSelected={val => {
                setFormData({...formData, occupation: val});
              }}
               searchPlaceholder="Search occupation..."
            />
            <Space mT={10} />

            <AppText
              title={LABELS.employedIn}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.employePlaceholder}
              onChangeText={text => setFormData({...formData, employedIn: text})}
              keyboardType={'default'}
            />
            <Space mT={10} />

            <AppText
              title={LABELS.AnnualIncome}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />
            
            <CustomDropdown
              data={annualIncomeList}
              placeholder={LABELS.incomePlaceholder}
              setSelected={val => {
                setFormData({...formData, annualIncome: val});
              }}
              searchPlaceholder="Search income..."
            />

            <Space mT={15} />

            <AppText
              title={LABELS.workLocation}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown
              placeholder={LABELS.workLocation}
              data={workLocationList}
              setSelected={val => {
                setFormData({...formData, workLocation: val});
              }}
               searchPlaceholder="Search workLocation..."
            />

            <Space mT={20} />
            <AppButton
              title={LABELS.continue}
              variant="filled"
              textVariant={'h5'}
              onPress={navigationHandler}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileDetailsScreen;