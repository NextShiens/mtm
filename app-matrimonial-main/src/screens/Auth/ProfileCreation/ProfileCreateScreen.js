import React, { useState } from 'react';
import AppText from '../../../components/AppText/AppText';
import { View, ScrollView } from 'react-native';
import LayoutImage from '../../../components/LayoutImage/LayoutImage';
import { IMAGES } from '../../../assets/images';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { SVG } from '../../../assets/svg';
import AppLogo from '../../../components/AppLogo/AppLogo';
import { styles } from './styles';
import { LABELS } from '../../../labels';
import Space from '../../../components/Space/Space';
import { Fonts } from '../../../assets/fonts';
import { COLORS, STYLES } from '../../../assets/theme';
import AppInput from '../../../components/AppInput/AppInput';
import AppButton from '../../../components/AppButton/AppButton';
import { useNavigation } from '@react-navigation/native';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import BirthDatePicker from '../../../libraries/DatePicker/DatePicker';
import { isValidProfileData } from '../../../utils/validation';
import CustomCountryCodePicker from '../../../libraries/CustomCountryCodePicker/CustomCountryCodePicker';
import { Toast } from '../../../utils/native';
import { ERRORS } from '../../../labels/error';
import { indianCastes,workLocationList,indianMotherTongues } from '../../../data/appData';  
const heightOptions = [
 '4ft - 4.5ft', '4.6ft - 5ft', '5.1ft - 5.5ft', '5.6ft - 6ft', '6ft+']
 const maritalStatusOptions = ['Single', 'Divorced', 'Married', 'Widowed'];
 const religionsInIndia = [
  "Hinduism",
  "Christianity",
  "Sikhism",
  "Buddhism",
  "Jainism",
  "Zoroastrianism",
  "Judaism",
  "Others"
];
const ageOptions = ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"];

const ProfileCreateScreen = () => {
  const [countryCallingCode, setCountryCallingCode] = useState('');
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [countryCode, setCountryCode] = useState('+91');
  const [selectedCountry, setSelectedCountry] = useState('IN');
  const [countryShow, setCountryShow] = useState(false);
  const [formData, setFormData] = useState({
    age: '',
    height: '',
    gender: '',
    maritalStatus: '',
    dateOfBirth: '',
    religion: '',
    motherTongue: '',
    cast: '',
    city: '',

  });

  const navigation = useNavigation();
  const style = styles;

  const backNavigationHandler = () => {
    navigation.goBack();
  };


  const openCountryModal = () => {
    setCountryShow(true);
  };

  const closeCountryModal = () => {
    setCountryShow(false);
  };

  const onSelectCountry = item => {
    setCountryCode(item.dial_code);
    setSelectedCountry(item.code);
    setCountryShow(false);
  };

  const onDateCancel = () => {
    setOpen(false);
  };

  const dateConfirmationHandler = date => {
    setOpen(false);
    setDate(date);
    const dateObject = new Date(date);
    const year = dateObject.getFullYear();
    const month = dateObject.getMonth() + 1;
    const newDate = dateObject.getDate();
    setSelectedYear(year);
    setSelectedMonth(month);
    setSelectedDay(newDate);
    setSelectedDate(`${newDate}/${month}/${year}`);
    setFormData({ ...formData, dateOfBirth: `${newDate}/${month}/${year}` });
  };

  const onDateOpen = () => {
    setOpen(true);
  };

  const registrationHandler = () => {
    const { age, height, gender, maritalStatus, dateOfBirth, religion, motherTongue, cast, city } = formData;

    if (!age || !height || !gender || !maritalStatus || !dateOfBirth ||  !religion || !motherTongue || !cast || !city) {
      Toast(ERRORS.emptyForm);
    } else {
      const isValid = isValidProfileData({
        age,
        height,
        gender,
        maritalStatus,
        dateOfBirth,
        religion,
        motherTongue,
        sect,
        city,
      });

      if (isValid) {
        Toast('Just one step left in your profile completion');
        navigation.navigate('ProfileDetailsScreen', {
          profileData: {
            age,
            height,
            gender,
            maritalStatus,
            dateOfBirth,
            religion,
            motherTongue,
            sect,
            city,
          },
        });
      }
    }
  };


  return (
    <ScrollView style={STYLES.bgColor(COLORS.dark.white)}>
      <View style={[style.container]}>
        <LayoutImage imgSrc={IMAGES.theme2} />
        <AppHeader
          iconLeft={<SVG.BackArrow fill={COLORS.dark.black} />}
          extraStyle={{ container: STYLES.position('absolute') }}
          onLeftIconPress={backNavigationHandler}
        />
        <View style={[style.contentContainer]}>
          <AppLogo extraStyle={{ container: STYLES.bottom('10%') }} />
          <View style={style.formContainer}>
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
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'center'}
              color={COLORS.dark.gray}
            />
            <Space mT={20} />

            <AppText
              title={LABELS.age}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />
            <CustomDropdown
              data={ageOptions}
              placeholder={LABELS.select}
              search={false}
              setSelected={val => {
                setFormData({ ...formData, age: val });
              }}
              searchPlaceholder="Search age..."
            />
            <Space mT={10} />

            <AppText
              title={LABELS.Gender}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown
              search={false}
              data={['Male','Female']}
              placeholder={LABELS.Gender}
              setSelected={val => {
                setFormData({ ...formData, gender: val });
              }}
               searchPlaceholder="Search gender..."
            />
            <Space mT={10} />

            <AppText
              title={LABELS.height}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />
            <CustomDropdown
              data={heightOptions}
              search={false}
              placeholder={LABELS.height}
              setSelected={val => {
                setFormData({ ...formData, height: val });
              }}
              searchPlaceholder="Search height..."
            />
            <Space mT={10} />

            <AppText
              title={LABELS.dateOfBirth}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
              onPress={() => {
                setOpen(true);
              }}
            />
            <Space mT={10} />
            <BirthDatePicker
              open={open}
              selectedDate={date}
              onConfirm={dateConfirmationHandler}
              onCancel={onDateCancel}
              onOpen={onDateOpen}
              placeholder={selectedDate}
            />

            <Space mT={15} />

            <AppText
              title={LABELS.maritalStatus}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown 
              data={maritalStatusOptions} 
              search={false}
              placeholder={LABELS.maritalStatus}
              setSelected={val => {
                setFormData({ ...formData, maritalStatus: val });
              }}
               searchPlaceholder="Search maritalStatus..."
            />
            <Space mT={10} />
                <AppText
              title={"Religion"}  
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown 
              data={religionsInIndia} 
              search={false}
              placeholder={"Religion"}  
              setSelected={val => {
                setFormData({ ...formData, religion: val });
              }}
              searchPlaceholder="Search religion..."
            />
             <Space mT={10} />
                <AppText
              title={"MotherTongue"}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown 
              data={indianMotherTongues} 
              search={false}
              placeholder={"MotherTongue"}
              setSelected={val => {
                setFormData({ ...formData, motherTongue: val });
              }}
              searchPlaceholder="Search motherTongue..."
            />
             <Space mT={10} />
                <AppText
              title={LABELS.sect}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown 
              data={indianCastes} 
              search={false}
              placeholder={LABELS.sect}
              setSelected={val => {
                setFormData({ ...formData, sect: val });
              }}
               searchPlaceholder="Search sect..."
            />
                   <Space mT={10} />
                <AppText
              title={LABELS.city}
              variant={'h5'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              alignSelf={'flex-start'}
              color={COLORS.dark.black}
            />
            <Space mT={10} />

            <CustomDropdown 
              data={workLocationList} 
              search={false}
              placeholder={LABELS.city}
              setSelected={val => {
                setFormData({ ...formData, city: val });
              }}
              searchPlaceholder="Search city..."

            />
            <Space mT={20} />
            <AppButton
              title={LABELS.continue}
              variant="filled"
              textVariant={'h5'}
              onPress={registrationHandler}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default ProfileCreateScreen;