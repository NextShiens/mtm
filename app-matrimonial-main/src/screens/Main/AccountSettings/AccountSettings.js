import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomImage from '../../../components/CustomImage/CustomImage';
import AppHeader from '../../../components/AppHeader/AppHeader';
import {IMAGES} from '../../../assets/images'; 
import { SVG } from '../../../assets/svg';

const AccountSettingsScreen = ({ navigation }) => {

  const handleLeftIconPress = () => {
    navigation.navigate('HomePage');
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleDeleteAccountPress = () => {
    navigation.navigate('DeleteAccount');
  };  

  const handleChangePasswordPress = () => {
    navigation.navigate('ChangePasswordScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.headerContainer}>
      <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          title={'Account Settings'}
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
        <View style={styles.line} />
      </View>
      <TouchableOpacity style={styles.option} 
      onPress={handleDeleteAccountPress}>
        <View style={styles.optionContent}>
          <Icon size={24} color="#F39C12" />
          <Text style={styles.optionText}>Delete Account</Text>
        </View>
        <Icon size={24} color="#ccc" />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleChangePasswordPress}>
        <View style={styles.optionContent}>
          <Icon size={24} color="#F39C12" />
          <Text style={styles.optionText}>Change Password</Text>
        </View>
        <Icon size={24} color="#ccc" />
      </TouchableOpacity>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
  },
  headerContainer: {
    marginBottom: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 16,
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#000',
  },
  option: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
    padding: 16,
    borderRadius: 8,
    marginVertical: 8,
  },
  optionContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  optionText: {
    marginLeft: 8,
    fontSize: 16,
    color: 'black',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0', // Gray color for the line
    marginHorizontal: 16,
  },
});

export default AccountSettingsScreen;