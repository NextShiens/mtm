import {DrawerContentScrollView} from '@react-navigation/drawer';
import React, {useState} from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
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

const CustomDrawerContent = ({props, navigation}) => {
  const [isOnline, setIsOnline] = useState(true);
  const [drawerData, setDrawerData] = useState(DrawerListData);
  const [selectedRoute, setSelectedRoute] = useState('User Name');
  const style = styles;
  const windowWidth = Dimensions.get('window').width;

  const handleItemClick = item => {
    setSelectedRoute(item.name);
    if (item.name == 'Connections') {
      navigation.navigate('Connection');
    }
    if (item.name == 'Membership') {
      navigation.navigate('MembershipPlan');
    }
    if (item.name == 'Payment Method') {
      navigation.navigate('PaymentScreen');
    }
    if (item.name == 'Log Out') {
      const logout = async () => {
        await AsyncStorage.removeItem('AccessToken');
        Toast('Logged Out Successfully');
        navigation.navigate('InitialScreen');
      };

      logout();
      // auth()
      //   .signOut()
      //   .then(async () => {
      //     await AsyncStorage.removeItem('loginToken');
      //     navigation.navigate('InitialScreen');
      //   })
      //   .catch(err => {
      //     console.log(err);
      //   });
    }
  };
  return (
    <View style={style.container}>
      <DrawerContentScrollView {...props}>
        <View style={style.contentContainer}>
          <View style={style.nameHolder}>
            <View style={style.avatarContainer}>
              <CustomImage
                source={IMAGES.profileAvatar}
                size={50}
                extraStyle={{container: STYLES.bR(25)}}
              />
              {isOnline && <View style={style.onlineDot}></View>}
            </View>
            <Space mL={10} />
            <View style={{height: 25, marginBottom: 10}}>
              <AppText
                title={LABELS.exampleName}
                variant={'h4'}
                extraStyle={{fontFamily: Fonts.PoppinsSemiBold}}
              />
              <AppText
                title={LABELS.businessMan}
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
            style={{width: '20%', position: 'absolute', right: 20, top: 10}}>
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
