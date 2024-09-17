import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  ToastAndroid,
  Image,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';
import { useNavigation } from '@react-navigation/native';
import {
  QualificationList,
  occupationList,
  workLocationList,
} from '../../data/appData';

const BasicInfo = () => {
  const navigation = useNavigation();
  const [ageFrom, setAgeFrom] = useState(null);
  const [ageTo, setAgeTo] = useState(null);
  const [heightFrom, setHeightFrom] = useState(null);
  const [heightTo, setHeightTo] = useState(null);
  const [lookingFor, setLookingFor] = useState(null);
  const [physicalStatus, setPhysicalStatus] = useState(null);
  const [food, setFood] = useState(null);
  const [smoking, setSmoking] = useState(null);
  const [drinking, setDrinking] = useState(null);
  const [familyType, setFamilyType] = useState(null);
  const [familyStatus, setFamilyStatus] = useState(null);
  const [familyValue, setFamilyValue] = useState(null);
  const [fathersOccupation, setFatherOccupation] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [initialUserData, setInitialUserData] = useState({});
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  const ageOptions = [
    '18', '19', '20', '21', '22', '23', '24', '25', '26', '27', '28', '29', '30',
    '31', '32', '33', '34', '35', '36', '37', '38', '39', '40', '41', '42', '43',
    '44', '45', '46', '47', '48', '49', '50', '51', '52', '53', '54', '55', '56',
    '57', '58', '59', '60',
  ];

  const ageData = ageOptions.map(age => ({
    label: age,
    value: age,
  }));

  const heights = [
    '4 feet 0 inches', '4 feet 1 inch', '4 feet 2 inches', '4 feet 3 inches',
    '4 feet 4 inches', '4 feet 5 inches', '4 feet 6 inches', '4 feet 7 inches',
    '4 feet 8 inches', '4 feet 9 inches', '4 feet 10 inches', '4 feet 11 inches',
    '5 feet 0 inches', '5 feet 1 inch', '5 feet 2 inches', '5 feet 3 inches',
    '5 feet 4 inches', '5 feet 5 inches', '5 feet 6 inches', '5 feet 7 inches',
    '5 feet 8 inches', '5 feet 9 inches', '5 feet 10 inches', '5 feet 11 inches',
    '6 feet 0 inches', '6 feet 1 inch', '6 feet 2 inches', '6 feet 3 inches',
    '6 feet 4 inches', '6 feet 5 inches', '6 feet 6 inches', '6 feet 7 inches',
    '6 feet 8 inches', '6 feet 9 inches', '6 feet 10 inches', '6 feet 11 inches',
    '7 feet 0 inches',
  ];

  const heightData = heights.map(height => ({
    label: height,
    value: height,
  }));

  const lookingForOptions = ['Friendship', 'Marriage', 'Dating'];
  const lookingfor = lookingForOptions.map(looking => ({
    label: looking,
    value: looking,
  }));

  const physicalStatusOptions = ['Normal', 'Physically Challenged'];
  const physicalStatusData = physicalStatusOptions.map(status => ({
    label: status,
    value: status,
  }));

  const foodOptions = ['Vegetarian', 'Non-Vegetarian', 'Eggetarian'];
  const optionfood = foodOptions.map(food => ({
    label: food,
    value: food,
  }));

  const smokingOptions = ['Yes', 'Occasionally Smoke', 'No'];
  const smoke = smokingOptions.map(smoke => ({
    label: smoke,
    value: smoke,
  }));

  const drinkingOptions = ['Yes', 'No', 'Drinks Socialy'];
  const drink = drinkingOptions.map(drink => ({
    label: drink,
    value: drink,
  }));

  const familyTypeOptions = ['Joint', 'Nuclear'];
  const familyTypeData = familyTypeOptions.map(family => ({
    label: family,
    value: family,
  }));

  const familyStatusOptions = [
    'Rich',
    'Upper Middle Class',
    'Middle Class',
    'Affluent',
  ];
  const familyStatusData = familyStatusOptions.map(status => ({
    label: status,
    value: status,
  }));

  const familyValueOptions = ['Orthodox', 'Traditional', 'Moderate', 'Liberal'];
  const familyValueData = familyValueOptions.map(value => ({
    label: value,
    value: value,
  }));

  const occupation = occupationList.map(occupation => ({
    label: occupation,
    value: occupation,
  }));

  const fetchUserData = async () => {
    try {
      setIsLoading(true);
      const userData = await AsyncStorage.getItem('theUser');
      console.log('userData', userData);
      if (userData !== null) {
        const parsedData = JSON.parse(userData);
        const user = parsedData.user;
        setAgeFrom(user.ageFrom);
        setAgeTo(user.ageTo);
        setHeightFrom(user.heightFrom);
        setHeightTo(user.heightTo);
        setLookingFor(user.lookingFor);
        setPhysicalStatus(user.physicalStatus);
        setFood(user.food);
        setSmoking(user.smoking);
        setDrinking(user.drinking);
        setFamilyType(user.familyType);
        setFamilyStatus(user.familyStatus);
        setFamilyValue(user.familyValue);
        setFatherOccupation(user.fathersOccupation);
        setInitialUserData(user);
      }
    } catch (error) {
      console.error('Failed to fetch user data', error);
      ToastAndroid.showWithGravityAndOffset(
        'Failed to load user data',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    fetchUserData().then(() => setRefreshing(false));
  }, []);

  const handleSave = async () => {
    const userProfile = {};

    if (ageFrom !== initialUserData.ageFrom) userProfile.ageFrom = ageFrom;
    if (ageTo !== initialUserData.ageTo) userProfile.ageTo = ageTo;
    if (heightFrom !== initialUserData.heightFrom) userProfile.heightFrom = heightFrom;
    if (heightTo !== initialUserData.heightTo) userProfile.heightTo = heightTo;
    if (lookingFor !== initialUserData.lookingFor) userProfile.lookingFor = lookingFor;
    if (physicalStatus !== initialUserData.physicalStatus) userProfile.physicalStatus = physicalStatus;
    if (food !== initialUserData.food) userProfile.food = food;
    if (smoking !== initialUserData.smoking) userProfile.smoking = smoking;
    if (drinking !== initialUserData.drinking) userProfile.drinking = drinking;
    if (familyType !== initialUserData.familyType) userProfile.familyType = familyType;
    if (familyStatus !== initialUserData.familyStatus) userProfile.familyStatus = familyStatus;
    if (familyValue !== initialUserData.familyValue) userProfile.familyValue = familyValue;
    if (fathersOccupation !== initialUserData.fathersOccupation) userProfile.fathersOccupation = fathersOccupation;

    if (Object.keys(userProfile).length === 0) {
      ToastAndroid.showWithGravityAndOffset(
        'No changes to save.',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      return;
    }

    try {
      setIsLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/updateProfile`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(userProfile),
      });

      const result = await response.json();
      if (!response.ok) {
        console.log('result', result);
        ToastAndroid.showWithGravityAndOffset(
          result.message,
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      } else {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          parsedUser.user = { ...parsedUser.user, ...userProfile };
          await AsyncStorage.setItem('theUser', JSON.stringify(parsedUser));
        }
        console.log('user data:', userData);
        ToastAndroid.showWithGravityAndOffset(
          'Profile Updated Successfully',
          ToastAndroid.LONG,
          ToastAndroid.BOTTOM,
          25,
          50,
        );
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset(
        'Failed to update profile',
        ToastAndroid.LONG,
        ToastAndroid.BOTTOM,
        25,
        50,
      );
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="rgba(249, 123, 34, 1)" />
      </View>
    );
  }

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FE4101']}
          tintColor="#FE4101" />
      }>
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Image source={require('../../../src/assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>BasicInfo</Text>
      </View>
      <Text style={styles.stepText}>Age</Text>
      <View style={styles.row}>
        <Dropdown
          style={[styles.dropdown, { width: '40%' }]}
          data={ageData}
          labelField="label"
          valueField="value"
          placeholder={ageFrom}
          placeholderStyle={{ color: 'black' }}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={ageFrom}
          onChange={item => setAgeFrom(item.value)}
          itemTextStyle={{ color: 'black' }}
        />
        <Text style={styles.centerText}>To</Text>
        <Dropdown
          style={[styles.dropdown, { width: '40%' }]}
          data={ageData}
          labelField="label"
          valueField="value"
          placeholder={ageTo}
          placeholderStyle={{ color: 'black' }}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={ageTo}
          onChange={item => setAgeTo(item.value)}
          itemTextStyle={{ color: 'black' }}
        />
      </View>
      <Text style={styles.stepText}>Height</Text>
      <View style={styles.row}>
        <Dropdown
          style={[styles.dropdown, { width: '40%' }]}
          data={heightData}
          labelField="label"
          valueField="value"
          placeholder={heightFrom}
          placeholderStyle={{ color: 'gray' }}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={heightFrom}
          onChange={item => setHeightFrom(item.value)}
          itemTextStyle={{ color: 'black' }}
        />
        <Text style={styles.centerText}>To</Text>
        <Dropdown
          style={[styles.dropdown, { width: '40%' }]}
          data={heightData}
          labelField="label"
          valueField="value"
          placeholder={heightTo}
          placeholderStyle={{ color: 'gray' }}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={heightTo}
          onChange={item => setHeightTo(item.value)}
          itemTextStyle={{ color: 'black' }}
        />
      </View>
      <Text style={styles.stepText}>Looking For</Text>
      <Dropdown
        style={styles.dropdown}
        data={lookingfor}
        labelField="label"
        valueField="value"
        placeholder={lookingFor}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={lookingFor}
        onChange={item => setLookingFor(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Physical Status</Text>
      <Dropdown
        style={styles.dropdown}
        data={physicalStatusData}
        labelField="label"
        valueField="value"
        placeholder={physicalStatus}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={physicalStatus}
        onChange={item => setPhysicalStatus(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Food</Text>
      <Dropdown
        style={styles.dropdown}
        data={optionfood}
        labelField="label"
        valueField="value"
        placeholder={food}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={food}
        onChange={item => setFood(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Smoking</Text>
      <Dropdown
        style={styles.dropdown}
        data={smoke}
        labelField="label"
        valueField="value"
        placeholder={smoking}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={smoking}
        onChange={item => setSmoking(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Drinking</Text>
      <Dropdown
        style={styles.dropdown}
        data={drink}
        labelField="label"
        valueField="value"
        placeholder={drinking}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={drinking}
        onChange={item => setDrinking(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Family Type</Text>
      <Dropdown
        style={styles.dropdown}
        data={familyTypeData}
        labelField="label"
        valueField="value"
        placeholder={familyType}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={familyType}
        onChange={item => setFamilyType(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.stepText}>Family Status</Text>
      <Dropdown
        style={styles.dropdown}
        data={familyStatusData}
        labelField="label"
        valueField="value"
        placeholder={familyStatus}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={familyStatus}
        onChange={item => setFamilyStatus(item.value)}
        itemTextStyle={{ color: 'black' }}
        dropdownPosition='top'
      />
      <Text style={styles.stepText}>Family Value</Text>
      <Dropdown
        style={styles.dropdown}
        data={familyValueData}
        labelField="label"
        valueField="value"
        placeholder={familyValue}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={familyValue}
        onChange={item => setFamilyValue(item.value)}
        itemTextStyle={{ color: 'black' }}
        dropdownPosition='top'
      />
      <Text style={styles.stepText}>Father Occupation</Text>
      <Dropdown
        style={styles.dropdown}
        data={occupation}
        labelField="label"
        valueField="value"
        placeholder={fathersOccupation}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={fathersOccupation}
        onChange={item => setFatherOccupation(item.value)}
        itemTextStyle={{ color: 'black' }}
        dropdownPosition='top'
      />
      <TouchableOpacity
        style={styles.saveButton}
        onPress={handleSave}
        disabled={isLoading}>
        <Text style={styles.saveText}>{isLoading ? 'Saving...' : 'Save'}</Text>
      </TouchableOpacity>
      <View height={30}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  stepText: {
    fontSize: 16,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
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
    backgroundColor: 'rgba(249, 123, 34, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 43.5,
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
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default BasicInfo;