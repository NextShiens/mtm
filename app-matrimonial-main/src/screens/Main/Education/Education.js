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

const Education = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const previousProfileData = route.params?.profileData || {};
  console.log('previousProfileData', previousProfileData);

  const demoData = {
    educationOptions:  [
      '10th Standard',
      '12th Standard',
      'Any Bachelors Degree',
      'Any Masters Degree',
      'B.A',
      'B.Arch',
      'B.Com',
      'B.Ed',
      'B.E',
      'B.E (Civil)',
      'B.E (Computer Science)',
      'B.E (E&C)',
      'B.E (EEE)',
      'B.E (Electrical)',
      'B.E (Electronics and Communication)',
      'B.E (Electronics and Instrumentation)',
      'B.E (Information Science)',
      'B.E (IT)',
      'B.E (Mechanical)',
      'B.E (Mining)',
      'B.Pharm',
      'B.Plan',
      'B.Tech',
      'BA',
      'Bachelor of Engineering',
      'Bachelor of Law',
      'Bachelor of Veterinary Science',
      'BAMS',
      'BBA',
      'BBM',
      'BCA',
      'BDS',
      'BE',
      'BFA',
      'BGL',
      'BHM',
      'BHMS',
      'Bio Medical',
      'Bio Technology',
      'BSc',
      'BSc (Agriculture)',
      'BSc (Computer Science)',
      'BSc (Horticulture)',
      'BSc (IT)',
      'BSc (Nursing)',
      'BSW',
      'CA Final',
      'CA Inter',
      'CFA (Chartered Financial Analyst)',
      'Civil Engineering',
      'Company Secretary (CS)',
      'D.Ed',
      'Diploma',
      'Diploma (Civil Engineering)',
      'Diploma (E&C)',
      'Diploma (ECE)',
      'Diploma (EEE)',
      'Diploma (Fashion Designing)',
      'Diploma (Mechanical)',
      'Diploma (Nursing)',
      'Diploma (Paramedical)',
      'DM - Doctorate of Medicine',
      'DMLT (Lab Technician)',
      'Electronics and Communication',
      'GNM',
      'High School',
      'Hotel Management',
      'IAS',
      'ICWA',
      'IPS',
      'IRS',
      'ITI',
      'Journalism',
      'LLB',
      'LLM',
      'M.A',
      'M.Arch',
      'M.Com',
      'M.Ed',
      'M.Pharm',
      'M.Phil',
      'M.Plan',
      'M.Sc',
      'M.Tech',
      'MA',
      'MBA',
      'MBBS',
      'MCA',
      'MD',
      'MD / MS (Medical)',
      'MDS',
      'ME',
      'Medical Laboratory Technology',
      'MS (Ophthalmology)',
      'MS (USA)',
      'MSc',
      'MSW',
      'Nursing',
      'Other Education',
      'PGDCA',
      'PGDM',
      'Ph.D',
      'Polytechnic'
    ],    
    occupationOptions: ['Service', 'Business', 'Retired', 'Not Employed' ,  'Account Director',
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
    incomeOptions: ['50,000', '2,50,000', '4,50,000', '6,50,000', '8,50,000', '10,50,000',
    '12,50,000', '14,50,000', '16,50,000', '18,50,000', '20,50,000', '22,50,000',
    '24,50,000', '26,50,000', '28,50,000', '30,50,000', '32,50,000', '34,50,000',
    '36,50,000', '38,50,000', '40,50,000', '42,50,000', '44,50,000', '46,50,000',
    '48,50,000', '50,50,000', '52,50,000', '54,50,000', '56,50,000', '58,50,000',
    '60,50,000', '62,50,000', '64,50,000', '66,50,000', '68,50,000', '70,50,000',
    '72,50,000', '74,50,000', '76,50,000', '78,50,000', '80,50,000', '82,50,000',
    '84,50,000', '86,50,000', '88,50,000', '90,50,000', '92,50,000', '94,50,000',
    '96,50,000', '98,50,000', '1,00,00,000'],
  };
  const backNavigationHandler = () => {
    navigation.goBack();
  };

  const validateForm = () => {
    const fields = [
      { name: 'Education', value: education },
      { name: 'Occupation', value: occupation },
      { name: 'Income', value: income },
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
        Education: {
          education,
          occupation,
          income,
        }
      };
      navigation.navigate('PartnerExpectation', { profileData: allProfileData });
    }
  };
  return (
    <ScrollView style={styles.container}>
      <View style={styles.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={backNavigationHandler}
            title={'Education'}
          />
        </View>
        <Space mT={20} />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Education</Text>
        <CustomDropdown
          placeholder={'Select Education'}
          data={demoData.educationOptions}
          field={'Education'}
          setSelected={setEducation}
          searchPlaceholder={`Search Education`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Occupation</Text>
        <CustomDropdown
          placeholder={'Select Occupation'}
          data={demoData.occupationOptions}
          field={'Occupation'}
          setSelected={setOccupation}
          searchPlaceholder={`Search Occupation`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Income</Text>
        <CustomDropdown
          placeholder={'Select Income'}
          data={demoData.incomeOptions}
          field={'Income'}
          setSelected={setIncome}
          searchPlaceholder={`Search Income`}
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
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: 'black',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 16,
    marginBottom: 8,
    color: 'black',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 8,
    fontSize: 16,
    color: 'black',
    backgroundColor: '#fafafa', 
  },
  submitButton: {
    backgroundColor: '#FF9B21',
    marginTop: 20,
    marginBottom: 32,
    borderRadius: 8,
  },
});

export default Education;
