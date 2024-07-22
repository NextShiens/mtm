import React, { useState } from 'react';
import { View, Text, TextInput, StyleSheet, ScrollView } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { COLORS} from '../../../assets/theme';
import Space from '../../../components/Space/Space';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { SVG } from '../../../assets/svg';
import { Toast } from '../../../utils/native'; 



const FamilyDetailsScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [numOfBrothers, setNumOfBrothers] = useState('');
  const [numOfMarriedBrothers, setNumOfMarriedBrothers] = useState('');
  const [numOfSisters, setNumOfSisters] = useState('');
  const [numOfMarriedSisters, setNumOfMarriedSisters] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const previousProfileData = route.params?.profileData || {};
  console.log('previousProfileData', previousProfileData);

  const demoData = {
    numOfBrothersOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    numOfSistersOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    numOfMarriedBrothersOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    numOfMarriedSistersOptions: ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
    countryOptions: ['India'],
    stateOptions: [
      'Andhra Pradesh',
      'Arunachal Pradesh',
      'Assam',
      'Bihar',
      'Chhattisgarh',
      'Goa',
      'Gujarat',
      'Haryana',
      'Himachal Pradesh',
      'Jharkhand',
      'Karnataka',
      'Kerala',
      'Madhya Pradesh',
      'Maharashtra',
      'Manipur',
      'Meghalaya',
      'Mizoram',
      'Nagaland',
      'Odisha',
      'Punjab',
      'Rajasthan',
      'Sikkim',
      'Tamil Nadu',
      'Telangana',
      'Tripura',
      'Uttar Pradesh',
      'Uttarakhand',
      'West Bengal',
      'Andaman and Nicobar Islands',
      'Chandigarh',
      'Dadra and Nagar Haveli and Daman and Diu',
      'Delhi',
      'Lakshadweep',
      'Puducherry'
    ],
    cityOptions:  [
      'Agra', 'Ahmedabad', 'Aizawl', 'Ajmer', 'Aligarh', 'Allahabad', 'Amritsar', 
      'Aurangabad', 'Bangalore', 'Bareilly', 'Bhopal', 'Bhubaneswar', 'Bikaner', 
      'Bilaspur', 'Chandigarh', 'Chennai', 'Coimbatore', 'Cuttack', 'Dehradun', 
      'Delhi', 'Dhanbad', 'Durgapur', 'Faridabad', 'Firozabad', 'Ghaziabad', 
      'Gorakhpur', 'Gurgaon', 'Guwahati', 'Gwalior', 'Hubli-Dharwad', 'Hyderabad', 
      'Imphal', 'Indore', 'Jabalpur', 'Jaipur', 'Jalandhar', 'Jammu', 'Jamshedpur', 
      'Jhansi', 'Jodhpur', 'Kanpur', 'Karnal', 'Kochi', 'Kolhapur', 'Kolkata', 
      'Kota', 'Lucknow', 'Ludhiana', 'Madurai', 'Malappuram', 'Mathura', 'Meerut', 
      'Moradabad', 'Mumbai', 'Mysore', 'Nagpur', 'Nashik', 'Noida', 'Patna', 'Pune', 
      'Raipur', 'Rajkot', 'Ranchi', 'Rourkela', 'Salem', 'Saharanpur', 'Sangli', 
      'Shimla', 'Siliguri', 'Solapur', 'Srinagar', 'Surat', 'Thane', 'Thiruvananthapuram', 
      'Thrissur', 'Tiruchirappalli', 'Tirunelveli', 'Tiruppur', 'Udaipur', 'Ujjain', 
      'Vadodara', 'Varanasi', 'Vasai-Virar', 'Vijayawada', 'Visakhapatnam', 'Warangal'
  ],
  };

  const backNavigationHandler = () => {
    navigation.goBack();
  };
  const validateForm = () => {
    const fields = [
      { name: 'Number of Brothers', value: numOfBrothers },
      { name: 'Number of Married Brothers', value: numOfMarriedBrothers },
      { name: 'Number of Sisters', value: numOfSisters },
      { name: 'Number of Married Sisters', value: numOfMarriedSisters },
      { name: 'Country', value: country },
      { name: 'State', value: state },
      { name: 'City', value: city },
    ];

    for (let field of fields) {
      if (!field.value) {
        Toast(`Please fill in the ${field.name} field.`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const allProfileData = {
        ...previousProfileData,
        FamilyDetails: {
          numOfBrothers,
          numOfMarriedBrothers,
          numOfSisters,
          numOfMarriedSisters,
          country,
          state,
          city,
        }
      };
      navigation.navigate('Education', { profileData: allProfileData });
    }
  };


  return (
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={backNavigationHandler}
            title={'Family Update'}
          />
        </View>
        <Space mT={20} />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Number of Brothers</Text>
        <CustomDropdown
          placeholder={'Select Number of Brothers'}
          data={demoData.numOfBrothersOptions}
          field={'numOfBrothers'}
          setSelected={setNumOfBrothers}
          searchPlaceholder={`Search number of brothers`}
        />
        <Text style={styles.label}>Number of Married Brothers</Text>
        <CustomDropdown
          placeholder={'Select Number of Married Brothers'}
          data={demoData.numOfMarriedBrothersOptions}
          field={'numOfMarriedBrothers'}
          setSelected={setNumOfMarriedBrothers}
          searchPlaceholder={`Search number of married brothers`}
        />
        <Text style={styles.label}>Number of Sisters</Text>
        <CustomDropdown
          placeholder={'Select Number of Sisters'}
          data={demoData.numOfSistersOptions}
          field={'numOfSisters'}
          setSelected={setNumOfSisters}
          searchPlaceholder={`Search number of sisters`}
        />
        <Text style={styles.label}>Number of Married Sisters</Text>
        <CustomDropdown
          placeholder={'Select Number of Married Sisters'}
          data={demoData.numOfMarriedSistersOptions}
          field={'numOfMarriedSisters'}
          setSelected={setNumOfMarriedSisters}
          searchPlaceholder={`Search number of married sisters`}
        />
        <Text style={styles.label}>Country</Text>
        <CustomDropdown
          placeholder={'Select Country'}
          data={demoData.countryOptions}
          field={'country'}
          setSelected={setCountry}
          searchPlaceholder={`Search country`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>State</Text>
        <CustomDropdown
          placeholder={'Select State'}
          data={demoData.stateOptions}
          field={'state'}
          setSelected={setState}
          searchPlaceholder={`Search state`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>City</Text>
        <CustomDropdown
          placeholder={'Select City'}
          data={demoData.cityOptions}
          field={'city'}
          setSelected={setCity}
          searchPlaceholder={`Search city`}
        />
      </View>

      <Button
        title="Submit"
        onPress={handleSubmit}
        buttonStyle={styles.submitButton}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff', // Set background color to white
  },
  headerContainer: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
  contentContainer: {
    paddingHorizontal: 15,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black', // Set header color
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black', // Set label color
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: 'black',
    backgroundColor: '#fafafa', // Set input background color
  },
  submitButton: {
    backgroundColor: '#FF9B21',
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 8,
  },
});

export default FamilyDetailsScreen;
