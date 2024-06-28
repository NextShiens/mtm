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
    employer: '',
    annualIncome: '',
    workLocation: '',
  });

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const navigationHandler = () => {
    const {highestDegree, occupation, employer, annualIncome, workLocation} =
      formData;
    if (
      !highestDegree &&
      !occupation &&
      !employer &&
      !annualIncome &&
      !workLocation
    ) {
      Toast(ERRORS.emptyForm);
    } else {
      if (isValidProfileDetails({...formData})) {
        Toast('one more step...');
        navigation.navigate('PartnerReferenceScreen', {
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
              title={LABELS.employIn}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <AppInput
              placeholder={LABELS.employePlaceholder}
              onChangeText={text => setFormData({...formData, employer: text})}
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
                 <AppInput
              placeholder={LABELS.incomePlaceholder}
              onChangeText={text => setFormData({...formData, annualIncome: text})}
              keyboardType={'default'}
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