import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image,ToastAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../constant';


const CriteriaPage = ({ navigation }) => {
  const [partnerExpectation, setPartnerExpectation] = useState('');
  const [initialUserData, setInitialUserData] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async () => {
    const userProfile = {};

    if (partnerExpectation !== initialUserData.partnerExpectation) userProfile.partnerExpectation = partnerExpectation;
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



  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        console.log('userData', userData);
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          const user = parsedData.user; 
          setPartnerExpectation(user.partnerExpectation);
          setInitialUserData(user);
        }
      } catch (error) {
        console.error('Failed to load user data', error);
      }
    };

    fetchData();
  }, []);
  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.back}>
          <Image source={require('../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Partner Expectation</Text>
      </View>

      <View style={styles.inputContainer}>
        {/* <Text style={styles.label}>Partner Expectation</Text> */}
        <TextInput
          style={styles.input}
          placeholder={partnerExpectation||'Enter your partner expectation'}
          value={partnerExpectation}
          onChangeText={setPartnerExpectation}
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave} disabled={isLoading}>
        <Text style={styles.saveButtonText}>
          {isLoading ? 'Loading..' : 'Save'}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color:'#333'
  },
  inputContainer: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
    color: 'black',
  },
  input: {
    backgroundColor: '#ffffff',
    height: 140,
    color: '#949494',  
    borderColor: '#ccc',
    borderWidth: 1,
    textAlignVertical: 'top',
    padding:10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  saveButton: {
    height: 56,

    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    // marginTop: 20,
    marginBottom: 25,
  },
  heading: {
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: 'DM Sans',
    fontSize: 21,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    textTransform: 'capitalize',
    width: '85%',
  },
  back: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },

});

export default CriteriaPage;