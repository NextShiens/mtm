import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { API_URL } from '../../constant';

export const saveCurrentUser = async () => {
  try {
    // Assuming you have the base URL defined elsewhere
    const response = await fetch(`${API_URL}/user/current-user`, {
      method: 'GET',
      headers: {
        // Include any necessary headers, such as authorization tokens
        'Authorization': 'Bearer ' + (await AsyncStorage.getItem('AccessToken')),
        'Content-Type': 'application/json',
      },
    });

    const jsonResponse = await response.json();

    if (response.ok && jsonResponse.success) {
      // Save the user in AsyncStorage
      await AsyncStorage.setItem('theUser', JSON.stringify(jsonResponse));
      console.log('User saved successfully');
    } else {
    }
  } catch (error) {
  }
};


export async function requestUserPermission() {
  const authStatus = await messaging().requestPermission();
  const enabled =
    authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
    authStatus === messaging.AuthorizationStatus.PROVISIONAL;

  if (enabled) {
    console.log('Authorization status:', authStatus);
    getFCMToken();
  }
}

async function getFCMToken() {
  let fcmToken = await AsyncStorage.getItem('fcmToken');
  if (!fcmToken) {
    try {
      fcmToken = await messaging().getToken();
      if (fcmToken) {
        console.log('FCM Token:', fcmToken);
        await AsyncStorage.setItem('fcmToken', fcmToken);
        sendFCMTokenToBackend(fcmToken);
        console.log('FCM token sent to backend', fcmToken);
      }
    } catch (error) {
      console.log('Error getting FCM token:', error);
    }
  }
}

async function sendFCMTokenToBackend(fcmToken) {
  const userId = await AsyncStorage.getItem('userId');
  const accessToken = await AsyncStorage.getItem('AccessToken');

  try {
    const response = await fetch(`${API_URL}/user/updateFCMToken`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        userId: userId,
        fcmToken: fcmToken,
      }),
    });
    const data = await response.json();
    console.log('FCM token sent to backend:', data);
  } catch (error) {
    console.error('Error sending FCM token to backend:', error);
  }
}

export const notificationListener = (navigation) => {
  messaging().onNotificationOpenedApp(remoteMessage => {
    console.log(
      'Notification caused app to open from background state:',
      remoteMessage.notification,
    );
    handleNotification(remoteMessage, navigation);
  });

  messaging()
    .getInitialNotification()
    .then(remoteMessage => {
      if (remoteMessage) {
        console.log(
          'Notification caused app to open from quit state:',
          remoteMessage.notification,
        );
        handleNotification(remoteMessage, navigation);
      }
    });

  messaging().onMessage(async remoteMessage => {
    console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));
    // You can show a local notification here if you want
  });
};

function handleNotification(remoteMessage, navigation) {
  // Handle different types of notifications
  if (remoteMessage.data.type === 'chat') {
    navigation.navigate('ChatScreen', {
      userId: remoteMessage.data.senderId,
      roomId: remoteMessage.data.roomId,
    });
  }
  // Handle other notification types as needed
}