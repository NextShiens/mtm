import React, { useEffect } from 'react';
import AppNavigator from './src/navigation';
import { requestUserPermission, saveCurrentUser } from './src/utils/pushNotifications';
import { SocketProvider } from './SocketContext';


const App = () => {
  useEffect(() => {
    requestUserPermission();

  }, []);
  useEffect(() => {

    saveCurrentUser();
    const intervalId = setInterval(saveCurrentUser, 300000); // 300000 ms = 5 minutes

    return () => clearInterval(intervalId);
  }, []);

  return (
    <SocketProvider>
      <AppNavigator />
    </SocketProvider>

  );
};

export default App;