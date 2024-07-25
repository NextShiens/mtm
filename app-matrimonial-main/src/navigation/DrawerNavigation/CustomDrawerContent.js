import { DrawerContentScrollView } from '@react-navigation/drawer';
import React, { useState, useEffect, useCallback } from 'react';
import { Dimensions, Image, TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { SVG } from '../../assets/svg';
import { COLORS, STYLES } from '../../assets/theme';
import AppText from '../../components/AppText/AppText';
import CustomImage from '../../components/CustomImage/CustomImage';
import Icon from '../../components/Icon/Icon';
import Space from '../../components/Space/Space';
import { DrawerListData } from '../../data/appData';
import auth from '@react-native-firebase/auth';
import { LABELS } from '../../labels';
import { styles } from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Toast } from '../../utils/native';
import Svg, { Circle, Path } from 'react-native-svg';
import ToggleSwitch from 'toggle-switch-react-native';
import { API_URL } from '../../../constant';
import { CommonActions } from '@react-navigation/native';


const ProfileAvatar = () => (
  <Svg width="50" height="50" viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="50" fill="#b3e5fc" />
    <Path
      d="M50,31a19,19 0 1,0 38,0a19,19 0 1,0 -38,0"
      fill="#fff"
      transform="translate(-19 15)"
    />
    <Path
      d="M50,59c-16,0-30,7-30,16v5h60v-5c0-9-14-16-30-16z"
      fill="#fff"
    />
  </Svg>
);

const CustomDrawerContent = ({ props, navigation }) => {
  const [isOnline, setIsOnline] = useState(false);
  const [drawerData, setDrawerData] = useState(DrawerListData);
  const [selectedRoute, setSelectedRoute] = useState('User Name');
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userProfession, setUserProfession] = useState('Profession');
  const [userEmail, setUserEmail] = useState('');

  const style = styles;
  const windowWidth = Dimensions.get('window').width;
  const resetToInitialScreen = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{ name: 'InitialScreen' }],
      })
    );
  };

  const fetchUserData = useCallback(async () => {
    try {
      const userString = await AsyncStorage.getItem('theUser');
      console.log('User data:', userString);
      const user = JSON.parse(userString);
      console.log('User:', user)
      setUserName(user.user.name);
      setIsOnline(user.user.isActive);
      setUserImage(user.user.userImages[0]);
      setUserProfession(user.user.occupation);
      setUserEmail(user.user.email);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  // const handleToggle = async () => {
  //   try {
  //     const newStatus = !isOnline;
  //     setIsOnline(newStatus);

  //     const token = await AsyncStorage.getItem('AccessToken');
  //     const response = await fetch(`${API_URL}/user/updateActiveStatus`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         Authorization: `Bearer ${token}`,
  //       },
  //       body: JSON.stringify({
  //         isActive: newStatus,
  //       }),
  //     });

  //     if (!response.ok) {
  //       throw new Error('Failed to update profile');
  //     }

  //     const result = await response.json();
  //     console.log('Profile updated successfully:', result);

  //     // Update local storage with new status
  //     const userString = await AsyncStorage.getItem('theUser');
  //     const user = JSON.parse(userString);
  //     user.user.isActive = newStatus;
  //     await AsyncStorage.setItem('theUser', JSON.stringify(user));

  //   } catch (error) {
  //     console.error('Error updating profile:', error);
  //     // Revert the toggle if there's an error
  //     setIsOnline(!newStatus);
  //     Toast("Failed to update status. Please try again.");
  //   }
  // };

  const handleItemClick = item => {
    setSelectedRoute(item.name);
    if (item.name === 'Connections') {
      navigation.navigate('Connection');
    } else if (item.name === 'Membership') {
      navigation.navigate('MembershipPlan');
    } else if (item.name === 'Payment Method') {
      navigation.navigate('MembershipPlan');
    } else if (item.name === 'Account Setting') {
      navigation.navigate('AccountSettingsScreen');
    } else if (item.name === 'Privacy & Policy') {
      navigation.navigate('PrivacyPolicyScreen');
    } else if (item.name === 'User Name') {
      navigation.navigate('ProfileUpdateScreen');
    } else if (item.name === 'Upgrade to Pro') {
      navigation.navigate('MembershipPlan');
    } else if (item.name === 'Log Out') {
      const logout = async () => {
        await AsyncStorage.removeItem('AccessToken');
        Toast('Logged Out Successfully');
        navigation.navigate('InitialScreen');
      };

      logout();
      auth()
        .signOut()
        .then(async () => {
          await AsyncStorage.removeItem('loginToken');
          resetToInitialScreen();
        })
        .catch(err => {
          console.log(err);
        });
    }
  };

  return (
    <View style={style.container}>
      <DrawerContentScrollView {...props}>
        <View style={style.contentContainer}>
          <View style={style.nameHolder}>
            <View style={style.avatarContainer}>
              {userImage !== '' ? (
                <Image
                  source={{ uri: userImage }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              ) : (
                <ProfileAvatar
                  extraStyle={{ container: STYLES.bR(25) }}
                />
              )}
              {isOnline && <View style={style.onlineDot}></View>}
            </View>
            <Space mL={10} />
            <View style={{ height: 25, marginBottom: 10 }}>
              <AppText
                title={userName}
                variant={'h4'}
                extraStyle={{ fontFamily: Fonts.PoppinsSemiBold }}
              />
              <AppText
                title={userProfession}
                color={COLORS.dark.inputBorder}
              />
            </View>
          </View>

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ProfileUpdateScreen');
            }}>
            <Icon
              SVGIcon={
                <SVG.vectorIcon
                  fill={'black'}
                  height={20}
                  width={20}
                  onPress={() => {
                    navigation.navigate('ProfileUpdateScreen');
                  }}
                />
              }
            />
          </TouchableOpacity>
        </View>

        {DrawerListData.map(route => {
          if (route.name === 'Home') {
            return null;
          }

          if (route.name === 'Active Status') {
            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 17
                }}>
                <CustomImage
                  source={route.iconName}
                  size={25}
                  resizeMode={'contain'}
                />
                <Space mL={10} />
                <View style={{ flex: 1 }}>
                  <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                    <AppText
                      title={route.name}
                      variant={'h6'}
                      extraStyle={style.drawerItemText}
                      color={COLORS.dark.black}
                    />
                    <ToggleSwitch
                      isOn={isOnline}
                      onColor="#F97B22"
                      offColor="#F3F5FE"
                      size="small"
                      onToggle={() => { }}
                      style={{ marginLeft: 10 }}
                    />
                  </View>
                  <AppText
                    title={route.description}
                    variant={'body2'}
                    extraStyle={{ fontFamily: Fonts.PoppinsRegular, marginTop: 5 }}
                    color={COLORS.dark.inputBorder}
                  />
                </View>
              </TouchableOpacity>
            );
          }
          if (route.name === 'User Name') {
            return (
              <TouchableOpacity
                key={route.key}
                style={
                  route.name === selectedRoute
                    ? style.activeDrawerItem
                    : style.inactiveDrawerItem
                }
                onPress={() => {
                  handleItemClick(route);
                }}>
                <CustomImage
                  source={route.iconName}
                  size={25}
                  resizeMode={'contain'}
                  onPress={() => {
                    handleItemClick(route);
                  }}
                />
                <Space mL={10} />
                <View
                  style={{ maxWidth: '90%' }}
                  onPress={() => {
                    handleItemClick(route);
                  }}>
                  <AppText
                    title={userName}
                    variant={'h6'}
                    extraStyle={style.drawerItemText}
                    color={COLORS.dark.black}
                    onPress={() => {
                      handleItemClick(route);
                    }}
                  />
                  <AppText
                    title={userEmail}
                    variant={'body2'}
                    extraStyle={style.drawerItemDescription}
                    color={COLORS.dark.inputBorder}
                    onPress={() => {
                      handleItemClick(route);
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
          }
          if (route.name == 'Log Out') {
            return (
              <TouchableOpacity
                key={route.key}
                style={
                  route.name === selectedRoute
                    ? style.activeDrawerItem
                    : style.inactiveDrawerItem
                }
                onPress={() => {
                  handleItemClick(route);
                }}>
                <CustomImage
                  source={route.iconName}
                  size={25}
                  resizeMode={'contain'}
                  onPress={() => {
                    handleItemClick(route);
                  }}
                />
                <Space mL={10} />
                <View
                  style={{ maxWidth: '90%' }}
                  onPress={() => {
                    handleItemClick(route);
                  }}>
                  <AppText
                    title={route.name}
                    variant={'h6'}
                    extraStyle={style.drawerItemText}
                    color={COLORS.dark.black}
                    onPress={() => {
                      handleItemClick(route);
                    }}
                  />
                  <AppText
                    title={userEmail}
                    variant={'body2'}
                    extraStyle={style.drawerItemDescription}
                    color={COLORS.dark.inputBorder}
                    onPress={() => {
                      handleItemClick(route);
                    }}
                  />
                </View>
              </TouchableOpacity>
            )
          }
          return (
            <TouchableOpacity
              key={route.key}
              style={
                route.name === selectedRoute
                  ? style.activeDrawerItem
                  : style.inactiveDrawerItem
              }
              onPress={() => {
                handleItemClick(route);
              }}>
              <CustomImage
                source={route.iconName}
                size={25}
                resizeMode={'contain'}
                onPress={() => {
                  handleItemClick(route);
                }}
              />
              <Space mL={10} />
              <View
                style={{ maxWidth: '90%' }}
                onPress={() => {
                  handleItemClick(route);
                }}>
                <AppText
                  title={route.name}
                  variant={'h6'}
                  extraStyle={style.drawerItemText}
                  color={COLORS.dark.black}
                  onPress={() => {
                    handleItemClick(route);
                  }}
                />
                <AppText
                  title={route.description}
                  variant={'body2'}
                  extraStyle={style.drawerItemDescription}
                  color={COLORS.dark.inputBorder}
                  onPress={() => {
                    handleItemClick(route);
                  }}
                />
              </View>
            </TouchableOpacity>
          );
        })}
        <Space mT={10} />
        <View
          style={{
            paddingHorizontal: 10,
            flexDirection: 'row',
          }}>
          <Image source={IMAGES.membershipBg} style={style.upgradeCard} />
          <View
            style={{
              width: '80%',
              position: 'absolute',
            }}>
            <AppText
              title={'Upgrade to Pro'}
              variant={'h2'}
              extraStyle={{
                alignSelf: 'flex-start',
                left: 20,
                top: 20,
                fontFamily: Fonts.PoppinsSemiBold,
              }}
              onPress={() => {
                navigation.navigate('MembershipPlan');
              }}
              color={COLORS.dark.white}
            />
            <AppText
              title={'More features, more visibility!'}
              color={COLORS.dark.white}
              variant={'body2'}
              extraStyle={{
                alignSelf: 'center',
                top: 20,
                fontFamily: Fonts.PoppinsRegular,
              }}
            />
          </View>
          <View
            style={{ width: '20%', position: 'absolute', right: 20, top: 10 }}>
            <CustomImage
              source={IMAGES.character}
              size={60}
              resizeMode={'contain'}
            />
          </View>
        </View>
        <Space mT={10} />
      </DrawerContentScrollView>
    </View>
  );
};

export default CustomDrawerContent;