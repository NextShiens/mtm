import React, { useContext, useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import NotificationCard from '../../../components/NotificationCard/NotificationCard';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';
import { checkLiveChatAvailability } from '../../../utils/subscriptionCheck';


const NotificationScreen = ({ navigation }) => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNotifications();
  }, []);

  const fetchNotifications = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/getNotifications`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      console.log('Notifications:', data);
      if (data.auth) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleNotificationPress = async (notification) => {
    console.log('Notification pressed:', notification);
    if (notification.title === 'Chat') {
    const isSubscribed = await checkLiveChatAvailability(JSON.parse(await AsyncStorage.getItem('theUser')));
    if (isSubscribed) {
      navigation.navigate('ChatScreen', { userId: notification?.senderId._id, roomId: `${notification?.senderId._id}_${notification?.receiverId}`, user: notification?.senderId });
    } else {
      Toast("You can't chat buy premium plan");
    }
  }

    if (notification.title === 'Matrimonial') {
      navigation.navigate('UserDetailsScreen', {userId: notification?.senderId._id })
    }
    // Handle other notification types as needed
  };

  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={COLORS.dark.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title={LABELS.notification}
          iconRight={
            <TouchableOpacity>
              <CustomImage
                source={IMAGES.notificationIcon}
                size={27}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          }
        />
      </View>
      <Space mT={20} />
      <NotificationCard
        data={notifications}
        onPress={handleNotificationPress}
      />
    </ScrollView>
  );
};

export default NotificationScreen;