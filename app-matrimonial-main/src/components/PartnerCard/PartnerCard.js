import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { SVG } from '../../assets/svg';
import { COLORS, STYLES } from '../../assets/theme';
import { LABELS } from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import { subscriptionCheck, checkLiveChatAvailability } from '../../utils/subscriptionCheck';
import { Toast } from '../../utils/native';
import {API_URL} from '../../../constant';


const PartnerCard = ({ data }) => {
  const navigation = useNavigation();
  const [currentUser, setCurrentUser] = useState({});

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

  const handleSendInterest = async (item) => {
    try {
      addToRecentlyViewed(item?._id);
      if (await subscriptionCheck(item)) {
        navigation.navigate('UserDetailsScreen', { userId: item?._id });
      } else {
        Toast("Your profile view limit exceeded.");
      }
    } catch (error) {
      console.error('Error in handleSendInterest:', error);
      Toast("An error occurred. Please try again.");
    }
  };

  const handleChatBtnClick = async (item) => {
    try {
      const canChat = await checkLiveChatAvailability(item);
      if (canChat) {
        navigation.navigate('ChatScreen', { 
          userId: item?._id, 
          roomId: `${item?._id}_${currentUser.user._id}`, 
          user: item 
        });
      } else {
        Toast("You can't chat. Please buy premium.");
      }
    } catch (error) {
      console.error('Error checking chat availability:', error);
      Toast("An error occurred. Please try again.");
    }
  };

  const renderCard = (item, index) => (
    <View style={styles.cardContainer} key={`${item._id}_${index}`}>
      <View style={styles.imageContainer}>
        <Image
          source={{
            uri: item.userImages && item.userImages.length > 0
              ? item.userImages[0]
              : item?.gender === 'male'
                ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                : item?.gender === 'female'
                  ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg'
                  : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
          }}
          style={styles.profileImage}
        />
        <View style={styles.newTag}>
          <AppText title="New" extraStyle={styles.newText} />
        </View>
        {item.isVerified && (
          <View style={styles.verifiedIcon}>
            <CustomImage source={IMAGES.verifyIcon} size={24} resizeMode="contain" />
          </View>
        )}
        <LinearGradient
          colors={['transparent', COLORS.dark.secondary]}
          style={styles.gradientOverlay}
        />
      </View>
      <View style={styles.infoContainer}>
        <View style={styles.nameLocationContainer}>
          <AppText
            title={item?.name || 'N/A'}
            variant="h6"
            numberOfLines={1}
            width="70%"
            color={COLORS.dark.black}
          />
          <View style={styles.locationContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
              />
              <AppText
                title={item.city || 'N/A'}
                color={COLORS.dark.black}
                numberOfLines={1}
                width="70%"
                extraStyle={[Fonts.PoppinsRegular, styles.locationText]}
              />
            </View>
          </View>
        </View>
        <View style={styles.ageHeightActionContainer}>
          <AppText
            title={`Age ${item?.age || 'N/A'}, ${item.height}`}
            color={'gray'}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.fontSize(11),
              styles.detailsText
            ]}
          />
        </View>
        <AppText
          title={item?.occupation || 'N/A'}
          color={'gray'}
          numberOfLines={1}
          extraStyle={[
            STYLES.fontFamily(Fonts.PoppinsRegular),
            STYLES.fontSize(11),
            styles.occupationText,
          ]}
        />
        <View style={styles.actionContainer}>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleSendInterest(item)}
          >
            <CustomImage
              source={IMAGES.sendIcon}
              size={10}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.actionButton}
            onPress={() => handleChatBtnClick(item)}
          >
            <CustomImage source={IMAGES.chatIcon} size={10} />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );

  return (
    <View style={styles.parentContainer}>
      {/* <View style={styles.textContainer}>
        <AppText
          title={'Suggested for you'}
          variant="h3"
          color="black" 
          extraStyle={[STYLES.fontFamily(Fonts.PoppinsSemiBold)]}
        />
        <TouchableOpacity 
          style={styles.linkContainer} 
          onPress={() => navigation.navigate('SuggestedUsersPage')}
        >
          <AppText
            title={'See all'}
            variant={'h5'}
            extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
            color={COLORS.dark.primary}
          />
          <View>
            <Icon
              SVGIcon={
                <SVG.vectorIcon
                  fill={COLORS.dark.primary}
                  iconLeft={true}
                  height={'10'}
                  width={'10'}
                /> 
              }
            />
          </View>
        </TouchableOpacity>
      </View> */}

      <View style={styles.gridContainer}>
        {data?.map((item, index) => renderCard(item, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  parentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
    marginBottom: 10,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gridContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 5,
  },
  cardContainer: {
    width: '48%',
    height: 190,
    backgroundColor: COLORS.dark.white,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
  },
  ageHeightActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
    marginLeft: -10,  
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.dark.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  newText: {
    color: COLORS.dark.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  infoContainer: {
    padding: 15,
  },
  nameLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: -10,
    marginLeft: -12,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
    marginLeft: -3,
  },
  detailsText: {
    flex: 1,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    paddingTop: 10,
  },
  actionButton: {
    width: 23,
    height: 23,
    borderRadius: 20,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    marginLeft: 5,
  },
  occupationText: {
    marginLeft: -10,
    marginBottom: -17,
    width: '70%',
  },
});

export default PartnerCard;