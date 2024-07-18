import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { useIsFocused } from '@react-navigation/native';
import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Keyboard } from 'react-native';
import { SVG } from '../../assets/svg';
import { COLORS } from '../../assets/theme';
import Icon from '../../components/Icon/Icon';
import { InboxScreen } from '../../screens';
import HomePage from '../../screens/Main/HomePage/HomePage';
import NotificationScreen from '../../screens/Main/NotificationScreen/NotificationScreen';
import PartnerMatch from '../../screens/Main/ParterMatch/PartnerMatch';
import ProfileUpdateScreen from '../../screens/Main/ProfileUpdateScreen/ProfileUpdateScreen';
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
        tabBarInactiveTintColor: COLORS.dark.inputBorder,
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('HomePage');
              }}>
              <Icon
                SVGIcon={
                  <SVG.homeIcon
                    fill={
                      focused ? COLORS.dark.primary : COLORS.dark.inputBorder
                    }
                    height={22}
                    width={22}
                  />
                }
              />
            </TouchableOpacity>
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
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('PartnerMatch');
              }}>
              <Icon
                SVGIcon={
                  <SVG.heartIcon
                    fill={
                      focused ? COLORS.dark.primary : COLORS.dark.inputBorder
                    }
                    height={22}
                    width={22}
                  />
                }
              />
            </TouchableOpacity>
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
                      focused ? COLORS.dark.primary : COLORS.dark.inputBorder
                    }
                    height={22}
                    width={22}
                  />
                }
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
                      focused ? COLORS.dark.primary : COLORS.dark.inputBorder
                    }
                    height={22}
                    width={22}
                  />
                }
              />
            </TouchableOpacity>
          ),
        }}
      />
      <Tab.Screen
        name="ProfileUpdateScreen"
        component={ProfileUpdateScreen}
        options={{
          tabBarLabel: 'Profile',
          tabBarLabelStyle: [style.tabBarLabel],
          tabBarIcon: ({ focused }) => (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('ProfileUpdateScreen');
              }}>
              <Icon
                SVGIcon={
                  <SVG.userIcon
                    fill={
                      focused ? COLORS.dark.primary : COLORS.dark.inputBorder
                    }
                    height={22}
                    width={22}
                  />
                }
              />
            </TouchableOpacity>
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;