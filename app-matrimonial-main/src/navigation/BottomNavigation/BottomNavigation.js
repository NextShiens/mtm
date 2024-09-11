import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Keyboard, View, Image } from 'react-native';
import { SVG } from '../../assets/svg';
import { COLORS } from '../../assets/theme';
import Icon from '../../components/Icon/Icon';
import { InboxScreen } from '../../screens';
import HomePage from '../../screens/Main/HomePage/HomePage';
import NotificationScreen from '../../screens/Main/NotificationScreen/NotificationScreen';
import PartnerMatch from '../../screens/Main/ParterMatch/PartnerMatch';
import ProfileUpdateScreen from '../../screens/Main/ProfileUpdateScreen/ProfileUpdateScreen';
import EditProfileScreen from '../../screens/Main/EditProfileScreen/EditProfileScreen';
import { styles } from './styles';

const Tab = createBottomTabNavigator();

const BottomNavigation = ({ navigation }) => {
  const style = styles;
  const focused = useIsFocused();
  const [isKeyboardVisible, setKeyboardVisible] = useState(false);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true);
      }
    );
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false);
      }
    );

    return () => {
      keyboardDidHideListener.remove();
      keyboardDidShowListener.remove();
    };
  }, []);

  return (
    <Tab.Navigator
      screenOptions={() => ({
        tabBarActiveTintColor: COLORS.dark.primary,
        tabBarInactiveTintColor: 'gray',
        headerShown: false,
        tabBarItemStyle: {
          backgroundColor: 'white',
        },
        tabBarLabelPosition: 'below-icon',
        tabBarStyle: {
          display: isKeyboardVisible ? 'none' : 'flex',
        },
      })}>
      <Tab.Screen
        name="HomePage"
        component={HomePage}
        options={{
          tabBarLabel: 'Home',
          tabBarLabelStyle: [style.tabBarLabel],
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                SVGIcon={
                  <SVG.homeIcon
                    fill={
                      focused ? COLORS.dark.primary : 'gray'
                    }
                    height={22}
                    width={22}
                  />
                }
                onPress={() => {
                  navigation.navigate('HomePage');
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="PartnerMatch"
        component={PartnerMatch}
        options={{
          tabBarLabel: 'Matches',
          tabBarLabelStyle: [style.tabBarLabel],
          tabBarIcon: ({ focused }) => (
            <View>
              <Icon
                SVGIcon={
                  <SVG.heartIcon
                    fill={
                      focused ? COLORS.dark.primary : 'gray'
                    }
                    height={22}
                    width={22}
                  />
                }
                onPress={() => {
                  navigation.navigate('PartnerMatch');
                }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="InboxScreen"
        component={InboxScreen}
        options={{
          tabBarLabel: 'Inbox',
          tabBarLabelStyle: [style.tabBarLabel],
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('InboxScreen');
              }}>
              <Icon
                SVGIcon={
                  <SVG.envelopeIcon
                    fill={
                      focused ? COLORS.dark.primary : 'gray'
                    }
                    height={22}
                    width={22}
                  />
                }
                onPress={() => {
                  navigation.navigate('InboxScreen');
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="NotificationScreen"
        component={NotificationScreen}
        options={{
          tabBarLabel: 'Notification',
          tabBarLabelStyle: [style.tabBarLabel],
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('NotificationScreen');
              }}>
              <Icon
                SVGIcon={
                  <SVG.bell
                    fill={
                      focused ? COLORS.dark.primary : 'gray'
                    }
                    height={22}
                    width={22}
                  />
                }
                onPress={() => {
                  navigation.navigate('NotificationScreen');
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="EditProfileScreen"
        component={EditProfileScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: [style.tabBarLabel],
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('EditProfileScreen');
              }}>
              <Icon
                SVGIcon={
                  <SVG.userIcon
                    fill={
                      focused ? COLORS.dark.primary : 'gray'
                    }
                    height={22}
                    width={22}
                  />
                }
                onPress={() => {
                  navigation.navigate('EditProfileScreen');
                }}
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;