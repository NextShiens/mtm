import React, { useState } from 'react';
import { View, Text, TextInput, ScrollView, StyleSheet } from 'react-native';
import { Button } from 'react-native-elements';
import { useNavigation } from '@react-navigation/native';
import CustomDropdown from '../../../libraries/Dropdown/Dropdown';
import { useRoute } from '@react-navigation/native';
import { COLORS} from '../../../assets/theme';
import Space from '../../../components/Space/Space';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { SVG } from '../../../assets/svg';


const HoroscopeForm = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const [dosh, setDosh] = useState('');
  const [star, setStar] = useState('');
  const [birthTime, setBirthTime] = useState('');
  const [birthPlace, setBirthPlace] = useState('');
  const [religion, setReligion] = useState('');
  const [caste, setCaste] = useState('');
  const [motherTongue, setMotherTongue] = useState('');
  const [manglik, setManglik] = useState('');
  const previousProfileData = route.params?.profileData || {};
  console.log('previousProfileData', previousProfileData);


  const handleSubmit = () => {
    const allProfileData = {
      ...previousProfileData,
      horoscopeDetails: {
        dosh,
        star,
        birthTime,
        birthPlace,
        religion,
        caste,
        motherTongue,
        manglik,
      }
    };
    console.log('allProfileData', allProfileData);
    navigation.navigate('FamilyDetailsScreen', { profileData: allProfileData });
  };

  const demoData = {
    doshOptions: [
      'No Dosh',
      'Manglik',
      'Sarpa-Dosh',
      'Kaal Sarp Dosh',
      'Rahu-Dosh',
      'kethu-Dosh',
      'kalathra-Dosh',
      'Nadi Dosh',
      'Mangal Dosh',

    ],
    starOptions:[
      "Ashwini",
      "Bharani",
      "Krittika",
      "Rohini",
      "Mrigashirsha",
      "Ardra",
      "Punarvasu",
      "Pushya",
      "Ashlesha",
      "Magha",
      "Purva Phalguni",
      "Uttara Phalguni",
      "Hasta",
      "Chitra",
      "Swati",
      "Vishakha",
      "Anuradha",
      "Jyeshta",
      "Mula",
      "Purva Ashadha",
      "Uttara Ashadha",
      "Shravana",
      "Dhanistha",
      "Shatabhisha",
      "Purva Bhadrapada",
      "Uttara Bhadrapada",
      "Revathi"
    ],
    birthTimeOptions: [
      '12:00 am',
      '01:00 am',
      '02:00 am',
      '03:00 am',
      '04:00 am',
      '05:00 am',
      '06:00 am',
      '07:00 am',
      '08:00 am',
      '09:00 am',
      '10:00 am',
      '11:00 am',
      '12:00 pm',
      '01:00 pm',
      '02:00 pm',
      '03:00 pm',
      '04:00 pm',
      '05:00 pm',
      '06:00 pm',
      '07:00 pm',
      '08:00 pm',
      '09:00 pm',
      '10:00 pm',
      '11:00 pm',
    ],
    religionOptions: [
      'Hindu',
      'Muslim',
      'Christian',
      'Sikh',
      'Buddhist',
      'Jain',
      'Other',
    ],
    casteOptions: [
      'Brahmin',
      'Kshatriya',
      'Vaishya',
      'Shudra',
      'Other',
    ],
    motherTongueOptions: [
  "Angika",
  "Arunachali",
  "Assamese",
  "Awadhi",
  "Badaga",
  "Bengali",
  "Bhojpuri",
  "Bihari",
  "Brij",
  "Chatisgarhi",
  "Dogri",
  "English",
  "French",
  "Garhwali",
  "Garo",
  "Gujarati",
  "Haryanvi",
  "Himachali/Pahari",
  "Hindi",
  "Kanauji",
  "Kannada",
  "Kashmiri",
  "Khandesi",
  "Khasi",
  "Konkani",
  "Koshali",
  "Kumaoni",
  "Kutchi",
  "Ladacki",
  "Lepcha",
  "Magahi",
  "Maithili",
  "Malayalam",
  "Manipuri",
  "Marathi",
  "Marwari",
  "Miji",
  "Mizo",
  "Monpa",
  "Nepali",
  "Nicobarese",
  "Oriya",
  "Punjabi",
  "Rajasthani",
  "Sanskrit",
  "Santhali",
  "Sindhi",
  "Sourashtra",
  "Tamil",
  "Telugu",
  "Tripuri",
  "Tulu"
],
    manglikOptions: [
      'Manglik',
      'Non-Manglik',
      'Anshik Manglik',
    ],
  };
  const backNavigationHandler = () => {
    navigation.goBack();
  };

  return (
    <ScrollView style={styles.container}>
        <View style={styles.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={backNavigationHandler}
            title={'Horoscope Details'}
          />
        </View>
        <Space mT={20} />
      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Religion</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.religionOptions}
          field={'religion'}
          setSelected={setReligion}
          searchPlaceholder={`Search religion`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Caste</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.casteOptions}
          field={'caste'}
          setSelected={setCaste}
          searchPlaceholder={`Search caste`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Mother Tongue</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.motherTongueOptions}
          field={'motherTongue'}
          setSelected={setMotherTongue}
          searchPlaceholder={`Search mother tongue`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Manglik</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.manglikOptions}
          field={'manglik'}
          setSelected={setManglik}
          searchPlaceholder={`Search manglik`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Dosh</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.doshOptions}
          field={'dosh'}
          setSelected={setDosh}
          searchPlaceholder={`Search dosh`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Star</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.starOptions}
          field={'star'}
          setSelected={setStar}
          searchPlaceholder={`Search star`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Birth Time</Text>
        <CustomDropdown
          placeholder={'Select'}
          data={demoData.birthTimeOptions}
          field={'birthTime'}
          setSelected={setBirthTime}
          searchPlaceholder={`Search birth time`}
        />
      </View>

      <View style={styles.fieldContainer}>
        <Text style={styles.label}>Birth Place</Text>
        <TextInput
          style={styles.input}
          placeholder="Select"
          value={birthPlace}
          onChangeText={setBirthPlace}
        />
      </View>

      <Button
        title="Save"
        onPress={handleSubmit}
        buttonStyle={styles.submitButton}
        titleStyle={styles.submitButtonText}
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
  header: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000',
  },
  fieldContainer: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 8,
    color: '#333',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    padding: 10,
    borderRadius: 8,
    backgroundColor: '#fff',
    color:'black'
  },
  submitButton: {
    backgroundColor: '#F97B22',
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default HoroscopeForm;
