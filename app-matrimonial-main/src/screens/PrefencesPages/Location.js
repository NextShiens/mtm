import React, { useState, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Text, ToastAndroid, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';
import { useNavigation } from '@react-navigation/native';
import { workLocationList } from '../../data/appData';

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

  const stateOptions = [
    'Andhra Pradesh', 'Arunachal Pradesh', 'Assam', 'Bihar', 'Chhattisgarh', 'Goa', 'Gujarat', 'Haryana', 'Himachal Pradesh', 'Jharkhand', 'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur', 'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana', 'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal', 'Andaman and Nicobar Islands', 'Chandigarh', 'Dadra and Nagar Haveli and Daman and Diu', 'Delhi', 'Lakshadweep', 'Puducherry'
  ];

  const indianstate = stateOptions.map(state => ({
    label: state,
    value: state
  }));

  const fetchData = async () => {
    try {
      setIsLoading(true);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
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
    backgroundColor: '#fff',
    padding: 16,
  },
  dropdown: {
    height: 60,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
    marginBottom: 16,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: 'gray',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  saveButton: {
    height: 60,
    backgroundColor: 'rgba(249, 123, 34, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 43,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    fontSize: 14,
    color: '#000',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    width: '85%',
    fontWeight: '700',
  },
});

export default LocationPage;