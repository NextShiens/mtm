import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, SafeAreaView ,Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/Ionicons';
import CustomImage from '../../../components/CustomImage/CustomImage';
import AppHeader from '../../../components/AppHeader/AppHeader';
import {IMAGES} from '../../../assets/images'; 
import { SVG } from '../../../assets/svg';

const AccountSettingsScreen = ({ navigation }) => {

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
        iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
        onLeftIconPress={() => navigation.goBack()}
        title="Delete Account"
        iconRight={
          <TouchableOpacity onPress={handleRightIconPress}>
            <Image
                source={IMAGES.Bell}
                style={{width: 25, height: 25}}
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
          <SVG.WarningIcon height={15} width={15} fill={'black'} />
          <Text style={styles.optionText}>Delete Account
          </Text>
        </View>
        <Icon size={24} color="#ccc" />
        <SVG.vectorIcon height={20} width={20} fill={'black'} />
      </TouchableOpacity>
      <TouchableOpacity style={styles.option} onPress={handleChangePasswordPress}>
        <View style={styles.optionContent}>
          <Icon size={24} color="#F39C12" />
          <SVG.LockIcon height={20} width={20} fill={'black'} />
          <Text style={styles.optionText}>Change Password</Text>
        </View>
        <Icon size={24} color="#ccc" />
        <SVG.vectorIcon height={20} width={20} fill={'black'} />
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
    fontSize: 18,
    color: '#434343',
    fontFamily: 'OpenSans',
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0', // Gray color for the line
    marginHorizontal: 16,
  },
  Bell_Icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginRight: '1%',
  },
});

export default AccountSettingsScreen;