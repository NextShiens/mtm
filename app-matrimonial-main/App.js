import React, { useEffect } from 'react';
import { Platform } from 'react-native';
import AppNavigator from './src/navigation';
import { requestUserPermission, saveCurrentUser } from './src/utils/pushNotifications';
import { SocketProvider } from './SocketContext';
import { check, request, PERMISSIONS, RESULTS } from 'react-native-permissions';

const App = () => {
  useEffect(() => {
    checkAndRequestPermissions();
    requestUserPermission();
  }, []);

  useEffect(() => {
    saveCurrentUser();
    const intervalId = setInterval(saveCurrentUser, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  const checkAndRequestPermissions = async () => {
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
    <SocketProvider>
      <AppNavigator />
    </SocketProvider>
  );
};

export default App;