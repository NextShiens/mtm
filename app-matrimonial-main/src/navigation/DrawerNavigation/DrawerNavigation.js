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
import AccountSettingsScreen from '../../screens/Main/AccountSettings/AccountSettings';
import DeleteAccount from '../../screens/Main/DeleteAccount/DeleteAccount';
import ChangePasswordScreen from '../../screens/Main/ChangePassword/ChangePassword';
import PrivacyPolicyScreen from '../../screens/Main/PrivacyPolicy/PrivacyPolicy';

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
        <Drawer.Screen
          name="AccountSettingsScreen"
          component={AccountSettingsScreen}
        />
        <Drawer.Screen name="DeleteAccount" component={DeleteAccount} />
        <Drawer.Screen name="ChangePasswordScreen" component={ChangePasswordScreen} />
        <Drawer.Screen name="PrivacyPolicyScreen" component={PrivacyPolicyScreen} />

      </Drawer.Navigator>
    </>
  );
};

export default DrawerNavigation;
