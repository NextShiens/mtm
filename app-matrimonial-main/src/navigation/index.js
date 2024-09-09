import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {
  Connections,
  ForgotPassword,
  ProfileUpdateScreen,
  AccountSettingsScreen,
} from '../screens';
import InitialScreen from '../screens/Auth/InitialScreen/InitialScreen';
import LoginScreen from '../screens/Auth/LoginScreen/LoginScreen';
import OTPScreen from '../screens/Auth/OTPScreen/OTPScreen';
// import PartnerReferenceScreen from '../screens/Auth/PartnerReferenceScreen/PartnerReferenceScreen';
import ProfileCreateScreen from '../screens/Auth/ProfileCreation/ProfileCreateScreen';
import ProfileDetailsScreen from '../screens/Auth/ProfileDetailsScreen/ProfileDetailsScreen';
import RegisterScreen from '../screens/Auth/RegisterScreen/RegisterScreen';
import AcceptedConnections from '../screens/Main/AcceptedConnections/AcceptedConnections';
import HomePage from '../screens/Main/HomePage/HomePage';
import InboxScreen from '../screens/Main/InboxScreen/InboxScreen';
import MembershipPlan from '../screens/Main/MembershipPlan/MembershipPlan';
import NotificationScreen from '../screens/Main/NotificationScreen/NotificationScreen';
import PartnerMatch from '../screens/Main/ParterMatch/PartnerMatch';
import PaymentScreen from '../screens/Main/PaymentScreen/PaymentScreen';
import PendingConnections from '../screens/Main/PendingConnections/PendingConnections';
import RequestedConnections from '../screens/Main/RequestedConnections/RequestedConnections';
import BottomNavigation from './BottomNavigation/BottomNavigation';
import DrawerNavigation from './DrawerNavigation/DrawerNavigation';
import UserDetailsScreen from '../screens/Main/UserDetailsScreen/UserDetailsScreen';
import SavedUserScreen from '../screens/Main/SavedUsersScreen/SavedUserScreen';
import ChatScreen from '../screens/Main/ChatScreen/ChatScreen';
import DeleteAccount from '../screens/Main/DeleteAccount/DeleteAccount';
import ChangePasswordScreen from '../screens/Main/ChangePassword/ChangePassword';
import PrivacyPolicyScreen from '../screens/Main/PrivacyPolicy/PrivacyPolicy';
import HoroscopeForm from '../screens/Main/Horoscope/HoroscopeForm';
import FamilyDetailsScreen from '../screens/Main/Familyupdate/Familyupdate';
import BasicPreferenceForm from '../screens/Main/BasicPrefferences/BasicPreffences';
import Education from '../screens/Main/Education/Education';
import PartnerExpectation from '../screens/Main/PartnerExpection/PartnerExpectationForm';
import SuccessStoriesDetals from '../screens/Main/SuccessStories/SuccessStoriesDetals';
import SuggestedUsersPage from '../screens/Main/Suggested/Suggestedfor';
import SuccessStories from '../screens/Main/SuccessStories/SuccessStories';
import SearchScreen from '../screens/Main/Search/searchScreen';
import EditProfileScreen from '../screens/Main/EditProfileScreen/EditProfileScreen';
import MyAccountScreen from '../screens/Main/Account/MyAccount';
import UserProfileStep2 from '../screens/Main/BasicInfo/Step2';
import UserProfileStep1 from '../screens/Main/BasicInfo/Step1';
import BasicInfo from '../screens/PrefencesPages/BasicInfo';
import ReligionPage from '../screens/PrefencesPages/Religion';
import LocationPage from '../screens/PrefencesPages/Location';
import EducationPage from '../screens/PrefencesPages/Education';
import CriteriaPage from '../screens/PrefencesPages/Criteria';

const Stack = createNativeStackNavigator();
const options = {headerShown: false};
const AuthStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="InitialScreen"
        component={InitialScreen}
        options={options}
      />
      <Stack.Screen
        name="RegisterScreen"
        component={RegisterScreen}
        options={options}
      />
      <Stack.Screen
        name="LoginScreen"
        component={LoginScreen}
        options={options}
      />
      <Stack.Screen name="OTPScreen" component={OTPScreen} options={options} />

      <Stack.Screen
        name="ProfileCreateScreen"
        component={ProfileCreateScreen}
        options={options}
      />
      <Stack.Screen
        name="ProfileDetailsScreen"
        component={ProfileDetailsScreen}
        options={options}
      />
      {/* <Stack.Screen
        name="PartnerReferenceScreen"
        component={PartnerReferenceScreen}
        options={options}
      /> */}
      <Stack.Screen
        name="HoroscopeForm"
        component={HoroscopeForm}
        options={options}
      />
      <Stack.Screen
        name="PartnerExpectation"
        component={PartnerExpectation}
        options={options}
      />
      <Stack.Screen
        name="FamilyDetailsScreen"
        component={FamilyDetailsScreen}
        options={options}
      />
      <Stack.Screen name="Education" component={Education} options={options} />
      <Stack.Screen
        name="BasicPreferenceForm"
        component={BasicPreferenceForm}
        options={options}
      />
      <Stack.Screen
        name="PartnerMatch"
        component={PartnerMatch}
        options={options}
      />
      <Stack.Screen
        name="SuggestedUsersPage"
        component={SuggestedUsersPage}
        options={options}
      />
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPassword}
        options={options}
      />
      <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={options}
      />
    </Stack.Navigator>
  );
};

const HomeStack = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="ProfileUpadateScreen"
        component={ProfileUpdateScreen}
        options={options}
      />
      <Stack.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={options}
      />
      <Stack.Screen
        name="SavedUserScreen"
        component={SavedUserScreen}
        options={options}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={options}
      />
      <Stack.Screen
        name="AcceptedConnections"
        component={AcceptedConnections}
        options={options}
      />
      <Stack.Screen
        name="RequestedConnections"
        component={RequestedConnections}
        options={options}
      />
      <Stack.Screen
        name="PendingConnections"
        component={PendingConnections}
        options={options}
      />
      <Stack.Screen name="HomePage" component={HomePage} options={options} />
      <Stack.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={options}
      />
      <Stack.Screen
        name="MembershipPlan"
        component={MembershipPlan}
        options={options}
      />
      <Stack.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={options}
      />
      <Stack.Screen
        name="PartnerMatch"
        component={PartnerMatch}
        options={options}
      />
      <Stack.Screen
        name="PaymentScreen"
        component={PaymentScreen}
        options={options}
      />
      <Stack.Screen
        name="UserDetailsScreen"
        component={UserDetailsScreen}
        options={options}
      />
      <Stack.Screen
        name="Connections"
        component={Connections}
        options={options}
      />
      <Stack.Screen
        name="AccountSettingsScreen"
        component={AccountSettingsScreen}
        options={options}
      />
      <Stack.Screen
        name="DeleteAccount"
        component={DeleteAccount}
        options={options}
      />
      <Stack.Screen
        name="ChangePasswordScreen"
        component={ChangePasswordScreen}
        options={options}
      />
      {/* <Stack.Screen
        name="PrivacyPolicyScreen"
        component={PrivacyPolicyScreen}
        options={options}
      /> */}
      <Stack.Screen
        name="ChatScreen"
        component={ChatScreen}
        options={options}
      />

    </Stack.Navigator>
  );
};

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="AuthStack" component={AuthStack} options={options} />
      <Stack.Screen name="HomeStack" component={HomeStack} options={options} />
      <Stack.Screen
        name="Home"
        component={BottomNavigation}
        options={options}
      />
      <Stack.Screen
        name="SearchScreen"
        component={SearchScreen}
        options={options}
      />
      <Stack.Screen
        name="DrawerNavigation"
        component={DrawerNavigation}
        options={options}
      />
      <Stack.Screen
        name="SuccessStoriesDetals"
        component={SuccessStoriesDetals}
        options={options}
      />
      <Stack.Screen
        name="SuccessStories"
        component={SuccessStories}
        options={options}
      />
      <Stack.Screen
        name="MyAccountScreen"
        component={MyAccountScreen}
        options={options}
      />
      <Stack.Screen
        name="UserProfileStep1"
        component={UserProfileStep1}
        options={options}
      />
      <Stack.Screen
        name="UserProfileStep2"
        component={UserProfileStep2}
        options={options}
      />
      <Stack.Screen
        name="BasicInfo"
        component={BasicInfo}
        options={options}
      />
      <Stack.Screen
        name="ReligionPage"
        component={ReligionPage}
        options={options}
      />
      <Stack.Screen
        name="LocationPage"
        component={LocationPage}
        options={options}
      />
      <Stack.Screen
        name="EducationPage"
        component={EducationPage}
        options={options}
      />
      <Stack.Screen
        name="CriteriaPage"
        component={CriteriaPage}
        options={options}
      />
    </Stack.Navigator>
  );
};
const AppNavigator = () => {
  return (
    <NavigationContainer>
      <RootNavigator />
    </NavigationContainer>
  );
};

export default AppNavigator;
