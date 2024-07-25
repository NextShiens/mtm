import React, { useEffect, useState } from 'react';
import { Platform, SafeAreaView, StyleSheet, Text, View } from 'react-native';
import AppNavigator from './src/navigation';
import { requestUserPermission, saveCurrentUser } from './src/utils/pushNotifications';
import { SocketProvider } from './SocketContext';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';
import messaging from '@react-native-firebase/messaging';
import AlertBanner from './AlertBanner';

const App = () => {
  const [messageQueue, setMessageQueue] = useState([]);

  useEffect(() => {
    checkAndRequestPermissions();
    requestUserPermission();
    setupFCMListener();
  }, []);

  useEffect(() => {
    saveCurrentUser();
    const intervalId = setInterval(saveCurrentUser, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const setupFCMListener = () => {
    console.log('Setting up FCM listener');
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log('A new FCM message arrived!', JSON.stringify(remoteMessage));

      if (remoteMessage.notification) {
        console.log('Adding message to queue:', remoteMessage.notification);
        setMessageQueue(prevQueue => [
          ...prevQueue,
          {
            title: remoteMessage.notification.title,
            message: remoteMessage.notification.body,
          }
        ]);
      } else {
        console.log('No notification payload in the message');
      }
    });

    return unsubscribe;
  };
  const removeMessage = () => {
    setMessageQueue(prevQueue => prevQueue.slice(1));
  };
  const checkAndRequestPermissions = async () => {
    // ... (keep the existing code for this function)
    const permission = Platform.OS === 'ios'
      ? PERMISSIONS.IOS.NOTIFICATIONS
      : PERMISSIONS.ANDROID.POST_NOTIFICATIONS;

    try {
      const result = await check(permission);
      switch (result) {
        case RESULTS.UNAVAILABLE:
          console.log('This feature is not available on this device');
          break;
        case RESULTS.DENIED:
          // If permission hasn't been requested yet, we request it
          const requestResult = await request(permission);
          console.log('Permission request result:', requestResult);
          break;
        case RESULTS.GRANTED:
          console.log('The permission is granted');
          break;
        case RESULTS.BLOCKED:
          console.log('The permission is denied and not requestable anymore');
          // You might want to show some UI to the user here explaining how to enable the permission in settings
          break;
      }
    } catch (error) {
      console.error('Error checking or requesting notification permission:', error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <SocketProvider>
        <AppNavigator />
        <View style={styles.alertContainer}>
          {messageQueue.length > 0 && (
            <AlertBanner
              title={messageQueue[0].title}
              message={messageQueue[0].message}
              duration={5000}
              onHide={removeMessage}
            />
          )}
        </View>
      </SocketProvider>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFF5E6', // Light orange background for the entire app
  },
  alertContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
});

export default App;