import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, StyleSheet, Text, SafeAreaView, TouchableOpacity, Image } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const MyAccountScreen = () => {
  const navigation = useNavigation();
  const [email, setEmail] = useState('');
  const [phone, setPhoneNumber] = useState('');
  const [password, setPassword] = useState('');

  const handleSave = () => {
    console.log('Email:', email, 'Phone Number:', phone, 'Password:', password);
  };

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const userData = await AsyncStorage.getItem('theUser');
        console.log('User data:', userData);
        if (userData) {
          const parsedUser = JSON.parse(userData);
          const user = parsedUser.user; 
          setEmail(user.email);
          setPhoneNumber(user.phone);
          setPassword(user.password);
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error);
      }
    };

    fetchUser();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <Text style={styles.text}>Email Address</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          placeholder={email}
          placeholderTextColor={'#ccc'}
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
        />
        <Text style={styles.text}>Phone Number</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          placeholder="Phone Number"
          placeholderTextColor={'#ccc'}
          value={phone}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
        />
        <Text style={styles.text}>Password</Text>
        <TextInput
          style={[styles.input, styles.inputText]}
          placeholder="Password"
          placeholderTextColor={'#ccc'}
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
      </View>

      <TouchableOpacity style={styles.saveButton} onPress={handleSave}>
        <Text style={styles.saveButtonText}>Save</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerContainer: {
    padding: 20,
    backgroundColor: '#fff',
    flexDirection: 'row',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  formContainer: {
    paddingHorizontal: 20,
    marginTop: 10,
  },
  input: {
    height: 60,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 8,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  inputText: {
    color: '#000', // Add your desired text color here
  },
  saveButton: {
    backgroundColor: '#FF7F00',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 20,
    marginTop: 20,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    color: '#333',
  },
  backButton: {
    marginRight: 10,
    color: '#333',
  },
});

export default MyAccountScreen;