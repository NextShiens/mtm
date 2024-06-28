import React, { useEffect, useState } from 'react';
import { View, ScrollView } from 'react-native';
import { TouchableOpacity } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { profilePictures, profileUpdateData } from '../../../data/appData';
import { LABELS } from '../../../labels';
import BirthDatePicker from '../../../libraries/DatePicker/DatePicker';
import { styles } from './styles';
import AppButton from '../../../components/AppButton/AppButton';
import { API_URL } from '../../../../constant';
import CustomCountryCodePicker from '../../../libraries/CustomCountryCodePicker/CustomCountryCodePicker';
import { Toast } from '../../../utils/native';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';


const ProfileUpdateScreen = ({ navigation }) => {
  const [isCameraShown, setIsCameraShown] = useState(true);
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [countryCode, setCountryCode] = useState('+91');
  const [countryShow, setCountryShow] = useState(false);
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState(new Date());
  const [profileImage, setProfileImage] = useState(null);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedMonth, setSelectedMonth] = useState(null);
  const [selectedYear, setSelectedYear] = useState(null);
  const [selectedDay, setSelectedDay] = useState(null);

  const [profileData, setProfileData] = useState({
    name: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    gender: '',
    height: '',
    location: '',
    motherTongue: '',
    partner: '',
    highestDegree: '',
    occupation: '',
    maritalStatus: '',
    employedIn: '',
    annualIncome: '',
    profilePicture: [],
  });

  const style = styles;

  const openCamera = () => {
    const options = {
      saveToPhotos: true,
      mediaType: 'photo',
    };

    launchCamera(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        setProfileImage(source);
        console.log('response from camera', response);
        uploadImage(response.assets[0]);
      }
    });
  };

  const openImageLibrary = () => {
    const options = {
      selectionLimit: 1,
      mediaType: 'photo',
    };

    launchImageLibrary(options, (response) => {
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.error) {
        console.log('ImagePicker Error: ', response.error);
      } else {
        const source = { uri: response.assets[0].uri };
        console.log('source line 108', source);
        setProfileImage(source);
        uploadImage(response.assets[0]);
      }
    });
  };

  const uploadImage = async (imageFile) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) {
        throw new Error('No access token found');
      }

      const formData = new FormData();

      // Use File instead of Blob if possible
      const fileUri = imageFile.uri;
      const filename = imageFile.name || fileUri.split('/').pop();
      const match = /\.(\w+)$/.exec(filename);
      const type = match ? `image/${match[1]}` : 'image';

      formData.append('file', { uri: fileUri, name: filename, type });

      console.log('Sending request to:', `${API_URL}/user/uploadFile`);
      const response = await fetch(`${API_URL}/user/uploadFile`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          // Let the browser set the Content-Type header for multipart/form-data
        },
        body: formData,
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error('Server responded with:', response.status, errorText);
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      console.log('Response from upload image:', result);

      setProfileData(prevData => ({
        ...prevData,
        profilePicture: [result.fileUrl],
      }));
      Toast('Profile picture uploaded successfully');
    } catch (error) {
      console.error('Error uploading image:', error.message);
      Toast('Error uploading image: ' + error.message);
    }
  };

  const handleProfileUpdate = item => {
    setSelectedBtn(item.key);
  };

  const onTextEnter = (field, value) => {
    setProfileData(prevData => ({
      ...prevData,
      [field]: value,
    }));
  };

  const openCountryModal = () => {
    setCountryShow(true);
  };

  const closeCountryModal = () => {
    setCountryShow(false);
  };

  const onSelectCountry = item => {
    setCountryCode(item.dial_code);
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
    setProfileData({...profileData, dateOfBirth: `${newDate}/${month}/${year}`});
  };

  const onDateOpen = () => {
    setOpen(true);
  };
  const getUserData = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/profile`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        },
      });

      const result = await response.json();

      if (response.ok) {
        setProfileData({
          name: result.user.name ? result.user.name.toString() : '',
          email: result.user.email ? result.user.email.toString() : '',
          phone: result.user.phone ? result.user.phone.toString() : '',
          dateOfBirth: result.user.DOB ? result.user.DOB.toString() : '',
          gender: result.user.gender ? result.user.gender.toString() : '',
          height: result.user.height ? result.user.height.toString() : '',
          location: result.user.city ? result.user.city.toString() : '',
          motherTongue: result.user.motherTongue ? result.user.motherTongue.toString() : '',
          partner: result.user.partner ? result.user.partner.toString() : '',
          highestDegree: result.user.highestDegree ? result.user.highestDegree.toString() : '',
          occupation: result.user.occupation ? result.user.occupation.toString() : '',
          maritalStatus: result.user.maritalStatus ? result.user.maritalStatus.toString() : '',
          employedIn: result.user.employedIn ? result.user.employedIn.toString() : '',
          annualIncome: result.user.annualIncome ? result.user.annualIncome.toString() : '',
        });
        console.log('profileData', result.user);
      } else {
        Toast(result.message);
      }
    } catch (error) {
      console.error('error', error);
    }
  };


  useEffect(() => {
    getUserData();
  }, []);

  const handleUpdate = async () => {
    const { name, email, phone, dateOfBirth: DOB, gender, height, location: city, motherTongue,  highestDegree, occupation, maritalStatus, employedIn, annualIncome, profilePicture: userImages } = profileData;
    console.log('profileData', profileData);

    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authorization": ` Bearer ${token}`
        },
        body: JSON.stringify({ name, email, phone, DOB, gender, height, city, motherTongue, highestDegree, occupation, maritalStatus, employedIn, annualIncome, userImages }),
      });

      const result = await response.json();
      console.log('response', result);
      if (!response.ok) {
        Toast(result.message);
      }
      Toast('Profile Updated Successfully');

    } catch (error) {
      console.error('error', error);
    }
  };



  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={COLORS.dark.black} />}
          title={LABELS.profile}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          iconRight={
            <>
              <CustomImage
                source={IMAGES.notificationIcon}
                size={25}
                resizeMode="contain"
              />
            </>
          }
        />
      </View>
      <Space mT={20} />
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        <View
          style={[
            isCameraShown
              ? style.profileContainer
              : style.withoutCameraContainer,
          ]}>
          {isCameraShown ? (
            <View style={style.uploadImgContainer}>
              <CustomImage
                source={IMAGES.camera}
                size={20}
                resizeMode={'contain'}
                onPress={openCamera}
              />
            </View>
          ) : (
            <></>
          )}

          {profileData.profilePicture ? (
            profileData.profilePicture.map(item => (

              <CustomImage
                source={item}
                size={100}
                resizeMode={'cover'}
                onPress={openImageLibrary}
              />
            ))
          ) : (
            profilePictures.map(item => (
              <CustomImage
                source={item.img}
                size={100}
                resizeMode={'contain'}
                key={item.key}
                onPress={openImageLibrary}
              />
            ))
          )}
        </View>
      </ScrollView>
      <Space mT={14} />
      <View style={STYLES.container}>
        <View style={style.mapContainer}>
          {profileUpdateData.map(item => {
            return (
              <AppButton
                variant="filled"
                key={item.key}
                extraStyle={{
                  container: [
                    selectedBtn === item.key
                      ? style.selectedBtn
                      : style.unSelectedBtn,
                  ],
                  text: [
                    selectedBtn === item.key
                      ? style.selectedText
                      : style.unSelectedText,
                  ],
                }}
                title={item.value}
                onPress={() => {
                  handleProfileUpdate(item);
                }}
              />
            );
          })}
        </View>
      </View>

      <Space mT={20} />
      {selectedBtn == 1 && (
        <View style={[STYLES.pH(HORIZON_MARGIN)]}>
          <AppText
            title={LABELS.name}
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
            color={COLORS.dark.inputBorder}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.name != '' ? profileData.name : LABELS.name}
            onChangeText={(value) => onTextEnter('name', value)}
            placeholderTextColor={COLORS.dark.black}
            value={profileData.name}
          />

          <Space mT={10} />

          <AppText
            color={COLORS.dark.inputBorder}
            title={LABELS.emailAddress}
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.email != '' ? profileData.email : LABELS.emailPlaceholder}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('email', value)}
            value={profileData.email}
          />

          <Space mT={10} />
          <AppText
            color={COLORS.dark.inputBorder}
            title={LABELS.phoneNumber}
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />

          <View style={style.countrySelectContainer}>
            <CustomCountryCodePicker
              countryShow={countryShow}
              onOpen={openCountryModal}
              onClose={closeCountryModal}
              countryCode={countryCode}
              onSelectCountry={onSelectCountry}
            />
            <AppInput
              keyboardType="numeric"
              placeholderTextColor={COLORS.dark.black}
              extraStyle={{
                textInput: [STYLES.JCCenter, STYLES.AICenter],
                textInputCont: [
                  STYLES.bC(COLORS.dark.transparent),
                  STYLES.JCCenter,
                ],
              }}
              placeholder={profileData.phone != '' ? profileData.phone : LABELS.phonePlaceholder}
              onChangeText={(value) => onTextEnter('phone', value)}
              value={profileData.phone}
            />
          </View>

          <Space mT={10} />

          <AppText
            color={COLORS.dark.inputBorder}
            title={LABELS.dateOfBirth}
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
            onPress={() => {
              setOpen(true);
            }}
          />
             <BirthDatePicker
              open={open}
              selectedDate={date}
              onConfirm={dateConfirmationHandler}
              onCancel={onDateCancel}
              onOpen={onDateOpen}
              placeholder={profileData.dateOfBirth != ''?profileData.dateOfBirth: selectedDate}
            />
          <Space mT={20} />
          <AppButton title={LABELS.update} onPress={handleUpdate} />
        </View>
      )}
      {selectedBtn == 2 && (
        <View style={[STYLES.pH(HORIZON_MARGIN)]}>
          <AppText
            title="Gender"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
            color={COLORS.dark.inputBorder}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.gender != '' ? profileData.gender : "e.g Male"}
            onChangeText={(value) => onTextEnter('gender', value)}
            placeholderTextColor={COLORS.dark.black}
            value={profileData.gender}
          />

          <Space mT={10} />

          <AppText
            color={COLORS.dark.inputBorder}
            title="Height"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.height != '' ? profileData.height : "5.6 feet"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('height', value)}
            value={profileData.height.toString()}
          />

          <Space mT={10} />
          <AppText
            color={COLORS.dark.inputBorder}
            title="Location"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.location != '' ? profileData.location : "location"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('location', value)}
            value={profileData.location}
          />
          <Space mT={10} />

          <AppText
            color={COLORS.dark.inputBorder}
            title="Mother Tongue"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />

          <Space mT={10} />

          <AppInput
            placeholder={profileData.motherTongue != '' ? profileData.motherTongue : "hindi"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('motherTongue', value)}
            value={profileData.motherTongue}
          />
          {/* <Space mT={10} />
          <AppText
            color={COLORS.dark.inputBorder}
            title="Partner"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />
          <AppInput
            placeholder={profileData.partner != '' ? profileData.partner : "partner"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('partner', value)}
            value={profileData.partner}
          /> */}
          <Space mT={20} />
        </View>
      )}
      {selectedBtn == 3 && (
        <View style={[STYLES.pH(HORIZON_MARGIN)]}>
          <AppText
            title="Highest Degree"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
            color={COLORS.dark.inputBorder}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.highestDegree != '' ? profileData.highestDegree : "e.g B.tech"}
            onChangeText={(value) => onTextEnter('highestDegree', value)}
            placeholderTextColor={COLORS.dark.black}
            value={profileData.highestDegree}
          />

          <Space mT={10} />

          <AppText
            color={COLORS.dark.inputBorder}
            title="Occupation"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />

          <AppInput
            placeholder={profileData.occupation != '' ? profileData.occupation : "Software Engineer"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('occupation', value)}
            value={profileData.occupation}
          />

          <Space mT={10} />
          <AppText
            color={COLORS.dark.inputBorder}
            title="Marital Status"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />

          <Space mT={10} />

          <AppInput
            placeholder={profileData.maritalStatus != '' ? profileData.maritalStatus : "Married"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('maritalStatus', value)}
            value={profileData.maritalStatus}
          />
          <Space mT={10} />
          <AppText
            color={COLORS.dark.inputBorder}
            title="Employed in"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />
          <AppInput
            placeholder={profileData.employedIn != '' ? profileData.employedIn : "AX Technology"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('employedIn', value)}
            value={profileData.employedIn}
          />
          <Space mT={10} />
          <AppText
            color={COLORS.dark.inputBorder}
            title="Annual Income"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            alignSelf={'flex-start'}
          />
          <Space mT={10} />
          <AppInput
            placeholder={profileData.annualIncome != '' ? profileData.annualIncome : "100000"}
            placeholderTextColor={COLORS.dark.black}
            onChangeText={(value) => onTextEnter('annualIncome', value)}
            value={profileData.annualIncome}
          />
          <Space mT={20} />
        </View>
      )}
    </ScrollView>
  );
};

export default ProfileUpdateScreen;