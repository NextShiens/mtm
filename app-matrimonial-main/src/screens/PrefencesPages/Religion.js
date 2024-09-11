import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Image, Text, ScrollView, TouchableOpacity, ToastAndroid, ActivityIndicator, RefreshControl } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';
import { useNavigation } from '@react-navigation/native';
import { indianCastes, workLocationList, indianMotherTongues } from '../../data/appData';

const ReligionPage = () => {
  const navigation = useNavigation();
  const [religion, setReligion] = useState(null);
  const [caste, setCaste] = useState(null);
  const [motherTongue, setMotherTongue] = useState(null);
  const [manglik, setManglik] = useState(null);
  const [star, setStar] = useState(null);
  const [dosh, setDosh] = useState(null);
  const [birthPlace, setBirthPlace] = useState(null);
  const [birthTime, setBirthTime] = useState(null);
  const [initialUserData, setInitialUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

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
  const religio = religionsInIndia.map(religion => ({
    label: religion,
    value: religion
  }));

  const castes = indianCastes.map(caste => ({
    label: caste,
    value: caste
  }));

  const tongue = indianMotherTongues.map(tongue => ({
    label: tongue,
    value: tongue
  }));

  const manglikOptions = [
    'Manglik', 'Non-Manglik', 'Anshik Manglik',
  ];
  const maglik = manglikOptions.map(manglik => ({
    label: manglik,
    value: manglik
  }));

  const doshOptions = [
    'No Dosh', 'Manglik', 'Sarpa-Dosh', 'Kaal Sarp Dosh', 'Rahu-Dosh',
    'kethu-Dosh', 'kalathra-Dosh', 'Nadi Dosh', 'Mangal Dosh',
  ];
  const doshoption = doshOptions.map(dosh => ({
    label: dosh,
    value: dosh
  }));
  const starOptions = [
    "Ashwini", "Bharani", "Krittika", "Rohini", "Mrigashirsha", "Ardra",
    "Punarvasu", "Pushya", "Ashlesha", "Magha", "Purva Phalguni", "Uttara Phalguni",
    "Hasta", "Chitra", "Swati", "Vishakha", "Anuradha", "Jyeshta", "Mula",
    "Purva Ashadha", "Uttara Ashadha", "Shravana", "Dhanistha", "Shatabhisha",
    "Purva Bhadrapada", "Uttara Bhadrapada", "Revathi"
  ];
  const staroption = starOptions.map(star => ({
    label: star,
    value: star
  }));

  const birthTimeOptions = [
    '12:00 am', '01:00 am', '02:00 am', '03:00 am', '04:00 am', '05:00 am',
    '06:00 am', '07:00 am', '08:00 am', '09:00 am', '10:00 am', '11:00 am',
    '12:00 pm', '01:00 pm', '02:00 pm', '03:00 pm', '04:00 pm', '05:00 pm',
    '06:00 pm', '07:00 pm', '08:00 pm', '09:00 pm', '10:00 pm', '11:00 pm',
  ];
  const birth = birthTimeOptions.map(birth => ({
    label: birth,
    value: birth
  }));

  const location = workLocationList.map(location => ({
    label: location,
    value: location
  }));

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('theUser');
      console.log('userData', userData);
      if (userData !== null) {
        const parsedData = JSON.parse(userData);
        const user = parsedData.user;
        setReligion(user.horoscopeDetails.religion);
        setCaste(user.horoscopeDetails.caste);
        setMotherTongue(user.horoscopeDetails.motherTongue);
        setManglik(user.horoscopeDetails.manglik);
        setStar(user.horoscopeDetails.star);
        setDosh(user.horoscopeDetails.dosh);
        setBirthPlace(user.horoscopeDetails.birthPlace);
        setBirthTime(user.horoscopeDetails.birthTime);
        setInitialUserData(user);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    } finally {
      setIsLoading(false);
      setRefreshing(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const handleSave = async () => {
    const userProfile = {};

    // Compare each field with the initial data, and only add changed fields
    if (religion !== initialUserData.horoscopeDetails.religion) userProfile.religion = religion;
    if (caste !== initialUserData.horoscopeDetails.caste) userProfile.caste = caste;
    if (motherTongue !== initialUserData.horoscopeDetails.motherTongue) userProfile.motherTongue = motherTongue;
    if (manglik !== initialUserData.horoscopeDetails.manglik) userProfile.manglik = manglik;
    if (star !== initialUserData.horoscopeDetails.star) userProfile.star = star;
    if (dosh !== initialUserData.horoscopeDetails.dosh) userProfile.dosh = dosh;
    if (birthPlace !== initialUserData.horoscopeDetails.birthPlace) userProfile.birthPlace = birthPlace;
    if (birthTime !== initialUserData.horoscopeDetails.birthTime) userProfile.birthTime = birthTime;

    if (Object.keys(userProfile).length === 0) {
      ToastAndroid.showWithGravityAndOffset('No changes to save.', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      return;
    }

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        },
        body: JSON.stringify(userProfile),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log('result', result);
        ToastAndroid.showWithGravityAndOffset(result.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      } else {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          parsedUser.user = { ...parsedUser.user, ...userProfile };
          await AsyncStorage.setItem('theUser', JSON.stringify(parsedUser));
        }
        console.log('user data:', userData);
        ToastAndroid.showWithGravityAndOffset('Profile Updated Successfully', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset('Failed to update profile', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FE4101']}
        tintColor="#FE4101"/>
      }
    >
      {isLoading && <ActivityIndicator size="large" color="orange" />}
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Image source={require('../../../src/assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Religion</Text>
      </View>
      <Text style={styles.stepText}>Religion</Text>
      <Dropdown
        style={styles.dropdown}
        data={religio}
        labelField="label"
        valueField="value"
        placeholder={religion || 'Select Religion'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={religion}
        onChange={item => setReligion(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Caste</Text>
      <Dropdown
        style={styles.dropdown}
        data={castes}
        labelField="label"
        valueField="value"
        placeholder={caste || 'Select Caste'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={caste}
        onChange={item => setCaste(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Mother Tongue</Text>
      <Dropdown
        style={styles.dropdown}
        data={tongue}
        labelField="label"
        valueField="value"
        placeholder={motherTongue || 'Select Mother Tongue'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={motherTongue}
        onChange={item => setMotherTongue(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Manglik</Text>
      <Dropdown
        style={styles.dropdown}
        data={maglik}
        labelField="label"
        valueField="value"
        placeholder={manglik || 'Select Manglik'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={manglik}
        onChange={item => setManglik(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Star</Text>
      <Dropdown
        style={styles.dropdown}
        data={staroption}
        labelField="label"
        valueField="value"
        placeholder={star || 'Select Star'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={star}
        onChange={item => setStar(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Dosh</Text>
      <Dropdown
        style={styles.dropdown}
        data={doshoption}
        labelField="label"
        valueField="value"
        placeholder={dosh || 'Select Dosh'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={dosh}
        onChange={item => setDosh(item.value)}
        itemTextStyle={{ color: 'black' }}
        dropdownPosition='top'
      />
      <Text style={styles.stepText}>Birth Place</Text>
      <Dropdown
        style={styles.dropdown}
        data={location}
        labelField="label"
        valueField="value"
        placeholder={birthPlace || 'Select Birth Place'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={birthPlace}
        onChange={item => setBirthPlace(item.value)}
        itemTextStyle={{ color: 'black' }}
        dropdownPosition='top'
      />
      <Text style={styles.stepText}>Birth Time</Text>
      <Dropdown
        style={styles.dropdown}
        data={birth}
        labelField="label"
        valueField="value"
        placeholder={birthTime || 'Select Birth Time'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={birthTime}
        onChange={item => setBirthTime(item.value)}
        itemTextStyle={{ color: 'black' }}
        dropdownPosition='top'
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveText}>
          {isLoading ? 'Loading..' : 'Save'}
        </Text>
      </TouchableOpacity>
      <View height={30}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    // marginBottom: 10,
    color: '#333',
  },
  dropdown: {
    marginVertical: 10,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  textInput: {
    marginBottom: 10,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    height: 56,
    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,

  },
  heading: {
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: 'DM Sans',
    fontSize: 21,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    textTransform: 'capitalize',
    width: '85%',
  },
  back: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default ReligionPage;