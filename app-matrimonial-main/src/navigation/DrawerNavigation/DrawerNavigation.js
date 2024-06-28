import {createDrawerNavigator} from '@react-navigation/drawer';
import React from 'react';
import {
  Connections,
  PartnerMatch,
  ProfessionPreferenceScreen,
  SavedUserScreen,
  UserDetailsScreen,
} from '../../screens';
import MembershipPlan from '../../screens/Main/MembershipPlan/MembershipPlan';
import PaymentScreen from '../../screens/Main/PaymentScreen/PaymentScreen';
import BottomNavigation from '../BottomNavigation/BottomNavigation';
import CustomDrawerContent from './CustomDrawerContent';
import ChatScreen from '../../screens/Main/ChatScreen/ChatScreen';

const Drawer = createDrawerNavigator();
const DrawerNavigation = () => {
  return (
    <>
      <Drawer.Navigator
        initialRouteName="BottomNavigation"
        screenOptions={{
          headerShown: false,
        }}
        drawerContent={props => <CustomDrawerContent {...props} />}>
        <Drawer.Screen name="Home" component={BottomNavigation} />
        <Drawer.Screen
          name="ProfessionPreferenceScreen"
          component={ProfessionPreferenceScreen}
        />
        <Drawer.Screen name="MembershipPlan" component={MembershipPlan} />
        <Drawer.Screen name="PaymentScreen" component={PaymentScreen} />
        <Drawer.Screen name="Connection" component={Connections} />
        <Drawer.Screen name="ChatScreen" component={ChatScreen} />
        <Drawer.Screen name="UserDetailsScreen" component={UserDetailsScreen} />
        <Drawer.Screen name="PartnerMatch" component={PartnerMatch} />
        <Drawer.Screen name="SavedUserScreen" component={SavedUserScreen} />
      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;
