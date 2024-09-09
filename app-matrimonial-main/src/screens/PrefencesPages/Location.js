import React, { useState,useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';



const LocationPage = () => {
  const [country, setCountry] = useState(null);
  const [state, setState] = useState(null);
  const [city, setCity] = useState(null);

  const handleSave = () => {
    console.log('Preferences saved');
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
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchData();
  }, []);


  return (
    <View style={styles.container}>
      <Text style={styles.headerText}>Country</Text>
      <Dropdown
        style={styles.dropdown}
        data={countryData}
        labelField="label"
        valueField="value"
        placeholder={country || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={country}
        onChange={item => setCountry(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.headerText}>State</Text>
      <Dropdown
        style={styles.dropdown}
        data={stateData}
        labelField="label"
        valueField="value"
        placeholder={state || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={state}
        onChange={item => setState(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.headerText}>City</Text>
      <Dropdown
        style={styles.dropdown}
        data={cityData}
        labelField="label"
        valueField="value"
        placeholder={city || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={city}
        onChange={item => setCity(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
    </View>
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
    height: 50,
    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 8,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    fontSize: 14,
    color: '#000',
  },
});

export default LocationPage;