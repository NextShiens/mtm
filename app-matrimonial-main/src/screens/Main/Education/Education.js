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

const Education = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [education, setEducation] = useState('');
  const [occupation, setOccupation] = useState('');
  const [income, setIncome] = useState('');
  const previousProfileData = route.params?.profileData || {};
  console.log('previousProfileData', previousProfileData);

  const demoData = {
    educationOptions: ['Bachelors', 'Masters', 'Doctorate'],
    occupationOptions: ['Doctor', 'Engineer', 'Teacher'],
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

  const handleSubmit = () => {
    const allProfileData = {
      ...previousProfileData,
      Education: {
        education,
        occupation,
        income,
      }
    };
    navigation.navigate('PartnerExpectation', { profileData: allProfileData });
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
  },
});

export default Education;
