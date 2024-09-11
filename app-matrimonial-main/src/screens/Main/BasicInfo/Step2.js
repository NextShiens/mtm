import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity, ToastAndroid, Image, ScrollView, TextInput, ActivityIndicator, RefreshControl} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../../constant';
import { QualificationList, occupationList, workLocationList} from '../../../data/appData';
import { useNavigation } from '@react-navigation/native';

const UserProfileStep2 = () => {
  const navigation = useNavigation();
  const [highestDegree, setHighestDegree] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [employedIn, setEmployment] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);
  const [initialUserData, setInitialUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const data = [
    {label: 'Select', value: null},
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  const degrees = QualificationList.map(degree => ({
    label: degree,
    value: degree
  }));

  const occupationOptions = occupationList.map(occupation => ({
    label: occupation,
    value: occupation
  }));

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

  const incomeOptions = annualIncomeList.map(income => ({
    label: income,
    value: income
  }));

  const cities = workLocationList.map(city => ({
    label: city,
    value: city
  }));

  const handleSave = async () => {
    const userProfile = {};

    // Compare each field with the initial data, and only add changed fields
    if (highestDegree !== initialUserData.highestDegree) userProfile.highestDegree = highestDegree;
    if (occupation !== initialUserData.occupation) userProfile.occupation = occupation;
    if (employedIn !== initialUserData.employedIn) userProfile.employedIn = employedIn;
    if (workLocation !== initialUserData.workLocation) userProfile.workLocation = workLocation;
    if (annualIncome !== initialUserData.annualIncome) userProfile.annualIncome = annualIncome;
    if (Object.keys(userProfile).length === 0) {
      Toast("No changes to save.");
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
        Toast(result.message);
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

  const fetchUserData = async () => {
    try {
      const userData = await AsyncStorage.getItem('theUser');
      console.log('userData', userData);
      if (userData !== null) {
        const parsedData = JSON.parse(userData);
        const user = parsedData.user; 
        setHighestDegree(user.highestDegree);
        setOccupation(user.occupation);
        setEmployment(user.employedIn);
        setAnnualIncome(user.annualIncome);
        setWorkLocation(user.workLocation);
        setInitialUserData(user);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
    }
  };

  useEffect(() => {
    fetchUserData();
  }, []);

  const onRefresh = async () => {
    setRefreshing(true);
    await fetchUserData();
    setRefreshing(false);
  };

  return (

    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FE4101']}
        tintColor="#FE4101" />
      }
    >
      {isLoading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      )}
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Account</Text>
      </View>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText2}>Step 2</Text>
        <Text style={styles.stepText}>HighestDegree</Text>
        <Dropdown
          style={styles.dropdown}
          data={degrees}
          labelField="label"
          valueField="value"
          placeholder={highestDegree}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={highestDegree}
          onChange={item => setHighestDegree(item.value)}
          itemTextStyle={{color: 'black'}}
        />
        <Text style={styles.stepText}>Occupation</Text>
        <Dropdown
          style={styles.dropdown}
          data={occupationOptions}
          labelField="label"
          valueField="value"
          placeholder={occupation}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          placeholderStyle={{color: 'gray'}}
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={occupation}
          itemTextStyle={{color: 'black'}}
          searchTextInputStyle={{color: 'black'}} 
          onChange={item => setOccupation(item.value)}
        />
        <Text style={styles.stepText}>Employment</Text>
        <TextInput
          style={[styles.dropdown, { color: 'black' }]}
          placeholder={employedIn}
          placeholderTextColor="gray"
          onChangeText={text => setEmployment(text)}
          value={employedIn}
        />
        <Text style={styles.stepText}>AnnualIncome</Text>
        <Dropdown
          style={styles.dropdown}
          data={incomeOptions}
          labelField="label"
          valueField="value"
          placeholder={annualIncome}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={annualIncome}
          onChange={item => setAnnualIncome(item.value)}
          itemTextStyle={{color: 'black'}}
           dropdownPosition="top"
        />
        <Text style={styles.stepText}>Work Location</Text>
        <Dropdown
          style={styles.dropdown}
          data={cities}
          labelField="label"
          valueField="value"
          placeholder={workLocation}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={workLocation}
          onChange={item => setWorkLocation(item.value)}
          itemTextStyle={{color: 'black'}}
          dropdownPosition="top"

        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveButtonText}>
          {isLoading ? 'Loading...' : 'Save'}
        </Text>
      </TouchableOpacity>
      <View height={30}></View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 20,
  },
  stepContainer: {
    marginTop: 20,
  },
  stepText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#333',
  },
  dropdown: {

    marginVertical: 10,
    height: 56,
    borderColor: '#E5E5E5',

    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    height: 60,
    backgroundColor: 'rgba(249, 123, 34, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 43,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  stepText2: {
    color: '#1A1A1A',
    fontSize: 16,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    textTransform: 'capitalize',
    marginVertical: 10,
    marginBottom: 14,

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
    marginTop: 35,
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

export default UserProfileStep2;