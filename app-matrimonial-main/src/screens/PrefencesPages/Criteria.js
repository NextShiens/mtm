import React, { useState,useEffect } from 'react';
import { View, TextInput, StyleSheet, Text, TouchableOpacity, Image } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';


const CriteriaPage = ({ navigation }) => {
  const [partnerExpectation, setPartnerExpectation] = useState('');



  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        console.log('userData', userData);
        if (userData !== null) {
          const parsedData = JSON.parse(userData);
          const user = parsedData.user; 
          setPartnerExpectation(user.partnerExpectation);
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
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>PartnerExpectation</Text>
      </View>

      <View style={styles.inputContainer}>
        <Text style={styles.label}>Partner Expectation</Text>
        <TextInput
          style={styles.input}
          placeholder={partnerExpectation||'Enter your partner expectation'}
          value={partnerExpectation}
          onChangeText={setPartnerExpectation}
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
    backgroundColor: '#F5F5F5',
    height: 100,
    borderColor: 'gray',
    borderWidth: 1,
    textAlignVertical: 'top',
    padding:10,
    paddingHorizontal: 10,
    borderRadius: 8,
  },
  saveButton: {
    backgroundColor: '#FF7F00',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignSelf: 'flex-end',
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    color: 'black',
  },
});

export default CriteriaPage;