import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';
import { Toast } from '../../../utils/native';
import {occupationList,indianCastes, workLocationList } from '../../../data/appData';


const UserProfileStep1 = () => {
  const [age, setAge] = useState(null);
  const [gender, setGender] = useState(null);
  const [height, setHeight] = useState(null);
  const [dob, setDob] = useState('');
  const [maritalStatus, setMaritalStatus] = useState(null);
  const [religion, setReligion] = useState(null);
  const [motherTongue, setMotherTongue] = useState(null);
  const [cast, setCast] = useState(null);
  const [city, setCity] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
    {label: '16' , value: '16'},
  ];
  
  const genderOptions = [
    { label: 'Male', value: 'male' },
    { label: 'Female', value: 'Female' },
  ];

  const heights = [
    '4 feet 0 inches', '4 feet 1 inch', '4 feet 2 inches', '4 feet 3 inches', '4 feet 4 inches', '4 feet 5 inches',
    '4 feet 6 inches', '4 feet 7 inches', '4 feet 8 inches', '4 feet 9 inches', '4 feet 10 inches', '4 feet 11 inches',
    '5 feet 0 inches', '5 feet 1 inch', '5 feet 2 inches', '5 feet 3 inches', '5 feet 4 inches', '5 feet 5 inches',
    '5 feet 6 inches', '5 feet 7 inches', '5 feet 8 inches', '5 feet 9 inches', '5 feet 10 inches', '5 feet 11 inches',
    '6 feet 0 inches', '6 feet 1 inch', '6 feet 2 inches', '6 feet 3 inches', '6 feet 4 inches', '6 feet 5 inches',
    '6 feet 6 inches', '6 feet 7 inches', '6 feet 8 inches', '6 feet 9 inches', '6 feet 10 inches', '6 feet 11 inches',
    '7 feet 0 inches'
];

const heightData = heights.map(height => ({
    label: height,
    value: height
}));

const statuses = ['Single', 'Divorced', 'Married', 'Widowed'];

const statusData = statuses.map(status => ({
    label: status,
    value: status
}));


const languages = [
  'Assamese', 'Bengali', 'Bhojpuri', 'Bodo', 'Dogri', 'English', 'Gujarati', 'Hindi', 'Kannada', 'Kashmiri',
  'Konkani', 'Maithili', 'Malayalam', 'Manipuri', 'Marathi', 'Nepali', 'Odia', 'Punjabi', 'Rajasthani', 'Sanskrit',
  'Santali', 'Sindhi', 'Tamil', 'Telugu', 'Tulu', 'Urdu'
];

const MotherTongues = languages.map(language => ({
  label: language,
  value: language
}));

const ageOptions = ["18", "19", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "60"];

const ageData = ageOptions.map(age => ({
  label: age,
  value: age
}));

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

const religionData = religionsInIndia.map(religion => ({
  label: religion,
  value: religion
})); 

const casteData = indianCastes.map(caste => ({
  label: caste,
  value: caste
}));

const cities = workLocationList.map(city => ({
  label: city,
  value: city
}));

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          const user = parsedData.user; 
          setAge(user.age);
          setGender(user.gender);
          setHeight(user.height);
          setDob(user.dateOfBirth);
          setMaritalStatus(user.maritalStatus);
          setReligion(user.religion);
          setMotherTongue(user.motherTongue);
          setCast(user.horoscopeDetails.caste);
          setCity(user.city);
        }
        console.log('User data:', userData);
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const userProfile = {
      age,
      gender,
      height,
      dob,
      maritalStatus,
      religion,
      motherTongue,
      cast,
      city,
    };

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
        // Update user data in AsyncStorage
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          parsedUser.user = { ...parsedUser.user, ...userProfile };
          await AsyncStorage.setItem('theUser', JSON.stringify(parsedUser));
        }
        console.log('user data:', userData);
        Toast('Profile Updated Successfully');
      }
    } catch (error) {
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Basic Info</Text>
      <Text style={styles.stepText}>Step 1</Text>
      <Text style={styles.stepText}>Age</Text>
      <Dropdown
        style={styles.dropdown}
        data={ageData}
        labelField="label"
        valueField="value"
        placeholder={age}
        placeholderStyle={{color: 'gray'}}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={age}
        onChange={(item) => setAge(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>Gender</Text>
      <Dropdown
        style={styles.dropdown}
        data={genderOptions}
        labelField="label"
        valueField="value"
        placeholder={gender}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={gender}
        onChange={(item) => setGender(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>Height</Text>
      <Dropdown
        style={styles.dropdown}
        data={heightData}
        labelField="label"
        valueField="value"
        placeholder={height}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={height}
        onChange={(item) => setHeight(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>Date Of Birth</Text>
      <TextInput
        style={[styles.textInput, { color: '#333' }]} // Added color to the text
        placeholder="DD/MM/YY"
        placeholderTextColor='gray'
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={dob}
        onChangeText={setDob}
      />
      <Text style={styles.stepText}>Marital Status</Text>
      <Dropdown
        style={styles.dropdown}
        data={statusData}
        labelField="label"
        valueField="value"
        placeholder={maritalStatus}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={maritalStatus}
        onChange={(item) => setMaritalStatus(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>Religion</Text>
      <Dropdown
        style={styles.dropdown}
        data={religionData}
        labelField="label"
        valueField="value"
        placeholder={religion}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={religion}
        onChange={(item) => setReligion(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>Mother Tongue</Text>
      <Dropdown
        style={styles.dropdown}
        data={MotherTongues}
        labelField="label"
        valueField="value"
        placeholder={motherTongue}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={motherTongue}
        onChange={(item) => setMotherTongue(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>Cast</Text>
      <Dropdown
        style={styles.dropdown}
        data={casteData}
        labelField="label"
        valueField="value"
        placeholder={cast}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={cast}
        onChange={(item) => setCast(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.stepText}>City</Text>
      <Dropdown
        style={styles.dropdown}
        data={cities}
        labelField="label"
        valueField="value"
        placeholder={city}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'black'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={city}
        onChange={(item) => setCity(item.value)}
        itemTextStyle={{color: 'black'}}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveText}>Save</Text>
      </TouchableOpacity>
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
    marginBottom: 10,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  textInput: {
    marginBottom: 10,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
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
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
});

export default UserProfileStep1;