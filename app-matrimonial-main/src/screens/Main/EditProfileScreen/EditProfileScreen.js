import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  Modal,
} from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditProfileScreen = () => {
  const navigation = useNavigation();
  const [selectedStep, setSelectedStep] = useState('');
  const [selectedPreference, setSelectedPreference] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [user, setUser] = useState(null);

  const stepOptions = [
    { label: 'Step 1', value: 'step1' },
    { label: 'Step 2', value: 'step2' },
  ];
  const preferenceOptions = [
    { label: 'Basic Info', value: 'basicInfo' },
    { label: 'Religion', value: 'religion' },
    { label: 'Location', value: 'location' },
    { label: 'Criteria', value: 'criteria' },
    { label: 'Education', value: 'education' },
  ];


  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        if (userData) {
          setUser(JSON.parse(userData));
        }
        console.log('User data:', userData);
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.backButton}></TouchableOpacity>
        <Text style={styles.headerText}>Edit Profile</Text>
      </View>

      {/* Profile Image and Upgrade Button */}
      <View style={styles.profileSection}>
        <Image
          source={{
            uri: user?.profileImage || 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRDbaDlF08MuAunpJmKR4yb59aeBwQTlt_S4g&s',
          }}
          style={styles.profileImage}
        />
        <TouchableOpacity
          style={styles.upgradeButton}
          onPress={() => setModalVisible(true)}>
          <Text style={styles.upgradeButtonText}>Upgrade Now</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <TouchableOpacity
          style={styles.option1}
          onPress={() => navigation.navigate('MyAccountScreen')}>
          <Text style={styles.optionText2}>My Account</Text>
        </TouchableOpacity>

        <View style={styles.option}>
          <Dropdown
            data={stepOptions}
            labelField="label"
            valueField="value"
            placeholder="Basic Info"
            placeholderStyle={{ color: 'gray' }}
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
            itemTextStyle={{ color: 'gray' }}
          />
        </View>

        <View style={styles.option}>
          <Dropdown
            data={preferenceOptions}
            labelField="label"
            valueField="value"
            placeholder="Preferences"
            placeholderStyle={{ color: 'gray' }}
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
            itemTextStyle={{ color: 'gray' }}
          />
        </View>

        <TouchableOpacity
          style={styles.option1}
          onPress={() => navigation.navigate('DeleteAccount')}>
          <Text style={styles.optionText2}>Delete Account</Text>
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
              shadowOffset: { width: 0, height: 2 },
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
              <Text style={{ fontSize: 16, color: '#666' }}>X</Text>
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
                <Text style={{ color: '#666', fontSize: 16 }}>Cancel</Text>
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
    height: 60,
    borderRadius: 10,
  },
  optionText2: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray',
    marginLeft: 10,
    marginTop: 17,
  },
  dropdown: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
});

export default EditProfileScreen;