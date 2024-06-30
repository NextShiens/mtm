import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView, TextInput } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomImage from '../../../components/CustomImage/CustomImage';
import AppHeader from '../../../components/AppHeader/AppHeader';
import {IMAGES} from '../../../assets/images'; 
import { SVG } from '../../../assets/svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';

const DeleteAccount = () => {
  const navigation = useNavigation();
  const handleDeleteAccount = async () => {
    debugger
    const user = await AsyncStorage.getItem('theUser');
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const theUser = await AsyncStorage.getItem('theUser');
      const user = JSON.parse(theUser);
        const email = user.user.email;
        const userId = user.user._id;

      const response = await fetch(`${API_URL}/user/deleteAccount`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ email, userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to delete account');
      }

      const result = await response.json();
      console.log('Account deleted successfully:', result);
      Toast('Account deleted successfully');
      navigation.goBack();
    } catch (error) {
      console.error('Error deleting account:', error);
      Toast('Failed to delete account');
    }
  };


  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <AppHeader
        iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
        onLeftIconPress={() => navigation.goBack()}
        title="Delete Account"
        iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <CustomImage
                source={IMAGES.notificationIcon} 
                size={27}
                resizeMode="contain"
              />
            </TouchableOpacity>
          }
      />
       <View style={styles.line} />
      <View style={styles.contentContainer}>
        <Text style={styles.title}>Delete Account</Text>
        <Text style={styles.subtitle}>
          We Are Sorry To See You Leave, Can You Please Share Some Feedback On Your Experience.
        </Text>
        <TextInput
          style={styles.textInput}
          placeholder="Your Explanation Is Entirely Optional.."
          multiline
        />
        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText} onPress={handleDeleteAccount}>Confirm Deletion</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingHorizontal: 16,
  },
  contentContainer: {
    marginTop: 32,
    paddingHorizontal: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
  },
  subtitle: {
    marginTop: 8,
    fontSize: 14,
    color: '#7D7D7D',
  },
  textInput: {
    marginTop: 16,
    padding: 16,
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 8,
    height: 100,
    textAlignVertical: 'top',
    backgroundColor: '#F9F9F9',
    color: '#000',
  },
  button: {
    marginTop: 32,
    backgroundColor: 'orange',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0', // Gray color for the line
    marginHorizontal: 16,
  },
});

export default DeleteAccount;