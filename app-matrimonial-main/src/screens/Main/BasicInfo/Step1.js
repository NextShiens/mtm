import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

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

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

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
          setCast(user.caste);
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
      await AsyncStorage.setItem('userProfile', JSON.stringify(userProfile));
      console.log('Saved');
    } catch (error) {
      console.error('Failed to save user data', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Basic Info</Text>
      <Text style={styles.stepText}>Step 1</Text>
      <Text style={styles.stepText}>Age</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Gender</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Height</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{color: 'gray'}}
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
        data={data}
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
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Religion</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Mother Tongue</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Cast</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>City</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={city}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={city}
        onChange={(item) => setCity(item.value)}
        itemTextStyle={{color: 'gray'}}
      />

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
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