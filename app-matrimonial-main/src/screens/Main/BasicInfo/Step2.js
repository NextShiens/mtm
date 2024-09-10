import React, {useState, useEffect} from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { QualificationList, occupationList, workLocationList} from '../../../data/appData';


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
          itemTextStyle={{color: 'gray'}}
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
          itemTextStyle={{color: 'black'}}
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