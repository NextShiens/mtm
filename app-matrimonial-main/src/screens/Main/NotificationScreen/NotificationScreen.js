import React, { useContext, useEffect,useState } from 'react';
import { ScrollView, TouchableOpacity, View ,ActivityIndicator} from 'react-native';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import NotificationCard from '../../../components/NotificationCard/NotificationCard';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';
import { SocketContext } from '../../../../SocketContext';

const NotificationScreen = ({ navigation }) => {
  const { notifications, setNotifications } = useContext(SocketContext);
  const [currentUser, setCurrentUser] = useState({});
  const [loading, setLoading] = useState(true);


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
      if (data.success) {
        setNotifications(data.notifications);
      }
    } catch (error) {
      console.error('Error fetching notifications:', error);
    }finally {
      setLoading(false);
    }
  };

  const handleNotificationPress = (notification) => {
    // Navigate to appropriate screen based on notification type
    if (notification.type === 'chat') {
      navigation.navigate('ChatScreen', { userId: notification.senderId, roomId: notification.roomId });
    }
    // Handle other notification types as needed
  };

  if (loading) {
    return (
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="xl" color={COLORS.dark.primary} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
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