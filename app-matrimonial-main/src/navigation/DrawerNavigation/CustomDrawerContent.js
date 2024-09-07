import {DrawerContentScrollView,DrawerItemList} from '@react-navigation/drawer';
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
import { useNavigation ,DrawerActions} from '@react-navigation/native';

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
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'InitialScreen'}],
      }),
    );
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
            <View style={{height: 30, marginBottom: 10, maxWidth: 180}}>
              <AppText
                title={userName}
                variant={'h6'}
                extraStyle={{fontFamily: Fonts.PoppinsSemiBold}}
              />
              <AppText title={userProfession} color={COLORS.dark.inputBorder} />
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
              }}
            >Upgrade Now</Text>

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
