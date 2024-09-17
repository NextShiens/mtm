import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Clipboard from '@react-native-clipboard/clipboard';
import Svg, {Circle, Path} from 'react-native-svg';
import {Toast} from '../../../utils/native';
import { ChevronRight } from 'lucide-react-native';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedStep, setSelectedStep] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const stepOptions = [
    {label: 'Step 1', value: 'step1'},
    {label: 'Step 2', value: 'step2'},
  ];
  const preferenceOptions = [
    {label: 'Basic Info', value: 'basicInfo'},
    {label: 'Religion', value: 'religion'},
    {label: 'Location', value: 'location'},
    {label: 'Criteria', value: 'criteria'},
    {label: 'Education', value: 'education'},
  ];

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        console.log(userData);
        if (userData) {
          const data = JSON.parse(userData);
          setUser(JSON.parse(userData));
        }
        console.log('User data:rfrgretgrty', userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, []);

  const copyToClipboard = () => {
    Clipboard.setString(user._id);
    Toast('User ID copied to clipboard');
  };

  const displayUserId = user?.user?._id?.replace(/\D/g, '').slice(-8);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Edit Profile Screen</Text>
      </View>

      {/* Profile Image and Upgrade Button */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri:
              user?.user?.userImages[0] ||
              'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDbaDlF08MuAunpJmKR4yb59aeBwQTlt_S4g&s',
          }}
          style={styles.profileImage}
        />
        <View>
          <TouchableOpacity
            style={styles.upgradeButton}
            onPress={() => setModalVisible(true)}>
            <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={copyToClipboard}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              alignSelf: 'center',
              borderColor: 'rgba(0, 0, 0, 0.07)',
              marginTop: 10,
              borderWidth: 1,
              borderRadius: 10,
              paddingHorizontal:5,
              backgroundColor: 'rgba(0, 0, 0, 0.05)',
              justifyContent:'center',
            }}>
            <Text
              style={{
                width: 60,
                color: 'black',
                fontSize: 12,
               
              }}>
              {displayUserId}
            </Text>
             <Svg
                width="11"
                height="11"
                viewBox="0 0 8 11"
                fill="none"
                xmlns="http://www.w3.org/2000/svg">
                <Path
                  d="M7.06835 4.24266C7.0671 3.0135 7.04877 2.37683 6.69085 1.941C6.62178 1.8567 6.5446 1.77939 6.46044 1.71016C6.00002 1.3335 5.31669 1.3335 3.95002 1.3335C2.58335 1.3335 1.90002 1.3335 1.44002 1.71058C1.35585 1.77981 1.27868 1.85712 1.2096 1.94141C0.83252 2.40016 0.83252 3.0835 0.83252 4.45016C0.83252 5.81683 0.83252 6.50016 1.21002 6.95975C1.27946 7.04419 1.35627 7.121 1.44044 7.19016C1.87669 7.5485 2.51335 7.56683 3.74252 7.56766"
                  stroke="#949494"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
                <Path
                  d="M5.84518 4.26059L7.08101 4.24268M5.83934 9.66768L7.07518 9.64976M9.15518 6.34268L9.14351 7.57601M3.75434 6.34851L3.74268 7.58184M4.78643 4.26059C4.43976 4.32268 3.88226 4.38643 3.75434 5.10393M8.12309 9.64976C8.47101 9.59268 9.02893 9.53726 9.16809 8.82226M8.12309 4.26059C8.46976 4.32268 9.02726 4.38643 9.15518 5.10393M4.79184 9.64893C4.44476 9.58726 3.88768 9.52351 3.75934 8.80601"
                  stroke="#949494"
                  stroke-width="0.625"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                />
              </Svg>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.option1}
          onPress={() => navigation.navigate('MyAccountScreen')}>
          <Text style={styles.optionText2}>My Account</Text>
          <ChevronRight size={20} color="gray" style={{position: 'absolute', right: 10 , top:17}} />
        </TouchableOpacity>

        <View style={styles.option}>
          <Dropdown
            data={stepOptions}
            labelField="label"
            valueField="value"
            placeholder="Basic Info"
            placeholderStyle={{color: 'black'}}
            selectedTextStyle={styles.selectedTextStyle}
            value={selectedStep}
            onChange={item => {
              setSelectedStep(item.value);
              if (item.value === 'step2') {
                navigation.navigate('UserProfileStep2');
              } else if (item.value === 'step1') {
                navigation.navigate('UserProfileStep1');
              }
            }}
            style={styles.dropdown}
            itemTextStyle={{color: 'black'}}
            containerStyle={styles.dropdownContainer}
          />
        </View>

        <View style={styles.option}>
          <Dropdown
            data={preferenceOptions}
            labelField="label"
            valueField="value"
            placeholder="Preferences"
            placeholderStyle={{color: 'black'}}
            selectedTextStyle={styles.selectedTextStyle}
            value={selectedPreference}
            onChange={item => {
              setSelectedPreference(item.value);
              if (item.value === 'basicInfo') {
                navigation.navigate('BasicInfo');
              } else if (item.value === 'religion') {
                navigation.navigate('ReligionPage');
              } else if (item.value === 'location') {
                navigation.navigate('LocationPage');
              } else if (item.value === 'criteria') {
                navigation.navigate('CriteriaPage');
              } else if (item.value === 'education') {
                navigation.navigate('EducationPage');
              }
            }}
            style={styles.dropdown}
            itemTextStyle={{color: 'black'}}
            containerStyle={styles.dropdownContainer}
          />
        </View>

        <TouchableOpacity
          style={styles.option1}
          onPress={() => navigation.navigate('DeleteAccount')}>
          <Text style={styles.optionText2}>Delete Account</Text>
          <ChevronRight size={20} color="gray" style={{position: 'absolute', right: 10 , top:17}} />
        </TouchableOpacity>
      </View>

      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}>
        <View
          style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight fade background
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 25,
              shadowColor: '#000',
              shadowOffset: {width: 0, height: 2},
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              position: 'relative', // For positioning the close icon
            }}>
            {/* Close Icon */}
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                padding: 5,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{fontSize: 16, color: '#666'}}>X</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'left',
                color: '#000',
              }}>
              Upgrade Membership
            </Text>

            {/* Horizontal line */}
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: '#ccc',
                marginVertical: 10,
              }}
            />

            <Text
              style={{
                fontSize: 15,
                textAlign: 'left',
                marginBottom: 25,
                color: '#666',
              }}>
              Become a premium member to view contacts of this profile
            </Text>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                width: '100%',
              }}>
              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  marginHorizontal: 5,
                  borderRadius: 30,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{color: '#666', fontSize: 16}}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  marginHorizontal: 5,
                  borderRadius: 30,
                  backgroundColor: '#ff6600',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => {
                  setModalVisible(false);
                  navigation.navigate('MembershipPlan');
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontSize: 16,
                    fontWeight: 'bold',
                  }}>
                  Upgrade Now
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  dropdownContainer: {
    borderRadius: 8,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  backButton: {
    marginRight: 10,
    color: '#000',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
    marginBottom: 20,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
  },
  upgradeButton: {
    paddingVertical: 8,
    paddingHorizontal: 15,
    borderRadius: 20,
    marginLeft: 15,
    borderWidth: 1,
    borderColor: '#FFA500',
  },
  upgradeButtonText: {
    color: '#FFA500',
    fontWeight: 'bold',
  },
  section: {
    padding: 20,
  },
  option: {
    marginBottom: 20,
  },
  optionText: {
    fontSize: 16,
    marginBottom: 5,
    color: '#000',
  },
  option1: {
    marginBottom: 20,
    borderWidth: 1,
    borderColor: '#ccc',
    height: 56,
    borderRadius: 10,
  },
  optionText2: {
    fontSize: 16,
    marginBottom: 5,
    color: 'black',
    marginLeft: 10,
    marginTop: 17,
  },
  dropdown: {
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 8,
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#333',
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

export default EditProfileScreen;
