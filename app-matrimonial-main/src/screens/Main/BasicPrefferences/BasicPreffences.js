import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Button } from 'react-native-elements';
import Space from '../../../components/Space/Space';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import { useNavigation } from '@react-navigation/native';
import { useRoute } from '@react-navigation/native';
import { COLORS} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { SVG } from '../../../assets/svg';
import { Toast } from '../../../utils/native'; 


const BasicPreferenceForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [ageFrom, setAgeFrom] = useState('');
  const [ageTo, setAgeTo] = useState('');
  const [heightFrom, setHeightFrom] = useState('');
  const [heightTo, setHeightTo] = useState('');
  const [lookingFor, setLookingFor] = useState('');
  const [physicalStatus, setPhysicalStatus] = useState('');
  const [food, setFood] = useState('');
  const [smoking, setSmoking] = useState('');
  const [drinking, setDrinking] = useState('');
  const [familyType, setFamilyType] = useState('');
  const [familyStatus, setFamilyStatus] = useState('');
  const [familyValue, setFamilyValue] = useState('');
  const [fathersOccupation, setFathersOccupation] = useState('');
  const previousProfileData = route.params?.profileData || {};
  console.log('previousProfileData', previousProfileData);

  const demoData = {
    ageFromOptions: ['18 Years', '19 Years', '20 Years' , '21 Years', '22 Years', '23 Years', '24 Years', '25 Years', '26 Years', '27 Years', '28 Years', '29 Years', '30 Years', '31 Years', '32 Years', '33 Years', '34 Years', '35 Years', '36 Years', '37 Years', '38 Years', '39 Years', '40 Years', '41 Years', '42 Years', '43 Years', '44 Years', '45 Years', '46 Years', '47 Years', '48 Years', '49 Years', '50 Years', '51 Years', '52 Years', '53 Years', '54 Years', '55 Years', '56 Years', '57 Years', '58 Years', '59 Years' , '60 Years', '61 Years', '62 Years', '63 Years', '64 Years', '65 Years', '66 Years', '67 Years', '68 Years', '69 Years', '70 Years', '71 Years', '72 Years', '73 Years', '74 Years', '75 Years', '76 Years', '77 Years', '78 Years', '79 Years', '80 Years', '81 Years', '82 Years', '83 Years', '84 Years', '85 Years', '86 Years', '87 Years', '88 Years', '89 Years', '90 Years', '91 Years', '92 Years', '93 Years', '94 Years', '95 Years', '96 Years', '97 Years', '98 Years', '99 Years', '100 Years'],
    ageToOptions: ['18 Years', '19 Years', '20 Years' , '21 Years', '22 Years', '23 Years', '24 Years', '25 Years', '26 Years', '27 Years', '28 Years', '29 Years', '30 Years', '31 Years', '32 Years', '33 Years', '34 Years', '35 Years', '36 Years', '37 Years', '38 Years', '39 Years', '40 Years', '41 Years', '42 Years', '43 Years', '44 Years', '45 Years', '46 Years', '47 Years', '48 Years', '49 Years', '50 Years', '51 Years', '52 Years', '53 Years', '54 Years', '55 Years', '56 Years', '57 Years', '58 Years', '59 Years', '60 Years', '61 Years', '62 Years', '63 Years', '64 Years', '65 Years', '66 Years', '67 Years', '68 Years', '69 Years', '70 Years', '71 Years', '72 Years', '73 Years', '74 Years', '75 Years', '76 Years', '77 Years', '78 Years', '79 Years', '80 Years', '81 Years', '82 Years', '83 Years', '84 Years', '85 Years', '86 Years', '87 Years', '88 Years', '89 Years', '90 Years', '91 Years', '92 Years', '93 Years', '94 Years', '95 Years', '96 Years', '97 Years', '98 Years', '99 Years', '100 Years'],
    heightFromOptions: [ '4 feet 0 inches', '4 feet 1 inch', '4 feet 2 inches', '4 feet 3 inches', '4 feet 4 inches', '4 feet 5 inches',
      '4 feet 6 inches', '4 feet 7 inches', '4 feet 8 inches', '4 feet 9 inches', '4 feet 10 inches', '4 feet 11 inches',
      '5 feet 0 inches', '5 feet 1 inch', '5 feet 2 inches', '5 feet 3 inches', '5 feet 4 inches', '5 feet 5 inches',
      '5 feet 6 inches', '5 feet 7 inches', '5 feet 8 inches', '5 feet 9 inches', '5 feet 10 inches', '5 feet 11 inches',
      '6 feet 0 inches', '6 feet 1 inch', '6 feet 2 inches', '6 feet 3 inches', '6 feet 4 inches', '6 feet 5 inches',
      '6 feet 6 inches', '6 feet 7 inches', '6 feet 8 inches', '6 feet 9 inches', '6 feet 10 inches', '6 feet 11 inches',
      '7 feet 0 inches'],
    heightToOptions: [ '4 feet 0 inches', '4 feet 1 inch', '4 feet 2 inches', '4 feet 3 inches', '4 feet 4 inches', '4 feet 5 inches',
      '4 feet 6 inches', '4 feet 7 inches', '4 feet 8 inches', '4 feet 9 inches', '4 feet 10 inches', '4 feet 11 inches',
      '5 feet 0 inches', '5 feet 1 inch', '5 feet 2 inches', '5 feet 3 inches', '5 feet 4 inches', '5 feet 5 inches',
      '5 feet 6 inches', '5 feet 7 inches', '5 feet 8 inches', '5 feet 9 inches', '5 feet 10 inches', '5 feet 11 inches',
      '6 feet 0 inches', '6 feet 1 inch', '6 feet 2 inches', '6 feet 3 inches', '6 feet 4 inches', '6 feet 5 inches',
      '6 feet 6 inches', '6 feet 7 inches', '6 feet 8 inches', '6 feet 9 inches', '6 feet 10 inches', '6 feet 11 inches',
      '7 feet 0 inches'],
    lookingForOptions: ['Friendship', 'Marriage', 'Dating'],
    physicalStatusOptions: ['Normal', 'Physically Challenged'],
    foodOptions: ['Vegetarian', 'Non-Vegetarian','Eggetarian'],
    smokingOptions: ['Yes', 'Occasionally Smoke', 'No'],
    drinkingOptions: ['Yes', 'No', 'Drinks Socialy'],
    familyTypeOptions: ['Joint', 'Nuclear'],
    familyStatusOptions: ['Rich', 'Upper Middle Class', 'Middle Class', 'Affluent'],
    familyValueOptions: ['Orthodox', 'Traditional', 'Moderate', 'Liberal'],
    fathersOccupationOptions: ['Service', 'Business', 'Retired', 'Not Employed' ,  'Account Director',
      'Accountant',
      'Advocate',
      'AGM',
      'Analyst',
      'Animation Professional',
      'Army Personnel',
      'Artist',
      'Assistant Engineer',
      'Assistant Manager',
      'Assistant Professor',
      'Assistant Teacher',
      'Assistant Traffic Manager',
      'Bank Manager',
      'Business',
      'Business Development Associate',
      'CEO',
      'Civil Engineer',
      'Civil Police Constable',
      'Clerical Official',
      'Coach',
      'Commercial Pilot',
      'Company Laborer',
      'Company Secretary',
      'Compliance Officer',
      'Computer Operator',
      'Computer Professional',
      'Conductor',
      'Consultant',
      'Contractor',
      'Coordinator',
      'Cost Accountant',
      'Country Head (MNC)',
      'Creative Professional',
      'Customer Support Professional',
      'Data Operator',
      'Defense Employee',
      'Dentist',
      'Deputy Manager',
      'Designer',
      'DGM',
      'Doctor',
      'Driver',
      'Economist',
      'Engineer',
      'Entertainment Professional',
      'Event Manager',
      'Executive',
      'Factory Worker',
      'Farmer',
      'Fashion Designer',
      'Finance Professional',
      'Flight Attendant',
      'Forest Guard',
      'Government Employee',
      'Guest Lecturer',
      'Health Care Professional',
      'Home Guard',
      'Home Maker',
      'Hotel & Restaurant Professional',
      'HR Professional',
      'Human Resources Professional',
      'IAS Officer',
      'Income Tax Officer',
      'Interior Designer',
      'Investment Professional',
      'IPS Officer',
      'IT Professional',
      'Journalist',
      'Junior Assistant',
      'KAS Officer',
      'Lab Technician',
      'Land Surveyor',
      'Lawyer',
      'Lecturer',
      'Legal Professional',
      'Logistics Professional',
      'Manager',
      'Marketing Professional',
      'Media Professional',
      'Medical Professional',
      'Medical Transcriptionist',
      'Merchant Naval Officer',
      'Microbiologist',
      'Mines Foreman',
      'Mines Manager',
      'Not Working',
      'Nurse',
      'Nutritionist',
      'Occupational Therapist',
      'Office Superintendent',
      'Opthalmic Officer',
      'Optician',
      'Pharmacist',
      'Photographer',
      'Physical Director',
      'Physician Assistant',
      'Physicist',
      'Physiotherapist',
      'Pilot',
      'Police Officer',
      'Politician',
      'Press Reporter',
      'Private Job',
      'Process Developer',
      'Production Professional',
      'Professor',
      'Project Assistant',
      'Project Engineer',
      'Psychologist',
      'Public Relations Professional',
      'Quality Analyst',
      'Railway Employee',
      'Real Estate Professional',
      'Receptionist',
      'Research Scholar',
      'Retail Professional',
      'Retired Person',
      'Sales Manager',
      'Sales Professional',
      'Salesforce Developer',
      'SAP Professional',
      'Scientist',
      'Self-employed Person',
      'Social Worker',
      'Software Consultant',
      'Software Engineer',
      'Software Tester',
      'Sportsman',
      'Staff Nurse',
      'Stenographer',
      'Student',
      'Supervisor',
      'Surveyor',
      'Teacher',
      'Technician',
      'Training Professional',
      'Transportation Professional',
      'Typist',
      'Veterinary Doctor',
      'Village Accountant',
      'Volunteer',
      'Warden',
      'Water Filter Business Owner',
      'Writer',
      'Zoologist' ],
  };

  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const handleSubmit = () => {
    if (validateForm()) {
      const allProfileData = {
        ...previousProfileData,
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
      console.log('allProfileData', allProfileData);
      navigation.navigate('HoroscopeForm', { profileData: allProfileData });
    }
  };

  const validateForm = () => {
    const fields = [
      { name: 'Age From', value: ageFrom },
      { name: 'Age To', value: ageTo },
      { name: 'Height From', value: heightFrom },
      { name: 'Height To', value: heightTo },
      { name: 'Looking For', value: lookingFor },
      { name: 'Physical Status', value: physicalStatus },
      { name: 'Food', value: food },
      { name: 'Smoking', value: smoking },
      { name: 'Drinking', value: drinking },
      { name: 'Family Type', value: familyType },
      { name: 'Family Status', value: familyStatus },
      { name: 'Family Value', value: familyValue },
      { name: 'Father\'s Occupation', value: fathersOccupation },
    ];

    for (let field of fields) {
      if (!field.value) {
        Toast(`Please fill in the ${field.name} field.`);
        return false;
      }
    }
    return true;
  };

  const updatePartnerPreference = (field, value) => {
    setAllProfileData(prevData => ({
      ...prevData,
      partnerPreference: {
        ...prevData.partnerPreference,
        [field]: value
      }
    }));
  };


  return (
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={backNavigationHandler}
            title={'Basic Preferences'}
          />
        </View>
        <Space mT={20} />
      <Text style={styles.label}>Age</Text>
      <View style={styles.row}>
        <CustomDropdown
          placeholder={'Select Age From'}
          data={demoData.ageFromOptions}
          field={'ageFrom'}
          setSelected={setAgeFrom}
          searchPlaceholder={`Search Age`}
        />
        <Text style={styles.to}>To</Text>
        <CustomDropdown
          placeholder={'Select Age To'}
          data={demoData.ageToOptions}
          field={'ageTo'}
          setSelected={setAgeTo}
          searchPlaceholder={`Search Age`}
        />
      </View>

      <Text style={styles.label}>Height</Text>
      <View style={styles.row}>
        <CustomDropdown
          placeholder={'Select Height From'}
          data={demoData.heightFromOptions}
          field={'heightFrom'}
          setSelected={setHeightFrom}
          searchPlaceholder={`Search Height`}
        />
        <Text style={styles.to}>To</Text>
        <CustomDropdown
          placeholder={'Select Height To'}
          data={demoData.heightToOptions}
          field={'heightTo'}
          setSelected={setHeightTo}
          searchPlaceholder={`Search Height`}
        />
      </View>

      <Text style={styles.label}>Looking For</Text>
      <CustomDropdown
        placeholder={'Select Looking For'}
        data={demoData.lookingForOptions}
        field={'lookingFor'}
        setSelected={setLookingFor}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Physical Status</Text>
      <CustomDropdown
        placeholder={'Select Physical Status'}
        data={demoData.physicalStatusOptions}
        field={'physicalStatus'}
        setSelected={setPhysicalStatus}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Food</Text>
      <CustomDropdown
        placeholder={'Select Food'}
        data={demoData.foodOptions}
        field={'food'}
        setSelected={setFood}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Smoking</Text>
      <CustomDropdown
        placeholder={'Select Smoking'}
        data={demoData.smokingOptions}
        field={'smoking'}
        setSelected={setSmoking}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Drinking</Text>
      <CustomDropdown
        placeholder={'Select Drinking'}
        data={demoData.drinkingOptions}
        field={'drinking'}
        setSelected={setDrinking}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Family Type</Text>
      <CustomDropdown
        placeholder={'Select Family Type'}
        data={demoData.familyTypeOptions}
        field={'familyType'}
        setSelected={setFamilyType}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Family Status</Text>
      <CustomDropdown
        placeholder={'Select Family Status'}
        data={demoData.familyStatusOptions}
        field={'familyStatus'}
        setSelected={setFamilyStatus}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Family Value</Text>
      <CustomDropdown
        placeholder={'Select Family Value'}
        data={demoData.familyValueOptions}
        field={'familyValue'}
        setSelected={setFamilyValue}
        searchPlaceholder={`Search`}
      />
      <Space mT={30} />

      <Text style={styles.label}>Father's Occupation</Text>
      <CustomDropdown
        placeholder={'Select Father\'s Occupation'}
        data={demoData.fathersOccupationOptions}
        field={'fathersOccupation'}
        setSelected={setFathersOccupation}
        searchPlaceholder={`Search`}
      />
      <Space mT={15} />

      <Button
        title="Save"
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
    backgroundColor: '#fff',
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
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  to: {
    marginHorizontal: 8,
    color: 'black',
    top: 2,
  },
  submitButton: {
    backgroundColor: '#FF9B21',
    marginTop: 20,
    marginBottom: 32,
  },
});

export default BasicPreferenceForm;
