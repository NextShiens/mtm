import React, {useState, useEffect} from 'react';
import {
  Dimensions,
  Image,
  TouchableOpacity,
  View,
  ActivityIndicator,
  StyleSheet,
} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {BlurView} from '@react-native-community/blur';

// Assume these are imported from their respective files
import {Fonts} from '../../assets/fonts';
import {IMAGES} from '../../assets/images';
import {SVG} from '../../assets/svg';
import {COLORS, STYLES} from '../../assets/theme';
import {LABELS} from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';
import {
  subscriptionCheck,
  checkLiveChatAvailability,
} from '../../utils/subscriptionCheck';
import {Toast} from '../../utils/native';
import {API_URL} from '../../../constant';

const screenWidth = Dimensions.get('window').width;

const SnapCarousel = ({data}) => {
  const navigation = useNavigation();
  const [activeSlide, setActiveSlide] = useState(0);
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

  const renderItem = ({item, index}) => (
    <View style={styles.slideContainer}>
      {item.userImages && item.userImages[index] ? (
        <Image source={{uri: item.userImages[index]}} style={styles.image} />
      ) : (
        <Image
          source={{
            uri:
              item?.gender === 'male'
                ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                : item?.gender === 'female'
                ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg'
                : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
          }}
          resizeMode="cover"
          style={styles.image}
        />
      )}
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.1)']}
        style={styles.gradient}>
        <View style={styles.headerContainer}>
          <TouchableOpacity style={styles.headerBtn1}>
            <AppText
              title={LABELS.new}
              color={COLORS.dark.white}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
            />
          </TouchableOpacity>
          {item.isVerified && (
            <TouchableOpacity style={styles.verifyBtn}>
              <CustomImage source={IMAGES.verifyIcon} size={12} />
            </TouchableOpacity>
          )}
        </View>

        <View style={styles.textContainer}>
          <View style={styles.blurredBackground}>
            <AppText
              title={item.name}
              variant={'h3'}
              color={'white'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
            />
            <View style={styles.locationCont}>
              <AppText
                title={`Age ${item.age}, ${item.height}` || 'undefined'}
                variant={'h6'}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                color={'white'}
              />
              {/* <View style={styles.locationIcon}>
                <Icon
                  SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
                />
                <Space mL={5} />
                <AppText
                  title={item.city || 'undefined'}
                  variant={'h6'}
                  extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                  color={'white'}
                />
              </View> */}
            </View>
            <View style={styles.occupationContainer}>
              <CustomImage source={IMAGES.briefcaseColored} size={14} />
              <Space mL={5} />
              <AppText
                title={item.occupation || 'undefined'}
                variant={'h5'}
                color={'white'}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              />
            </View>
          </View>
        </View>
      </LinearGradient>

      <View style={styles.cityContainer}>
        <Icon
          SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
          style={{marginRight: 8}} 
        />
        <AppText
          title={item.city || 'undefined'}
          variant={'h6'}
          extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
          color={'white'}
        />
      </View>

      <View style={styles.bottomRightButtonsContainer}>
        <TouchableOpacity
          style={styles.bottomRightButton}
          onPress={handleSendInterest}
          disabled={loadingViewProfile}>
          {loadingViewProfile ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Image
              source={IMAGES.sendIcon}
              style={styles.bottomRightButtonIcon}
            />
          )}
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.bottomRightButton}
          onPress={handleChat}
          disabled={loadingChat}>
          {loadingChat ? (
            <ActivityIndicator size="small" color="#fff" />
          ) : (
            <Image
              source={IMAGES.chatIcon}
              style={styles.bottomRightButtonIcon}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
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
    <View style={styles.container}>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth - 40}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={styles.paginationContainer}
        dotStyle={styles.dotStyle}
        inactiveDotStyle={styles.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
  },
  slideContainer: {
    width: screenWidth - 40,
    height: 280,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'fit',
    borderRadius: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    justifyContent: 'flex-end',
    borderRadius: 10,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    position: 'absolute',
    top: 20,
    left: 15,
    right: 15,
  },
  headerBtn1: {
    height: 28,
    paddingHorizontal: 10,
    justifyContent: 'center',
    backgroundColor: COLORS.dark.primary,
    borderRadius: 15,
    alignItems: 'center',
  },
  verifyBtn: {
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    // paddingHorizontal: 15,
    // paddingBottom: 20,
  },
  blurredBackground: {
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    borderRadius: 10,
    padding: 12,
  },
  locationCont: {
    flexDirection: 'column',
    marginBottom: 5,
  },
  locationIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  occupationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 5,
  },
  cityContainer: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    zIndex: 1000,
    borderRadius: 10,
    padding: 5,
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomRightButtonsContainer: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    flexDirection: 'row',
    zIndex: 1000,
  },
  bottomRightButton: {
    height: 30,
    width: 30,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 20,
    marginLeft: 10,
  },
  bottomRightButtonIcon: {
    width: 15,
    height: 15,
  },
  paginationContainer: {
    paddingVertical: 8,
  },
  dotStyle: {
    width: 12,
    marginHorizontal: -5,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.dark.primary,
  },
  inactiveDotStyle: {
    width: 12,
    height: 10,
    borderRadius: 10,
    backgroundColor: COLORS.dark.gray,
  },
});

export default SnapCarousel;