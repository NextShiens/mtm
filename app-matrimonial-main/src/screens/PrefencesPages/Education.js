import React, { useState, useEffect, useCallback } from 'react';
import { View, StyleSheet, TouchableOpacity, Text, ToastAndroid, Image, ActivityIndicator, RefreshControl, ScrollView } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';
import { useNavigation } from '@react-navigation/native';

const EducationPage = () => {
  const navigation = useNavigation();
  const [education, setEducation] = useState(null);
  const [occupation, setOccupation] = useState(null);
  const [annualIncome, setAnnualIncome] = useState(null);
  const [initialUserData, setInitialUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const fetchData = useCallback(async () => {
    try {
      const userData = await AsyncStorage.getItem('theUser');
      console.log('userData', userData);
      if (userData !== null) {
        const parsedData = JSON.parse(userData);
        const user = parsedData.user; 
        setEducation(user.Education.education);
        setOccupation(user.Education.occupation);
        setAnnualIncome(user.Education.income);
        setInitialUserData(user);
      }
    } catch (error) {
      console.error('Failed to load user data', error);
      ToastAndroid.showWithGravityAndOffset('Failed to load user data', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
    }
  }, []);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const onRefresh = useCallback(async () => {
    setIsRefreshing(true);
    await fetchData();
    setIsRefreshing(false);
  }, [fetchData]);

  const handleSave = async () => {
    const userProfile = {};

    if (education !== initialUserData.Education.education) userProfile.education = education;
    if (occupation !== initialUserData.Education.occupation) userProfile.occupation = occupation;
    if (annualIncome !== initialUserData.Education.income) userProfile.income = annualIncome;
    if (Object.keys(userProfile).length === 0) {
      ToastAndroid.showWithGravityAndOffset('No changes to save.', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      return;
    }
  
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
        ToastAndroid.showWithGravityAndOffset(result.message, ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      } else {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          const parsedUser = JSON.parse(userData);
          parsedUser.user = { ...parsedUser.user, ...userProfile };
          await AsyncStorage.setItem('theUser', JSON.stringify(parsedUser));
        }
        console.log('user data:', userData);
        ToastAndroid.showWithGravityAndOffset('Profile Updated Successfully', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      }
    } catch (error) {
      ToastAndroid.showWithGravityAndOffset('Failed to update profile', ToastAndroid.LONG, ToastAndroid.BOTTOM, 25, 50);
      console.error('error', error);
    } finally {
      setIsLoading(false);
    }
  };

  const educationOptions = [
    '10th Standard', '12th Standard', 'Any Bachelors Degree', 'Any Masters Degree', 'B.A', 'B.Arch', 'B.Com', 'B.Ed', 'B.E', 'B.E (Civil)',
    'B.E (Computer Science)', 'B.E (E&C)', 'B.E (EEE)', 'B.E (Electrical)', 'B.E (Electronics and Communication)', 'B.E (Electronics and Instrumentation)',
    'B.E (Information Science)', 'B.E (IT)', 'B.E (Mechanical)', 'B.E (Mining)', 'B.Pharm', 'B.Plan', 'B.Tech', 'BA', 'Bachelor of Engineering',
    'Bachelor of Law', 'Bachelor of Veterinary Science', 'BAMS', 'BBA', 'BBM', 'BCA', 'BDS', 'BE', 'BFA', 'BGL', 'BHM', 'BHMS', 'Bio Medical',
    'Bio Technology', 'BSc', 'BSc (Agriculture)', 'BSc (Computer Science)', 'BSc (Horticulture)', 'BSc (IT)', 'BSc (Nursing)', 'BSW', 'CA Final',
    'CA Inter', 'CFA (Chartered Financial Analyst)', 'Civil Engineering', 'Company Secretary (CS)', 'D.Ed', 'Diploma', 'Diploma (Civil Engineering)',
    'Diploma (E&C)', 'Diploma (ECE)', 'Diploma (EEE)', 'Diploma (Fashion Designing)', 'Diploma (Mechanical)', 'Diploma (Nursing)', 'Diploma (Paramedical)',
    'DM - Doctorate of Medicine', 'DMLT (Lab Technician)', 'Electronics and Communication', 'GNM', 'High School', 'Hotel Management', 'IAS', 'ICWA',
    'IPS', 'IRS', 'ITI', 'Journalism', 'LLB', 'LLM', 'M.A', 'M.Arch', 'M.Com', 'M.Ed', 'M.Pharm', 'M.Phil', 'M.Plan', 'M.Sc', 'M.Tech', 'MA', 'MBA',
    'MBBS', 'MCA', 'MD', 'MD / MS (Medical)', 'MDS', 'ME', 'Medical Laboratory Technology', 'MS (Ophthalmology)', 'MS (USA)', 'MSc', 'MSW', 'Nursing',
    'Other Education', 'PGDCA', 'PGDM', 'Ph.D', 'Polytechnic'
  ];
  const educate = educationOptions.map(education => ({
    label: education,
    value: education
  }));

  const occupationOptions = ['Service', 'Business', 'Retired', 'Not Employed', 'Account Director', 'Accountant', 'Advocate', 'AGM', 'Analyst',
    'Animation Professional', 'Army Personnel', 'Artist', 'Assistant Engineer', 'Assistant Manager', 'Assistant Professor', 'Assistant Teacher',
    'Assistant Traffic Manager', 'Bank Manager', 'Business', 'Business Development Associate', 'CEO', 'Civil Engineer', 'Civil Police Constable',
    'Clerical Official', 'Coach', 'Commercial Pilot', 'Company Laborer', 'Company Secretary', 'Compliance Officer', 'Computer Operator',
    'Computer Professional', 'Conductor', 'Consultant', 'Contractor', 'Coordinator', 'Cost Accountant', 'Country Head (MNC)', 'Creative Professional',
    'Customer Support Professional', 'Data Operator', 'Defense Employee', 'Dentist', 'Deputy Manager', 'Designer', 'DGM', 'Doctor', 'Driver',
    'Economist', 'Engineer', 'Entertainment Professional', 'Event Manager', 'Executive', 'Factory Worker', 'Farmer', 'Fashion Designer',
    'Finance Professional', 'Flight Attendant', 'Forest Guard', 'Government Employee', 'Guest Lecturer', 'Health Care Professional', 'Home Guard',
    'Home Maker', 'Hotel & Restaurant Professional', 'HR Professional', 'Human Resources Professional', 'IAS Officer', 'Income Tax Officer',
    'Interior Designer', 'Investment Professional', 'IPS Officer', 'IT Professional', 'Journalist', 'Junior Assistant', 'KAS Officer', 'Lab Technician',
    'Land Surveyor', 'Lawyer', 'Lecturer', 'Legal Professional', 'Logistics Professional', 'Manager', 'Marketing Professional', 'Media Professional',
    'Medical Professional', 'Medical Transcriptionist', 'Merchant Naval Officer', 'Microbiologist', 'Mines Foreman', 'Mines Manager', 'Not Working',
    'Nurse', 'Nutritionist', 'Occupational Therapist', 'Office Superintendent', 'Opthalmic Officer', 'Optician', 'Pharmacist', 'Photographer',
    'Physical Director', 'Physician Assistant', 'Physicist', 'Physiotherapist', 'Pilot', 'Police Officer', 'Politician', 'Press Reporter',
    'Private Job', 'Process Developer', 'Production Professional', 'Professor', 'Project Assistant', 'Project Engineer', 'Psychologist',
    'Public Relations Professional', 'Quality Analyst', 'Railway Employee', 'Real Estate Professional', 'Receptionist', 'Research Scholar',
    'Retail Professional', 'Retired Person', 'Sales Manager', 'Sales Professional', 'Salesforce Developer', 'SAP Professional', 'Scientist',
    'Self-employed Person', 'Social Worker', 'Software Consultant', 'Software Engineer', 'Software Tester', 'Sportsman', 'Staff Nurse',
    'Stenographer', 'Student', 'Supervisor', 'Surveyor', 'Teacher', 'Technician', 'Training Professional', 'Transportation Professional',
    'Typist', 'Veterinary Doctor', 'Village Accountant', 'Volunteer', 'Warden', 'Water Filter Business Owner', 'Writer', 'Zoologist'
  ];
  const occu = occupationOptions.map(occupation => ({
    label: occupation,
    value: occupation
  }));

  const incomeOptions = ['50,000', '2,50,000', '4,50,000', '6,50,000', '8,50,000', '10,50,000', '12,50,000', '14,50,000', '16,50,000',
    '18,50,000', '20,50,000', '22,50,000', '24,50,000', '26,50,000', '28,50,000', '30,50,000', '32,50,000', '34,50,000', '36,50,000',
    '38,50,000', '40,50,000', '42,50,000', '44,50,000', '46,50,000', '48,50,000', '50,50,000', '52,50,000', '54,50,000', '56,50,000',
    '58,50,000', '60,50,000', '62,50,000', '64,50,000', '66,50,000', '68,50,000', '70,50,000', '72,50,000', '74,50,000', '76,50,000',
    '78,50,000', '80,50,000', '82,50,000', '84,50,000', '86,50,000', '88,50,000', '90,50,000', '92,50,000', '94,50,000', '96,50,000',
    '98,50,000', '1,00,00,000'
  ];
  const income = incomeOptions.map(income => ({
    label: income,
    value: income
  }));

  return (
    <ScrollView 
      style={styles.container}
      refreshControl={
        <RefreshControl
          refreshing={isRefreshing}
          onRefresh={onRefresh}
          colors={['#F97B22']}
        />
      }
    >
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../src/assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Education</Text>
      </View>
      <Text style={styles.headerText}>Education</Text>
      <Dropdown
        style={styles.dropdown}
        data={educate}
        labelField="label"
        valueField="value"
        placeholder={education || 'Select Education'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={education}
        onChange={item => setEducation(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.headerText}>Occupation</Text>
      <Dropdown
        style={styles.dropdown}
        data={occu}
        labelField="label"
        valueField="value"
        placeholder={occupation || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={occupation}
        onChange={item => setOccupation(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <Text style={styles.headerText}>Annual Income</Text>
      <Dropdown
        style={styles.dropdown}
        data={income}
        labelField="label"
        valueField="value"
        placeholder={annualIncome || 'Select'}
        search={true}
        searchPlaceholder="Search"
        searchPlaceholderTextColor="gray"
        placeholderStyle={{color: 'gray'}}
        inputSearchStyle={styles.inputSearchStyle}
        selectedTextStyle={styles.selectedTextStyle}
        value={annualIncome}
        onChange={item => setAnnualIncome(item.value)}
        itemTextStyle={{color: 'black'}}
      />
      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="#fff" />
        ) : (
          <Text style={styles.saveText}>Save</Text>
        )}
      </TouchableOpacity>
    </ScrollView>
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
    height: 60,
    backgroundColor: 'rgba(249, 123, 34, 1)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 43,
  },
  saveText: {
    color: '#fff',
    fontSize: 16,
  },
  headerText: {
    fontSize: 14,
    color: '#000',
    marginBottom: 10,
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    width: '85%',
    fontWeight: '700',
  },
});

export default EducationPage;