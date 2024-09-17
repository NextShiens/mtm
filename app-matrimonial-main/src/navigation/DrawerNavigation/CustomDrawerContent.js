import {
  DrawerContentScrollView,
  DrawerItemList,
} from '@react-navigation/drawer';
import React, {useState, useEffect, useCallback} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  ScrollView,
  RefreshControl,
  Modal,
  Text,
} from 'react-native';
import {Fonts} from '../../assets/fonts';
import {IMAGES} from '../../assets/images';
import {SVG} from '../../assets/svg';
import {COLORS, STYLES} from '../../assets/theme';
import AppText from '../../components/AppText/AppText';
import CustomImage from '../../components/CustomImage/CustomImage';
import Icon from '../../components/Icon/Icon';
import Space from '../../components/Space/Space';
import {DrawerListData} from '../../data/appData';
import auth from '@react-native-firebase/auth';
import {LABELS} from '../../labels';
import {styles} from './styles';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Toast} from '../../utils/native';
import Svg, {Circle, Path} from 'react-native-svg';
import ToggleSwitch from 'toggle-switch-react-native';
import {API_URL} from '../../../constant';
import {CommonActions} from '@react-navigation/native';
import {Images} from 'lucide-react-native';
import {useNavigation, DrawerActions} from '@react-navigation/native';
import Clipboard from '@react-native-clipboard/clipboard';

const ProfileAvatar = () => (
  <Svg width="50" height="50" viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="50" fill="#b3e5fc" />
    <Path
      d="M50,31a19,19 0 1,0 38,0a19,19 0 1,0 -38,0"
      fill="#fff"
      transform="translate(-19 15)"
    />
    <Path d="M50,59c-16,0-30,7-30,16v5h60v-5c0-9-14-16-30-16z" fill="#fff" />
  </Svg>
);

const CustomDrawerContent = ({props}) => {
  const navigation = useNavigation();
  const [isOnline, setIsOnline] = useState(false);
  const [drawerData, setDrawerData] = useState(DrawerListData);
  const [selectedRoute, setSelectedRoute] = useState('User Name');
  const [userName, setUserName] = useState('');
  const [userImage, setUserImage] = useState('');
  const [userProfession, setUserProfession] = useState('Profession');
  const [userEmail, setUserEmail] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [userId, setUserId] = useState('');

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  const openModal = () => {
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };
  const style = styles;
  const windowWidth = Dimensions.get('window').width;
  const resetToInitialScreen = () => {
    try {
      navigation.dispatch(
        CommonActions.reset({
          index: 0,
          routes: [
            {name: 'AuthStack', state: {routes: [{name: 'InitialScreen'}]}},
          ],
        }),
      );
    } catch (error) {
      console.error('Failed to reset to initial screen:', error);
    }
  };

  const fetchUserData = useCallback(async () => {
    try {
      const userString = await AsyncStorage.getItem('theUser');
      console.log('User data:', userString);
      const user = JSON.parse(userString);
      console.log('User:', user);
      setUserName(user.user.name);
      setIsOnline(user.user.isActive);
      setUserImage(user.user.userImages[0]);
      setUserProfession(user.user.occupation);
      setUserEmail(user.user.email);
      setUserId(user.user._id);
      console.log('User 656785765676data:', user);
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  }, []);

  useEffect(() => {
    fetchUserData();
  }, [fetchUserData]);

  const copyToClipboard = () => {
    Clipboard.setString(userId);
    Toast('User ID copied to clipboard');
  };

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
  const handleItemClick = async item => {
    setSelectedRoute(item.name);

    switch (item.name) {
      case 'Connections':
        navigation.navigate('Connection');
        break;
      case 'Membership':
      case 'Payment Method':
      case 'Upgrade to Pro':
        navigation.navigate('MembershipPlan');
        break;
      case 'Account Setting':
        navigation.navigate('AccountSettingsScreen');
        break;
      case 'Privacy & Policy':
        navigation.navigate('PrivacyPolicyScreen');
        break;
      case 'My Account':
        navigation.navigate('ProfileUpdateScreen');
        break;
      case 'Log Out':
        await handleLogout();
        break;
      default:
        console.log('Unknown route:', item.name);
    }
  };

  const handleLogout = async () => {
    try {
      await AsyncStorage.removeItem('AccessToken');
      await AsyncStorage.removeItem('loginToken');
      await auth().signOut();
      Toast('Logged Out Successfully');
      resetToInitialScreen();
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  const displayUserId = userId.replace(/\D/g, '').slice(-8);

  return (
    <ScrollView
      style={style.container}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.dark.primary]}
        />
      }>
      <DrawerContentScrollView {...props}>
        <View style={style.contentContainer}>
          <View style={style.nameHolder}>
            <View style={style.avatarContainer}>
              {userImage !== '' ? (
                <Image
                  source={{uri: userImage}}
                  style={{width: 50, height: 50, borderRadius: 25}}
                />
              ) : (
                <ProfileAvatar extraStyle={{container: STYLES.bR(25)}} />
              )}
              {isOnline && <View style={style.onlineDot}></View>}
            </View>
            <Space mL={10} />
            <View style={{height: 40, maxWidth: 100}}>
              <Text style={{color: 'black'}} numberOfLines={1} width={'70%'}>{userName}</Text>
              {/* <Text style={{color:'black'}}>{userProfession}</Text> */}
              <TouchableOpacity
                onPress={copyToClipboard}
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  style={{
                    width: 70,
                    color: 'black',
                    fontSize: 12,
                    backgroundColor: 'rgba(0, 0, 0, 0.05)',
                    borderColor: 'rgba(0, 0, 0, 0.05)',
                    borderWidth: 1,
                    borderRadius: 10,
                  }}>
                  {displayUserId}
                  <Svg
                    width="11"
                    height="11"
                    viewBox="0 0 8 11"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg">
                    <Path
                      d="M7.06835 4.24266C7.0671 3.0135 7.04877 2.37683 6.69085 1.941C6.62178 1.8567 6.5446 1.77939 6.46044 1.71016C6.00002 1.3335 5.31669 1.3335 3.95002 1.3335C2.58335 1.3335 1.90002 1.3335 1.44002 1.71058C1.35585 1.77981 1.27868 1.85712 1.2096 1.94141C0.83252 2.40016 0.83252 3.0835 0.83252 4.45016C0.83252 5.81683 0.83252 6.50016 1.21002 6.95975C1.27946 7.04419 1.35627 7.121 1.44044 7.19016C1.87669 7.5485 2.51335 7.56683 3.74252 7.56766"
                      stroke="#949494"
                      stroke-width="0.625"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <Path
                      d="M5.84518 4.26059L7.08101 4.24268M5.83934 9.66768L7.07518 9.64976M9.15518 6.34268L9.14351 7.57601M3.75434 6.34851L3.74268 7.58184M4.78643 4.26059C4.43976 4.32268 3.88226 4.38643 3.75434 5.10393M8.12309 9.64976C8.47101 9.59268 9.02893 9.53726 9.16809 8.82226M8.12309 4.26059C8.46976 4.32268 9.02726 4.38643 9.15518 5.10393M4.79184 9.64893C4.44476 9.58726 3.88768 9.52351 3.75934 8.80601"
                      stroke="#949494"
                      stroke-width="0.625"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </Svg>
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity
            style={{
              paddingVertical: 10,
              paddingHorizontal: 20,
              borderRadius: 30,
              borderWidth: 1,
              borderColor: '#ff6600',
              backgroundColor: 'white',
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              navigation.dispatch(DrawerActions.closeDrawer());
              setModalVisible(true);
            }}>
            <Text
              style={{
                color: '#ff6600',
                fontSize: 10,
                fontWeight: 'bold',
              }}>
              Upgrade Now
            </Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            height: 2,
            width: '100%',
            backgroundColor: '#E5E5E5',
            marginVertical: 10,
          }}
        />

        {DrawerListData.map(route => {
          if (route.name === 'Home') {
            return null;
          }
          <Space mT={10} />;
          if (route.name === 'Active Status') {
            return (
              <TouchableOpacity
                key={route.key}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 10,
                  paddingHorizontal: 10,
                  marginHorizontal: 20,
                }}>
                <CustomImage
                  source={route.iconName}
                  size={25}
                  resizeMode={'contain'}
                />
                <Space mL={10} />
                <View style={{flex: 1}}>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}>
                    <AppText
                      title={route.name}
                      variant={'h6'}
                      extraStyle={style.drawerItemText}
                      color={COLORS.dark.black}
                    />
                  </View>
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
                  style={{maxWidth: '90%'}}
                  onPress={() => {
                    handleItemClick(route);
                  }}>
                  <AppText
                    title={'My Account'}
                    variant={'h6'}
                    extraStyle={style.drawerItemText}
                    color={COLORS.dark.black}
                    onPress={() => navigation.navigate('EditProfileScreen')}
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
                <Image
                  source={require('../../assets/images/logout.png')}
                  style={{width: 25, height: 25}}
                />
                <Space mL={10} />
                <View
                  style={{maxWidth: '90%'}}
                  onPress={() => {
                    handleItemClick(route);
                  }}>
                  <AppText
                    title={route.name}
                    variant={'h6'}
                    extraStyle={[style.drawerItemText, {color: 'red'}]}
                    color={COLORS.dark.black}
                    onPress={() => {
                      handleItemClick(route);
                    }}
                  />
                </View>
              </TouchableOpacity>
            );
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
                style={{maxWidth: '90%'}}
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
              </View>
            </TouchableOpacity>
          );
        })}
        <Space mT={10} />
        <View style={style.upgradeCard}>
          <AppText
            title={'Upgrade to Pro'}
            variant={'h2'}
            extraStyle={{
              alignSelf: 'flex-start',
              left: 20,
              top: 10,
              fontWeight: '600',
              fontFamily: Fonts.PoppinsSemiBold,
            }}
            onPress={openModal}
            color={COLORS.dark.black}
          />
          <AppText
            title={'More features, more visibility!'}
            color={COLORS.dark.black}
            variant={'h5'}
            extraStyle={{
              alignSelf: 'flex-start',
              top: 20,
              left: 20,
              fontFamily: Fonts.PoppinsRegular,
            }}
          />
          <Space mT={30} />
          <TouchableOpacity
            onPress={openModal}
            style={{
              backgroundColor: COLORS.dark.primary,
              width: '80%',
              height: 40,
              alignSelf: 'center',
              borderRadius: 20,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Image
              source={IMAGES.space}
              style={{width: 20, height: 20, resizeMode: 'contain'}}
              resizeMode={'contain'}
            />
            <Text
              style={{
                color: COLORS.dark.white,
                fontFamily: Fonts.PoppinsSemiBold,
                left: 5,
              }}>
              Upgrade Now
            </Text>
          </TouchableOpacity>
        </View>
        <Space mT={50} />
        <View style={{flex: 1}}>
          <Modal
            animationType="fade"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => setModalVisible(false)}>
            <View
              style={{
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                backgroundColor: 'rgba(0, 0, 0, 0.3)', // Slight fade background
              }}>
              <View
                style={{
                  width: '90%',
                  backgroundColor: 'white',
                  borderRadius: 10,
                  paddingVertical: 20,
                  paddingHorizontal: 25,
                  shadowColor: '#000',
                  shadowOffset: {width: 0, height: 2},
                  shadowOpacity: 0.25,
                  shadowRadius: 4,
                  elevation: 5,
                  position: 'relative', // For positioning the close icon
                }}>
                {/* Close Icon */}
                <TouchableOpacity
                  style={{
                    position: 'absolute',
                    top: 10,
                    right: 10,
                    padding: 5,
                  }}
                  onPress={() => setModalVisible(false)}>
                  <Text style={{fontSize: 16, color: '#666'}}>X</Text>
                </TouchableOpacity>

                <Text
                  style={{
                    fontSize: 18,
                    fontWeight: '600',
                    textAlign: 'left', // Left-aligned text for title
                    color:'black'
                  }}>
                  Upgrade Membership
                </Text>

                {/* Horizontal line */}
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: '#ccc',
                    marginVertical: 10,
                  }}
                />

                <Text
                  style={{
                    fontSize: 15,
                    textAlign: 'left', // Left-aligned description text
                    marginBottom: 25,
                    color: '#666',
                  }}>
                  Become a premium member to view contacts of this profile
                </Text>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    width: '100%',
                  }}>
                  <TouchableOpacity
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      marginHorizontal: 5,
                      borderRadius: 30, // Rounded corners for buttons
                      backgroundColor: '#FFF',
                      borderWidth: 1,
                      borderColor: '#ccc',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => setModalVisible(false)}>
                    <Text style={{color: '#666', fontSize: 16}}>Cancel</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={{
                      flex: 1,
                      paddingVertical: 12,
                      marginHorizontal: 5,
                      borderRadius: 30, // Rounded corners for buttons
                      backgroundColor: '#ff6600',
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                    onPress={() => {
                      setModalVisible(false);
                      navigation.navigate('MembershipPlan');
                    }}>
                    <Text
                      style={{
                        color: 'white',
                        fontSize: 16,
                        fontWeight: 'bold',
                      }}>
                      Upgrade Now
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </Modal>
        </View>
      </DrawerContentScrollView>
    </ScrollView>
  );
};

export default CustomDrawerContent;
