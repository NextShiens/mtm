import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  TextInput,
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

  const handleLeftIconPress = () => {
    navigation.goBack();
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleChangePassword = async () => {
    debugger
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const theUser = await AsyncStorage.getItem('theUser');
        const user = JSON.parse(theUser);
    

      const response = await fetch(`${API_URL}/user/changePassword`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
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
      console.log('Password changed successfully:', result);
      Toast('Password changed successfully');
      navigation.goBack(); // Navigate back after successful password change
    } catch (error) {
      console.error('Error changing password:', error);
      Toast('Failed to change password');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={handleLeftIconPress}
          title={'Change Password'}
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <CustomImage
                source={IMAGES.notificationIcon}
                size={27}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          }
        />
      </View>
      {/* Gray line below header */}
      <View style={styles.line} />

      <View style={styles.contentContainer}>
        <View style={styles.inputContainer}>
          <Icon name="lock-closed-outline" size={24} color="#F39C12" />
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
          <Icon name="lock-closed-outline" size={24} color="#F39C12" />
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
          <Icon name="lock-closed-outline" size={24} color="#F39C12" />
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
    backgroundColor: '#E0E0E0', // Gray color for the line
    marginHorizontal: 16,
  },
  contentContainer: {
    marginTop: 16,
    paddingHorizontal: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 5,
    borderRadius: 8,
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
    marginTop: 30,
    backgroundColor: 'darkorange',
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default ChangePasswordScreen;