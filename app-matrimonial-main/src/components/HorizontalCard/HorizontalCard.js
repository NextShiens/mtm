import React, {useState,useEffect} from 'react';
import { ScrollView, TouchableOpacity, View,Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { useNavigation } from '@react-navigation/native';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { SVG } from '../../assets/svg';
import { COLORS, STYLES } from '../../assets/theme';
import { LABELS } from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';
import { styles } from './styles';
import { subscriptionCheck, checkLiveChatAvailability } from '../../utils/subscriptionCheck';
import { Toast } from '../../utils/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

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
    console.log('item',item.userImages[0]),
    <View style={styles.cardContainer} key={`${item.key}_${index}`}>
      <View style={styles.imgContainer}>
        {item.userImages && item.userImages.length> 0 ? (
          <Image
            source={{ uri: item.userImages[0]}}
            resizeMode="contain"
            style={styles.img}
          />
        ) : (
          <Image
              source={{
                uri: item?.gender === 'male' 
                  ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                  :  item?.gender === 'female' 
                  ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg' 
                  : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
              }}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}} 
            />
        )}
        <AppText
          title={item.occupation}
          color="white"
          alignSelf="center"
          variant="h6"
          extraStyle={styles.professionLabel}
        />
        <LinearGradient
          colors={['transparent', COLORS.dark.secondary]}
          style={styles.gradientOverlay}
        />
      </View>
      <View style={styles.contentContainer}>
        <AppText
          title={item?.name|| 'N/A'}
          variant="h5"
          color={COLORS.dark.black}
          extraStyle={[Fonts.PoppinsMedium]}
        />
        <AppText
          title={`Age ${item?.age||'N/A'}, ${item.height}`}
          color={COLORS.dark.inputBorder}
          style={{
            fontSize: 4,
        
          }}
          extraStyle={[
            STYLES.fontFamily(Fonts.PoppinsRegular),
            STYLES.bottom('5%'),
            STYLES.fontSize(11),
            STYLES.mL(0)
          ]}
        />
        <View style={[STYLES.selfLeft, STYLES.gap, STYLES.row]}>
          <TouchableOpacity
            style={styles.sendIconBtn}
            onPress={() => handleSendInterest(item)}
          >
            <CustomImage
              source={IMAGES.sendIcon}
              size={11}
              resizeMode="contain"
            />
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.chatIconBtn}
            onPress={() => handleChatBtnClick(item)}
          >
            <CustomImage source={IMAGES.chatIcon} size={11} />
          </TouchableOpacity>
          {item.isVerified && (
            <TouchableOpacity style={styles.verifyIconBtn}>
              <CustomImage
                source={IMAGES.verifyIcon}
                size={11}
                resizeMode="contain"
              />
            </TouchableOpacity>
          )}
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
          <React.Fragment key={`${item.key}_${index}`}>
            {renderCard(item, index)}
            <Space mL={10} />
          </React.Fragment>
        ))}
      </ScrollView>
    </View>
  );
};

export default HorizontalCard;