import React, { useState, useEffect } from 'react';

import { View, StyleSheet, TouchableOpacity, Image, Text, ToastAndroid, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';
import { useNavigation } from '@react-navigation/native';

import { indianCastes, QualificationList, occupationList, workLocationList, indianMotherTongues } from '../../data/appData';



const LocationPage = () => {
  const navigation = useNavigation();
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);
  const [initialUserData, setInitialUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const countries = ['india'];
  const countrie = countries.map(country => ({
    label: country,
    value: country
  }));

  const cities = workLocationList.map(city => ({
    label: city,
    value: city
  }));

  const handleSave = async () => {
    const userProfile = {};

    if (country !== initialUserData.FamilyDetails.country) userProfile.country = country;
    if (state !== initialUserData.FamilyDetails.state) userProfile.state = state;
    if (city !== initialUserData.FamilyDetails.city) userProfile.city = city;
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

  const countryData = [
    { label: 'USA', value: 'usa' },
    { label: 'Canada', value: 'canada' },
    { label: 'United Kingdom', value: 'uk' },
  ];

  const stateData = [
    { label: 'California', value: 'california' },
    { label: 'New York', value: 'new-york' },
    { label: 'Texas', value: 'texas' },
  ];

  const cityData = [
    { label: 'San Francisco', value: 'san-francisco' },
    { label: 'New York City', value: 'new-york-city' },
    { label: 'Houston', value: 'houston' },
  ];

  
  const stateOptions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'

  ];

  const indianstate = stateOptions.map(state => ({
    label: state,
    value: state
  }));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        console.log('userData', userData);
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          const user = parsedData.user;
          setCountry(user.FamilyDetails.country);
          setState(user.FamilyDetails.state);
          setCity(user.FamilyDetails.city);
          setInitialUserData(user);
        }
      } catch (error) {
        console.error('Failed to load user data', error);
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

  const onRefresh = () => {
    setRefreshing(true);
    fetchData();
  };

  return (
    <ScrollView
      style={styles.container}
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} colors={['#FE4101']}
        tintColor="#FE4101" />
      }
    >
      {isLoading && <ActivityIndicator size="large" color="#0000ff" />}
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>

          <Image source={require('../../../src/assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Location</Text>
      </View>
      <Text style={styles.headerText}>Country</Text>
      <Dropdown
        style={styles.dropdown}
        data={countrie}
        labelField="label"
        valueField="value"
        placeholder={country || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={country}
        onChange={item => setCountry(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.headerText}>State</Text>
      <Dropdown
        style={styles.dropdown}
        data={indianstate}
        labelField="label"
        valueField="value"
        placeholder={state || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={state}
        onChange={item => setState(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <Text style={styles.headerText}>City</Text>
      <Dropdown
        style={styles.dropdown}
        data={cities}
        labelField="label"
        valueField="value"
        placeholder={city || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{ color: 'gray' }}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={city}
        onChange={item => setCity(item.value)}
        itemTextStyle={{ color: 'black' }}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveText}>
          {isLoading ? 'Loading..' : 'Save'}
        </Text>
      </TouchableOpacity>
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
    // marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    // marginBottom: 10,
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


export default LocationPage;