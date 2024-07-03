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
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../../utils/native';
import AppHeader from '../../../components/AppHeader/AppHeader';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomImage from '../../../components/CustomImage/CustomImage';
import { API_URL } from '../../../../constant';
import { Svg , Path } from 'react-native-svg';
import { LABELS } from '../../../labels';


const ChangePasswordScreen = () => {
  const navigation = useNavigation();
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const PasswordEyeIcon = ({ showPassword}) => {
     return showPassword ? (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="black">
      <Path
      d="M1 12S4 4 12 4s11 8 11 8-3 8-11 8-11-8-11-8z"
      fill="black"
      />
      <Path
        d="M12 15a3 3 0 100-6 3 3 0 000 6z"
        stroke="#A9A9A9"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      </Svg>
    ) : (
    <Svg width={24} height={24} viewBox="0 0 24 24" fill="none">
      <Path
         d="M12 4.5C7.78 4.5 4.3 7.5 3 12c1.3 4.5 4.78 7.5 9 7.5s7.7-3 9-7.5c-1.3-4.5-4.78-7.5-9-7.5z
         M12 15c1.66 0 3-1.34 3-3s-1.34-3-3-3-3 1.34-3 3 1.34 3 3 3z
         M-1 1L25 25"
        stroke="black"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
};

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleChangePassword = async () => {
    try {
      setIsLoading(true);
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
          userId: user.user._id,
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
    finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title="Change Password"
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
          <SVG.LockIcon height={20} width={20} fill={'black'} />
          <TextInput
            style={styles.textInput}
            placeholder="Enter your current password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showOldPassword}
            value={oldPassword}
            onChangeText={setOldPassword}
          />
          <TouchableOpacity onPress={() => setShowOldPassword(!showOldPassword)} style={styles.PasswordEyeIcon}>
            <PasswordEyeIcon showPassword={showOldPassword} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <SVG.LockIcon height={20} width={20} fill={'black'} />
          <TextInput
            style={styles.textInput}
            placeholder="Type a new password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showNewPassword}
            value={newPassword}
            onChangeText={setNewPassword}
          />
          <TouchableOpacity onPress={() => setShowNewPassword(!showNewPassword)} style={styles.PasswordEyeIcon}>
            <PasswordEyeIcon showPassword={showNewPassword} />
          </TouchableOpacity>
        </View>
        <View style={styles.inputContainer}>
          <SVG.LockIcon height={20} width={20} fill={'black'} />
          <TextInput
            style={styles.textInput}
            placeholder="Confirm your new password"
            placeholderTextColor="#A9A9A9"
            secureTextEntry={!showConfirmPassword}
            value={confirmPassword}
            onChangeText={setConfirmPassword}
          />
          <TouchableOpacity onPress={() => setShowConfirmPassword(!showConfirmPassword)}  style={styles.PasswordEyeIcon}>
            <PasswordEyeIcon showPassword={showConfirmPassword} />
          </TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.button} title={isLoading ? 'Changing Passwrod...' : LABELS.ChangingPassword} onPress={handleChangePassword}>
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
  PasswordEyeIcon: {
    position: 'absolute',
    right: 10,
  },
});

export default ChangePasswordScreen;