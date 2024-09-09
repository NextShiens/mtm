import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Button, Text, ScrollView, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const ReligionPage = () => {
  const [religion, setReligion] = useState(null);
  const [caste, setCaste] = useState(null);
  const [motherTongue, setMotherTongue] = useState(null);
  const [manglik, setManglik] = useState(null);
  const [star, setStar] = useState(null);
  const [dosh, setDosh] = useState(null);
  const [birthPlace, setBirthPlace] = useState(null);
  const [birthTime, setBirthTime] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
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
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchData();
  }, []);

  const handleSave = () => {
    // Handle save logic here
    console.log({
      religion,
      caste,
      motherTongue,
      manglik,
      star,
      dosh,
      birthPlace,
      birthTime,
    });
  };

  const data = [
    { label: 'Option 1', value: '1' },
    { label: 'Option 2', value: '2' },
    { label: 'Option 3', value: '3' },
  ];

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.stepText}>Religion</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Caste</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Mother Tongue</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Manglik</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Star</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Dosh</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Birth Place</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
      />
      <Text style={styles.stepText}>Birth Time</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
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
        itemTextStyle={{ color: 'gray' }}
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
    borderWidth: 0.5,
    borderRadius: 15,
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

export default ReligionPage;