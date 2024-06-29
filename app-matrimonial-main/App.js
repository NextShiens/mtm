import React, { useEffect } from 'react';
import AppNavigator from './src/navigation';
import { notificationListener, requestUserPermission } from './src/utils/pushNotifications';

const App = () => {
  useEffect(() => {
    requestUserPermission();
    notificationListener();
  }, []);
  return (
    <AppNavigator />
  );
};

export default App;
