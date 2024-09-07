import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Image, StyleSheet } from 'react-native';
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
import Space from '../Space/Space';
import { subscriptionCheck, checkLiveChatAvailability } from '../../utils/subscriptionCheck';
import { Toast } from '../../utils/native';

const HorizontalCard = ({ data }) => {
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

  const handleSendInterest = async (item) => {
    try {
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
            variant="h5"
            color={COLORS.dark.black}
          />
          <View style={styles.locationContainer}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Icon
                SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
              />
              <AppText
                title={item.city || 'N/A'}
                color={COLORS.dark.inputBorder}
                extraStyle={[Fonts.PoppinsRegular, styles.locationText]}
              />
            </View>
          </View>
        </View>
        <View style={styles.ageHeightActionContainer}>
          <AppText
            title={`Age ${item?.age || 'N/A'}, ${item.height}`}
            color={COLORS.dark.inputBorder}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.fontSize(11),
              styles.detailsText
            ]}
          />
        </View>
        <AppText
          title={item?.occupation || 'N/A'}
          color={COLORS.dark.inputBorder}
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
      <View style={styles.textContainer}>
        <AppText
          title={LABELS.recentlyViewed}
          variant="h3"
          extraStyle={[STYLES.fontFamily(Fonts.PoppinsSemiBold)]}
        />
        <TouchableOpacity 
          style={styles.linkContainer} 
          onPress={() => navigation.navigate('PartnerMatch')}
        >
          <AppText
            title={LABELS.seeMore}
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
      </View>

      <ScrollView
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        style={styles.horizontalScrollContainer}
      >
        {data?.map((item, index) => (
          <React.Fragment key={`${item._id}_${index}`}>
            {renderCard(item, index)}
            <Space mL={10} />
          </React.Fragment>
        ))}
      </ScrollView>
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
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalScrollContainer: {
    width: '100%',
    height: 210,
  },
  cardContainer: {
    width: 170,
    height: 190,
    backgroundColor: COLORS.dark.white,
    borderRadius: 15,
    elevation: 5,
    marginTop: 10,
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
  professionLabel: {
    position: 'absolute',
    bottom: 10,
    alignSelf: 'center',
    zIndex: 2,
    fontSize: 13,
    fontFamily: Fonts.PoppinsRegular,
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
    marginLeft: 5,
  },
  detailsText: {
    flex: 1,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 17,
    height: 17,
    borderRadius: 20,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    marginLeft: 10,
  },
  occupationText: {
    marginLeft: -10,
    marginBottom: -17,
    width: '70%',
  },
});

export default HorizontalCard;