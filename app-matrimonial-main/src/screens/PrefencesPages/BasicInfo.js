import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';


const BasicInfo = () => {
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

  const data = [
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
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
        }
      } catch (error) {
        console.error('Failed to fetch user data', error);
      }
    };

    fetchUserData();
  }, []);

  const handleSave = async () => {
    const userProfile = {
      ageFrom,
      ageTo,
      heightFrom,
      heightTo,
      lookingFor,
      physicalStatus,
      food,
      smoking,
      drinking,
      familyType,
      familyStatus,
      familyValue,
      fathersOccupation,
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
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: result.message,
        });
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
      Toast.show({
        type: 'error',
        text1: 'Error',
        text2: 'An error occurred while updating the profile',
      });
    } finally {
      setIsLoading(false);
    }
  };


  return (
    <ScrollView style={styles.container}>
      <Text style={styles.header}>Basic Info</Text>
      <Text style={styles.stepText}>Age</Text>
      <View style={styles.row}>
        <Dropdown
          style={[styles.dropdown, {width: '40%'}]}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={ageFrom}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={ageFrom}
          onChange={item => setAgeFrom(item.value)}
          itemTextStyle={{color: 'gray'}}
        />
        <Text style={styles.centerText}>To</Text>
        <Dropdown
          style={[styles.dropdown, {width: '40%'}]}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={ageTo}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={ageTo}
          onChange={item => setAgeTo(item.value)}
          itemTextStyle={{color: 'gray'}}
        />
      </View>
      <Text style={styles.stepText}>Height</Text>
      <View style={styles.row}>
        <Dropdown
          style={[styles.dropdown, {width: '40%'}]}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={heightFrom}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={heightFrom}
          onChange={item => setHeightFrom(item.value)}
          itemTextStyle={{color: 'gray'}}
        />
        <Text style={styles.centerText}>To</Text>
        <Dropdown
          style={[styles.dropdown, {width: '40%'}]}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={heightTo}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={heightTo}
          onChange={item => setHeightTo(item.value)}
          itemTextStyle={{color: 'gray'}}
        />
      </View>
      <Text style={styles.stepText}>Looking For</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={lookingFor}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={lookingFor}
        onChange={item => setLookingFor(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Physical Status</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={physicalStatus}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={physicalStatus}
        onChange={item => setPhysicalStatus(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Food</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={food}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={food}
        onChange={item => setFood(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Smoking</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={smoking}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        valur={smoking}
        onChange={item => setSmoking(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Drinking</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={drinking}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={drinking}
        onChange={item => setDrinking(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Family Type</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={familyType}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={familyType}
        onChange={item => setFamilyType(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Family Status</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={familyStatus}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={familyStatus}
        onChange={item => setFamilyStatus(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Family Value</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={familyValue}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={familyValue}
        onChange={item => setFamilyValue(item.value)}
        itemTextStyle={{color: 'gray'}}
      />
      <Text style={styles.stepText}>Father Occupation</Text>
      <Dropdown
        style={styles.dropdown}
        data={data}
        labelField="label"
        valueField="value"
        placeholder={fathersOccupation}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={fathersOccupation}
        onChange={item => setFatherOccupation(item.value)}
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

export default BasicInfo;