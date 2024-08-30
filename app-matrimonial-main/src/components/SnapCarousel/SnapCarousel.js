import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  Text,
  ActivityIndicator,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Fonts} from '../../assets/fonts';
import {IMAGES} from '../../assets/images';
import {SVG} from '../../assets/svg';
import {COLORS, STYLES} from '../../assets/theme';
import {LABELS} from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';
import {useNavigation} from '@react-navigation/native';
import {styles} from './styles';
import {
  subscriptionCheck,
  checkLiveChatAvailability,
} from '../../utils/subscriptionCheck';
import {Toast} from '../../utils/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../constant';
import {Button} from 'react-native-elements';

const SnapCarousel = ({data}) => {
  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);
  const style = styles;
  const [currentUser, setCurrentUser] = useState({});
  const [loadingViewProfile, setLoadingViewProfile] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('theUser');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      }
    };

    fetchUser();
  }, []);

  async function addToRecentlyViewed(viewedUserId) {
    const apiUrl = `${API_URL}/user/recentlyViewed`;
    const token = await AsyncStorage.getItem('AccessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: viewedUserId,
        }),
      });

      if (!response.ok) {
        let errorMessage =
          'An error occurred while adding user to recently viewed';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {
          errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      return {
        success: true,
        message: 'User added to recently viewed successfully!',
        data: data,
      };
    } catch (error) {
      console.error('Error adding user to recently viewed:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        error: error,
      };
    }
  }

  const renderItem = ({item}) => (
    <>
      <View style={style.slideContainer}>
        <Image source={{uri: item.userImages?.[0]}} style={style.image} />
        <LinearGradient
          colors={['transparent', COLORS.dark.secondary]}
          style={style.gradient}>
          <View style={style.headerContainer}>
            <TouchableOpacity style={style.headerBtn1}>
              <AppText
                title={LABELS.new}
                color={COLORS.dark.white}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
              />
            </TouchableOpacity>
            {item.isVerified && (
              <TouchableOpacity style={style.verifyBtn}>
                <CustomImage source={IMAGES.verifyIcon} size={12} />
              </TouchableOpacity>
            )}
          </View>

          <View style={style.nameContainer}>
            <AppText
              title={item.name}
              variant={'h3'}
              color={'white'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
            />
          </View>
          <View style={style.locationCont}>
            <View>
              <AppText
                title={[`Age ${item.age} , `, item.height]}
                variant={'h6'}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                color={'white'}
              />
            </View>
            <View style={style.locationIcon}>
              <Icon
                SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
              />
              <Space mL={5} />
              <AppText
                title={item.city}
                variant={'h6'}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                color={'white'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              top: 60,
            }}>
            <CustomImage source={IMAGES.briefcaseColored} size={14} />
            <Space mL={5} />
            <AppText
              title={item.occupation}
              variant={'h5'}
              color={'white'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
            />
          </View>
          <Pagination
            dotsLength={data.length}
            activeDotIndex={activeSlide}
            containerStyle={style.paginationContainer}
            dotStyle={style.dotStyle}
            inactiveDotStyle={style.inactiveDotStyle}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
          />
        </LinearGradient>
      </View>
      <Space mT={20} />
    </>
  );

  const handleSendInterest = async () => {
    setLoadingViewProfile(true);
    const currentItem = data[activeSlide];
    const isSubscribed = await subscriptionCheck(currentItem);
    if (isSubscribed) {
      await addToRecentlyViewed(currentItem?._id);
      navigation.navigate('UserDetailsScreen', {userId: currentItem?._id});
    } else {
      Toast('Your profile view limit exceeded.');
    }
    setLoadingViewProfile(false);
  };

  const handleChat = async () => {
    setLoadingChat(true);
    const currentItem = data[activeSlide];
    const isSubscribed = await checkLiveChatAvailability(
      JSON.parse(await AsyncStorage.getItem('theUser')),
    );
    if (isSubscribed) {
      navigation.navigate('ChatScreen', {
        userId: currentItem?._id,
        roomId: `${currentItem?._id}_${currentUser.user._id}`,
        user: currentItem,
      });
    } else {
      Toast("You can't chat buy premium plan");
    }
    setLoadingChat(false);
  };

  return (
    <View style={style.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <View style={style.btnContainer}>
        <TouchableOpacity
          style={style.btnOptionsCont}
          onPress={handleSendInterest}
          disabled={false}>
          {loadingViewProfile ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <TouchableOpacity
              onPress={handleSendInterest}
              style={styles.ButtonContainer}>
              <Image
                source={IMAGES.sendIcon} 
                style={styles.imageStyle}
              />

              <View style={{marginLeft: 10}} />

              <Text style={{color:"white"}}>Send Interest</Text>
            </TouchableOpacity>
          )}
        </TouchableOpacity>

        <TouchableOpacity
          style={style.chatBtn}
          onPress={handleChat}
          disabled={false}>
          {loadingChat ? (
            <ActivityIndicator size="large" color="#fff" />
          ) : (
            <TouchableOpacity
            onPress={handleSendInterest}
            style={styles.ButtonContainer}>
            <Image
              source={IMAGES.chatIcon}
              style={styles.imageStyle}
            />

            <View style={{marginLeft: 10}} />

            <Text style={{color:"white"}}>Chat</Text>
          </TouchableOpacity>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SnapCarousel;
