import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
} from 'react-native';
import { useRoute } from '@react-navigation/native';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, STYLES } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import { Toast } from '../../../utils/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';
import { SvgXml } from 'react-native-svg';

const defaultProfileSvg = `
   <Svg height={size} width={size} viewBox="0 0 100 100">
      <Circle cx="50" cy="50" r="50" fill={backgroundColor} />
      <Path
        d="M50 48C58.8366 48 66 40.8366 66 32C66 23.1634 58.8366 16 50 16C41.1634 16 34 23.1634 34 32C34 40.8366 41.1634 48 50 48ZM50 54C39.3178 54 18 59.3178 18 70V76C18 79.3137 20.6863 82 24 82H76C79.3137 82 82 79.3137 82 76V70C82 59.3178 60.6822 54 50 54Z"
        fill={iconColor}
      />
    </Svg>
`;

const UserDetailsScreen = ({ navigation }) => {
  const route = useRoute();
  const userId = route.params?.userId || '';
  const screenWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = React.useState(0);
  const [userDetails, setUserDetails] = React.useState({});
  const style = styles;
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
  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/userDetails/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserDetails(data.user);
      } catch (error) {
        console.error("Failed to fetch user details:", error);
      }
    };

    fetchUserDetails();
  }, [userId]);
  async function saveUser() {
    const apiUrl = `${API_URL}/user/saveUser`;
    const token = await AsyncStorage.getItem('AccessToken');
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ userId: userId })
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'An error occurred while saving user');
      }
      const data = await response.json();
      Toast('User saved successfully!');
    } catch (error) {
      console.error('Error saving user:', error);
      Toast('An unexpected error occurred');
    }
  }

  async function sendInterest() {
    const apiUrl = `${API_URL}/user/sendInterest`;
    const token = await AsyncStorage.getItem('AccessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          receiverId: userId
        })
      });

      if (!response.ok) {
        let errorMessage = 'An error occurred while sending interest';
        try {
          const errorData = await response.json();
          errorMessage = errorData.message || errorMessage;
        } catch (e) {

          errorMessage = response.statusText;
        }
        throw new Error(errorMessage);
      }

      const data = await response.json();
      Toast('Interest sent successfully!');
      return {
        success: true,
        message: 'Interest sent successfully!',
        data: data
      };
    } catch (error) {
      console.error('Error sending interest:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        error: error
      };
    }
  }

  const carouselData = [
    {
      id: '0',
      name: userDetails.name || 'N/A',
      age: userDetails.age || 'N/A',
      height: userDetails.height || 'N/A',
      occupation: userDetails.occupation || 'N/A',
      location: userDetails.city || 'N/A',
      isVerified: userDetails.isActive || false,
      userStatus: userDetails.isPaid ? 'Premium' : 'Free',
      img: userDetails.userImages?.[0] || <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />,
      category: 'Profile'
    },
    {
      id: '1',
      name: userDetails.name || 'N/A',
      age: userDetails.age || 'N/A',
      height: userDetails.height || 'N/A',
      occupation: userDetails.occupation || 'N/A',
      location: userDetails.workLocation || 'N/A',
      isVerified: userDetails.isActive || false,
      userStatus: userDetails.isPaid ? 'Premium' : 'Free',
      img: userDetails.userImages?.[1] || <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />,
      category: 'Work'
    },
    {
      id: '2',
      name: userDetails.name || 'N/A',
      age: userDetails.age || 'N/A',
      height: userDetails.height || 'N/A',
      occupation: userDetails.occupation || 'N/A',
      location: userDetails.city || 'N/A',
      isVerified: userDetails.isActive || false,
      userStatus: userDetails.isPaid ? 'Premium' : 'Free',
      img: userDetails.userImages?.[2] || <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />,
      category: 'Education'
    },
    {
      id: '3',
      name: userDetails.name || 'N/A',
      age: userDetails.age || 'N/A',
      height: userDetails.height || 'N/A',
      occupation: userDetails.occupation || 'N/A',
      location: userDetails.city || 'N/A',
      isVerified: userDetails.isActive || false,
      userStatus: userDetails.isPaid ? 'Premium' : 'Free',
      img: userDetails.userImages?.[3] || <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />,
      category: 'Religion'
    },
  ];
  const renderItem = ({ item, index }) => (
    <View style={style.slideContainer}>
      {userDetails.userImages && userDetails.userImages[index] ? (
        <Image source={{ uri: userDetails.userImages[index] }} style={style.image} />
      ) : (
        <View style={[style.image, { backgroundColor: COLORS.dark.gray }]}>
          <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
        </View>
      )}
      <View style={style.gradient}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          textColor="white"
          iconRight={
            <TouchableOpacity
              style={style.rightIconContainer}
              onPress={async () => {
                await saveUser();
                navigation.navigate('SavedUserScreen');
              }}>
              <CustomImage
                source={IMAGES.savedIcon}
                size={18}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          }
          title={LABELS.matches}
          extraStyle={{
            container: { width: '100%' },
          }}
        />
      </View>
    </View>
  );

  return (
    <ScrollView style={[STYLES.bgColor(COLORS.dark.white)]}>
      <View style={style.container}>
        <View style={style.carouselContainer}>
          <Carousel
            data={carouselData}
            renderItem={renderItem}
            sliderWidth={screenWidth}
            itemWidth={screenWidth}
            onSnapToItem={index => setActiveSlide(index)}
          />
          <Pagination
            dotsLength={3}
            activeDotIndex={activeSlide}
            containerStyle={style.paginationContainer}
            dotStyle={style.dotStyle}
            inactiveDotStyle={style.inactiveDotStyle}
            inactiveDotOpacity={0.6}
            inactiveDotScale={0.6}
          />
        </View>

        <View style={style.contentContainer}>
          <View style={style.basicDetailsContainer}>
            <Space mT={20} />
            <AppText
              title={userDetails?.name || 'N/A'}
              variant={'h3'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsSemiBold)}
            />
            <AppText
              title={userDetails?.occupation || 'N/A'}
              variant={'h5'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            <Space mT={13} />
            <AppText
              title={userDetails.description || 'This user prefers to keep an air of mystery about them.'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            <Space mT={13} />
            <AppText
              title={userDetails?.city || 'N/A'}
              variant={'h5'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            <Space mT={20} />

            <View
              style={{
                backgroundColor: COLORS.dark.lightGrey,
                height: 1,
              }}></View>
            <Space mT={20} />
            <AppText
              title={LABELS.basicInfo}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
          </View>
          <Space mT={12} />
          <View style={style.basicInfoContainer}>
            <View style={style.infoCont1}>
              <AppText
                title={LABELS.name}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.name || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />

              <AppText
                title={LABELS.maritalStatus}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.maritalStatus || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />

              <AppText
                title={LABELS.height}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.height || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
              <AppText
                title={LABELS.profileCreatedFor}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.profileCreatedFor || 'Self'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
            </View>

            <View style={style.infoCont2}>
              <View style={style.infoCont1}>
                <AppText
                  title={LABELS.age}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.age || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />

                <AppText
                  title={LABELS.Gender}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.gender || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />

                <AppText
                  title={LABELS.cast}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.sect || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />
                <AppText
                  title={LABELS.disability}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.disability || 'No'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Space mT={20} />
              </View>
            </View>
          </View>

          <View style={{ paddingHorizontal: 10 }}>
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.dark.lightGrey,
              }}></View>
            <Space mT={20} />

            <AppText
              title={LABELS.contactDetails}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />

            <Space mT={17} />
            <View style={{ flexDirection: 'row' }}>
              <View style={{ width: '50%' }}>
                <AppText
                  title={LABELS.phoneNumber}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.phone || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
              </View>
              <View style={{ width: '50%' }}>
                <AppText
                  title={LABELS.email}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <AppText
                  title={userDetails?.email || 'N/A'}
                  variant={'h4'}
                  color={COLORS.dark.black}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
              </View>
            </View>
            <Space mT={20} />
            <View
              style={{
                height: 1,
                backgroundColor: 'lightgrey',
                width: '100%',
              }}></View>
            <Space mT={15} />
            <AppText
              title={LABELS.locationInfo}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <Space mT={15} />
            <AppText
              title={LABELS.presentAddress}
              variant={'h4'}
              color={COLORS.dark.gray}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <AppText
              title={userDetails?.city + ', India' || 'N/A'}
              variant={'h4'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <Space mT={20} />
            <AppText
              title={LABELS.PreminentAddress}
              variant={'h4'}
              color={COLORS.dark.gray}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <AppText
              title={userDetails?.city + ', India' || 'N/A'}
              variant={'h4'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
            <Space mT={20} />
            <View
              style={{
                height: 1,
                width: '100%',
                backgroundColor: COLORS.dark.lightGrey,
              }}></View>
            <Space mT={20} />
            <AppText
              title={LABELS.educationCareer}
              variant={'h3'}
              color={COLORS.dark.inputBorder}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
            />
          </View>
          <Space mT={10} />
          <View style={style.basicInfoContainer}>
            <View style={style.infoCont1}>
              <AppText
                title={LABELS.highestDegree}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.highestDegree || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.occupation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.occupation || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={10} />
            </View>

            <View style={style.infoCont2}>
              <AppText
                title={LABELS.employedIn}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.employedIn || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={10} />

              <AppText
                title={LABELS.AnnualIncome}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails?.annualIncome + ' INR' || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={10} />
            </View>
          </View>
        </View>

        <View style={{ width: '100%', paddingHorizontal: 15 }}>
          <View
            style={{
              height: 1,
              width: '100%',
              backgroundColor: COLORS.dark.lightGrey,
            }}></View>
          <Space mT={20} />
          <AppText
            title={LABELS.partnerExpectation}
            variant={'h3'}
            color={COLORS.dark.inputBorder}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
          />
          <Space mT={20} />
          <View style={{ width: '100%', flexDirection: 'row' }}>
            <View style={{ width: '60%' }}>
              <AppText
                title={LABELS.maritalExpectation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerMaritalStatus || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.age}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerAge || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.education}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.education || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />
              <AppText
                title={LABELS.motherToungue}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerMotherTongue || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>

            <View style={{ width: '40%' }}>
              <AppText
                title={LABELS.cast}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerSect || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.height}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerHeight || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />

              <AppText
                title={LABELS.occupation}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerOccupation || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={15} />
              <AppText
                title={LABELS.AnnualIncome}
                variant={'h4'}
                color={COLORS.dark.gray}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <AppText
                title={userDetails.partnerPreference?.partnerAnnualIncome || 'N/A'}
                variant={'h4'}
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>
          </View>
        </View>
        <Space mT={20} />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            paddingHorizontal: 20,
          }}>
          <TouchableOpacity
            style={{
              width: '80%',
              height: 50,
              backgroundColor: COLORS.dark.secondary,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 6,
            }}
            onPress={() => {
              sendInterest();
            }}>
            <CustomImage
              source={IMAGES.sendIcon}
              size={12}
              resizeMode={'contain'}
            />
            <Space mL={10} />
            <AppText
              title={'Send Interest'}
              color={'white'}
              variant={'h5'}
              extraStyle={{ fontFamily: Fonts.PoppinsRegular }}
            />
          </TouchableOpacity>
          <Space mL={10} />

          <TouchableOpacity
            onPress={() => {
              navigation.navigate('ChatScreen', { userId: userDetails?._id, roomId: `${userDetails?._id}_${currentUser.user._id}`, user: userDetails });
            }}
            style={{
              width: '15%',
              height: 50,
              backgroundColor: COLORS.dark.primary,
              justifyContent: 'center',
              alignItems: 'center',
              flexDirection: 'row',
              borderRadius: 6,
            }}>
            <CustomImage source={IMAGES.chatIcon} size={12} />
          </TouchableOpacity>
        </View>
        <Space mT={20} />
      </View>
    </ScrollView>
  );
};

export default UserDetailsScreen;
