import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfileStep2 = () => {
  const [highestDegree, setHighestDegree] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [employment, setEmployment] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [workLocation, setWorkLocation] = useState(null);

  const data = [
    {label: 'Select', value: null},
    {label: 'Option 1', value: '1'},
    {label: 'Option 2', value: '2'},
    {label: 'Option 3', value: '3'},
  ];

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          const user = parsedData.user; 
          setHighestDegree(user.highestDegree);
          setOccupation(user.occupation);
          setEmployment(user.employment);
          setAnnualIncome(user.annualIncome);
          setWorkLocation(user.workLocation);
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchUserData();
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.stepContainer}>
        <Text style={styles.stepText2}>Step 2</Text>
        <Text style={styles.stepText}>HighestDegree</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
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
          itemTextStyle={{color: 'gray'}}
        />
        <Text style={styles.stepText}>Occupation</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
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
          itemTextStyle={{color: 'gray'}}
          searchTextInputStyle={{color: 'black'}} // Set the search text color
          onChange={item => setOccupation(item.value)}
        />
        <Text style={styles.stepText}>Employment</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
          labelField="label"
          valueField="value"
          placeholder={employment}
          placeholderStyle={{color: 'gray'}}
          search={true}
          searchPlaceholder="Search"
          searchPlaceholderTextColor="gray"
          inputSearchStyle={styles.inputSearchStyle}
          selectedTextStyle={styles.selectedTextStyle}
          value={employment}
          onChange={item => setEmployment(item.value)}
          itemTextStyle={{color: 'gray'}}
        />
        <Text style={styles.stepText}>AnnualIncome</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
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
          itemTextStyle={{color: 'gray'}}
        />
        <Text style={styles.stepText}>Work Location</Text>
        <Dropdown
          style={styles.dropdown}
          data={data}
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
          itemTextStyle={{color: 'gray'}}
          // dropdownPosition="top"
        />
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </View>
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
    marginBottom: 10,
    color: '#333',
  },
  dropdown: {
    marginBottom: 20,
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    // backgroundColor: '#f7f7f7',
  },
  saveButton: {
    backgroundColor: '#ff7f3f',
    paddingVertical: 15,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
  },
  stepText2: {
    fontSize: 20,
    marginBottom: 30,
    color: '#333',
    marginTop: 20,
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
});

export default UserProfileStep2;