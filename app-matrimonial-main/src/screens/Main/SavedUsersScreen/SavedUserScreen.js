import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import Space from '../../../components/Space/Space';
import AppCard from '../../../components/AppCard/AppCard';
import { HORIZON_MARGIN, STYLES, COLORS } from '../../../assets/theme';
import { API_URL } from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppText from '../../../components/AppText/AppText';

const SavedUserScreen = ({ navigation }) => {
  const [savedUserData, setSavedUserData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentUser, setCurrentUser] = useState({});
  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('theUser');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);

  useEffect(() => {
    const fetchSavedUsers = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/getSavedUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });
        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || 'Failed to fetch saved users');
        }
        const data = await response.json();
        if (data.success && Array.isArray(data.savedUsers)) {
          setSavedUserData(data.savedUsers);
        } else {
          throw new Error('Invalid data structure received from API');
        }
      } catch (err) {
        setError(err.message);
        console.error('Error fetching saved users:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSavedUsers();
  }, []);

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };


  if (isLoading) {
    return <Text>Loading...</Text>;
  }

  if (error) {
    return <Text>Error: {error}</Text>;
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title={LABELS.saved}
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
            </TouchableOpacity>
          }
        />
      </View>
      <Space mT={20} />
      <View style={STYLES.pH(HORIZON_MARGIN)}>
        {savedUserData.length > 0 ? (
          savedUserData.map((user) => (
            <AppCard
              isBtnShown={true}
              btnType={'sendInterest'}
              data={user}
              onPressBtn1={() => {
                navigation.navigate('UserDetailsScreen', { userId: user?._id });
              }}
              onPressBtn2={() => {
                console.log('Chat button pressed');
                navigation.navigate('ChatScreen', { userId: user?._id, roomId: `${user?._id}_${currentUser.user._id}`, user: user });
              }}
            />
          ))
        ) : (
          <AppText title="No saved users found" color={COLORS.dark.secondary} />
        )}
      </View>
    </ScrollView>
  );
};

export default SavedUserScreen;