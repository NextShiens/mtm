import React, { useEffect } from 'react';
import AppNavigator from './src/navigation';
import { requestUserPermission } from './src/utils/pushNotifications';
import { SocketProvider } from './SocketContext';


const App = () => {
  useEffect(() => {
    requestUserPermission();
  }, []);

  return (
    <SocketProvider>
      <AppNavigator />
    </SocketProvider>

  );
};

export default App;