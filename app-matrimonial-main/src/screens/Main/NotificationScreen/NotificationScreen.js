import React, { useEffect, useState } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator, RefreshControl, Alert, Text } from 'react-native';
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
  const [refreshing, setRefreshing] = useState(false);

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
      Alert.alert('Error', 'Failed to fetch notifications. Please try again.');
    } finally {
      setLoading(false);
      setRefreshing(false);
    }
  };

  const handleNotificationPress = async (notification) => {
    console.log('Notification pressed:', notification);
    if (notification.title === 'Chat') {
      const isSubscribed = await checkLiveChatAvailability(JSON.parse(await AsyncStorage.getItem('theUser')));
      if (isSubscribed) {
        navigation.navigate('ChatScreen', { userId: notification?.senderId._id, roomId: `${notification?.senderId._id}_${notification?.receiverId}`, user: notification?.senderId });
      } else {
        Alert.alert('Premium Required', "You can't chat. Please buy a premium plan to access this feature.");
      }
    } else if (notification.title === 'Matrimonial') {
      navigation.navigate('UserDetailsScreen', { userId: notification?.senderId._id });
    }
    // Handle other notification types as needed
  };

  const onRefresh = () => {
    setRefreshing(true);
    fetchNotifications();
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color={COLORS.dark.primary} />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={COLORS.dark.text} />}
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
      <ScrollView
        contentContainerStyle={styles.scrollViewContent}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={[COLORS.dark.primary]}
          />
        }
      >
        {/* <Space mT={10} /> */}
        {notifications.length > 0 ? (
          <NotificationCard
            data={notifications}
            onPress={handleNotificationPress}
          />
        ) : (
          <View style={styles.emptyStateContainer}>
            <CustomImage
              source={IMAGES.emptyNotifications}
              size={120}
              resizeMode={'contain'}
            />
            <Space mT={20} />
            <Text style={styles.emptyStateText}>No notifications yet</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
};

export default NotificationScreen;