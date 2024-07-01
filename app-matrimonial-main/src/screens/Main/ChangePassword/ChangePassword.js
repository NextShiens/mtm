import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
  Image,
} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage'; // Import AsyncStorage
import { Toast } from '../../../utils/native'; // Import Toast utility
import AppHeader from '../../../components/AppHeader/AppHeader';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import CustomImage from '../../../components/CustomImage/CustomImage';
import { API_URL } from '../../../../constant'; 

const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');


  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleChangePassword = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const theUser = await AsyncStorage.getItem('theUser');
        const user = JSON.parse(theUser);
    

      const response = await fetch(`${API_URL}/user/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
            userId:user.user._id,
          password: oldPassword,
          newPassword: newPassword,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to change password');
      }

      const result = await response.json();
      await AsyncStorage.removeItem('AccessToken');
      await AsyncStorage.removeItem('theUser');
      console.log('Password changed successfully:', result);
      Toast('Password changed successfully');
      navigation.navigate('LoginScreen')
   
    } catch (error) {
      console.error('Error changing password:', error);
      Toast('Failed to change password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <AppHeader
        iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
        onLeftIconPress={() => navigation.goBack()}
        title="Delete Account"
        iconRight={
          <TouchableOpacity onPress={handleRightIconPress}>
            <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
          </TouchableOpacity>
        }
      />
      </View>
      <View style={styles.line} />

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Icon size={24} color="#F39C12" />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your current password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={oldPassword}
            onChangeText={setOldPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon  size={24} color="#F39C12" />
          <TextInput
            style={styles.textInput}
            placeholder="Type a new password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={newPassword}
            onChangeText={setNewPassword}
          />
        </View>
        <View style={styles.inputContainer}>
          <Icon size={24}  color="#F39C12" />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your new password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleChangePassword}>
          <Text style={styles.buttonText}>Done</Text>
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
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0', 
    marginHorizontal: 16,
  },
  contentContainer: {
    marginTop: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 14,
    marginVertical: 8,
    borderColor: '#E0E0E0',
    borderWidth: 1,
  },
  textInput: {
    flex: 1,
    marginLeft: 8,
    color: '#000',
  },
  button: {
    marginTop: 20,
    backgroundColor: '#F97B22',
    paddingVertical: 16,
    borderRadius: 16,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  Bell_Icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginRight: '1%',
  },
});

export default ChangePasswordScreen;