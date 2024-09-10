import React, {useEffect, useState} from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Text,
  Modal,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {SvgXml} from 'react-native-svg';
import {Fonts} from '../../../assets/fonts';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import Icon from '../../../components/Icon/Icon';
import {styles} from './styles';
import {Toast} from '../../../utils/native';
import {API_URL} from '../../../../constant';
import {checkIsPaidUser} from '../../../utils/subscriptionCheck';


const defaultProfileSvg = `
  <Svg height={size} width={size} viewBox="0 0 100 100">
    <Circle cx="50" cy="50" r="50" fill={backgroundColor} />
    <Path
      d="M50 48C58.8366 48 66 40.8366 66 32C66 23.1634 58.8366 16 50 16C41.1634 16 34 23.1634 34 32C34 40.8366 41.1634 48 50 48ZM50 54C39.3178 54 18 59.3178 18 70V76C18 79.3137 20.6863 82 24 82H76C79.3137 82 82 79.3137 82 76V70C82 59.3178 60.6822 54 50 54Z"
      fill={iconColor}
    />
  </Svg>
`;

const UserDetailsScreen = ({navigation}) => {
  const route = useRoute();
  const userId = route.params?.userId || '';
  const screenWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = useState(0);
  const [userDetails, setUserDetails] = useState({});
  const style = styles;
  const [currentUser, setCurrentUser] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [isSendingInterest, setIsSendingInterest] = useState(false);
  const [hasSubscription, setHasSubscription] = useState(false);
  const [isRequestSent, setIsRequestSent] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);


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

  const handleContactPress = () => {
    if (!hasSubscription) {
      setModalVisible(true);
    }
  };

  useEffect(() => {
    const checkSubscription = async () => {
      const subscriptionStatus = await checkIsPaidUser();
      setHasSubscription(subscriptionStatus);
    };

    checkSubscription();
  }, []);

  useEffect(() => {
    const fetchUserDetails = async () => {
      setIsLoading(true);
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/userDetails/${userId}`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });
        const data = await response.json();
        setUserDetails(data.user);
      } catch (error) {
        console.error('Failed to fetch user details:', error);
        Toast.show({
          type: 'error',
          text1: 'Error',
          text2: 'Failed to load user details',
        });
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserDetails();
  }, [userId]);

  const saveUser = async () => {
    setIsSaving(true);
    const apiUrl = `${API_URL}/user/saveUser`;
    const token = await AsyncStorage.getItem('AccessToken');
    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId: userId}),
      });
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.message || 'An error occurred while saving user',
        );
      }
      await response.json();
      Toast('send interest successfully');
    } catch (error) {
      console.error('Error saving user:', error);
      Toast('An unexpected error occurred'); 
    } finally {
      setIsSaving(false);
    }
  };

  const sendInterest = async () => {
    setIsSendingInterest(true);
    const apiUrl = `${API_URL}/user/sendInterest`;
    const token = await AsyncStorage.getItem('AccessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          receiverId: userId,
        }),
      });

      console.log('response', response);

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

      await response.json();
      Toast('Interest sent successfully');

    } catch (error) {
      console.error('Error sending interest:', error);
      Toast('Error sending interest:', error);
    } finally {
      setIsSendingInterest(false);
    }
  };

  if (isLoading) {
    return <ActivityIndicator size="large" color="#0000ff" />;
  }

  const carouselData = [
    {
      id: '0',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.city || 'N/A',
      isVerified: userDetails?.isActive || false,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[0] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      category: 'Profile',
    },
    {
      id: '1',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.workLocation || 'N/A',
      isVerified: userDetails?.isActive || false,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[1] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      category: 'Work',
    },
    {
      id: '2',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.city || 'N/A',
      isVerified: userDetails?.isActive || false,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[2] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      education: userDetails?.highestDegree || 'N/A',
    },
    {
      id: '3',
      name: userDetails?.name || 'N/A',
      age: userDetails?.age || 'N/A',
      height: userDetails?.height || 'N/A',
      occupation: userDetails?.occupation || 'N/A',
      location: userDetails?.city || 'N/A',
      isVerified: userDetails?.isActive || false,
      userStatus: userDetails?.isPaid ? 'Premium' : 'Free',
      img: userDetails?.userImages?.[3] || (
        <SvgXml xml={defaultProfileSvg} width="50%" height="50%" />
      ),
      category: 'Religion',
    },
  ];
  const renderItem = ({item, index}) => (
    console.log('item', item),
    (
      <View style={style.slideContainer}>
        {userDetails?.userImages.Length > 0 && item?.userImages[index] ? (
          <Image
            source={{uri: userDetails?.userImages[index]}}
            style={style.image}
          />
        ) : (
          <Image
            source={{
              uri:
                userDetails?.gender === 'male'
                  ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                  : userDetails?.gender === 'female'
                  ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg'
                  : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
            }}
            resizeMode="cover"
            style={{width: '100%', height: '100%'}}
          />
        )}
        {/* <View style={style.gradient}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
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
      </View> */}
      </View>
    )
  );
  return (
    <View>
      <ScrollView style={[STYLES.bgColor(COLORS.dark.white)]}>
        <View style={styles.container}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={() => navigation.goBack()}
            textColor="black"
            iconRight={
              <TouchableOpacity
                style={styles.rightIconContainer}
                onPress={async () => {
                  await saveUser();
                  navigation.navigate('SavedUserScreen');
                }}>
                <Image
                  source={IMAGES.savedIcon}
                  style={{width: 20, height: 20}}
                />
              </TouchableOpacity>
            }
            title={LABELS.matches}
            extraStyle={{
              container: {width: '100%', position: 'absolute', zIndex: 1},
            }}
          />
        </View>

        <View style={style.container}>
          <View style={style.carouselContainer}>
            <View
              style={{
                position: 'absolute',
                zIndex: 1,
                right: 15,
                top: 15,
                padding: 7,
                backgroundColor: COLORS.dark.white,
                borderRadius: 50,
              }}>
              <Image
                style={{width: 20, height: 20}}
                source={IMAGES.correct}></Image>
            </View>

            <Carousel
              data={carouselData}
              renderItem={renderItem}
              sliderWidth={screenWidth - 60}
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
              <Space mT={13} />
              <AppText
                title={
                  userDetails?.description ||
                  'This user prefers to keep an air of mystery about them.'
                }
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              />
              <Space mT={13} />
              <View
                style={{flexDirection: 'row', alignItems: 'start', gap: 5}}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '48%',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                  }}>
                  <Image
                    source={IMAGES.briefcaseColored} // Update with the correct path
                    style={{width: 13, height: 13, marginRight: 8}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular', // Update this to match your font setup
                      color: '#333',
                    }}>
                    {userDetails?.occupation || 'N/A'}
                  </Text>
                </View>

                {/* Second item - City with icon */}
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    width: '49%',
                    backgroundColor: '#f5f5f5',
                    borderRadius: 10,
                    gap: 5,
                    paddingVertical: 8,
                    paddingHorizontal: 12,
                    marginHorizontal: 5,
                  }}>
                  <Icon
                    SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />} // Update with the correct path
                    style={{width: 40, height: 40}}
                  />
                  <Text
                    style={{
                      fontSize: 12,
                      fontFamily: 'Poppins-Regular', // Update this to match your font setup
                      color: '#333',
                    }}>
                    {userDetails?.city || 'N/A'}
                  </Text>
                </View>
              </View>
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
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
            </View>
            <Space mT={12} />
            <View style={style.basicInfoContainer}>
              <View style={[style.infoCont1]}>
              <AppText
                  title={LABELS.fullName}
                  variant={'h4'}
                  color={COLORS.dark.gray}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                />
                <Text style={{maxWidth:'80%',fontSize:16,color:'black'}}>{userDetails?.name || 'N/A'}</Text>
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
                <View>
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

            <View style={{paddingHorizontal: 10}}>
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
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />

              <Space mT={17} />
              <View style={{ flexDirection: 'row' }}>
          <View style={{ width: '50%' }}>
          <TouchableOpacity onPress={handleContactPress}>
            <AppText
              title={LABELS.phoneNumber}
              variant={'h4'}
              color={COLORS.dark.gray}
            />
              <Text
                title={
                  hasSubscription
                    ? userDetails?.phone || 'N/A'
                    : '+91 34********'
                }
                variant={'h4'}
                color={COLORS.dark.black}
                style={style.test}
              >{
                hasSubscription
                  ? userDetails?.phone || 'N/A'
                  : '+91 34********'
              }</Text>
            </TouchableOpacity>
          </View>
          <View style={{ width: '50%' }}>
            <TouchableOpacity onPress={handleContactPress}>
            <AppText
              title={LABELS.email}
              variant={'h4'}
              color={COLORS.dark.gray}
            />
              <Text
              style={style.test}
              >{
                hasSubscription
                  ? userDetails?.email || 'N/A'
                  : '******@gmail.com'
              }</Text>
            </TouchableOpacity>
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
                color={COLORS.dark.black}
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
                color={COLORS.dark.black}
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
            <View style={{paddingHorizontal: 10}}>
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
                color={COLORS.dark.black}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
              />
              <Space mT={20} />
              <View
                style={{
                  width: '100%',
                  flexDirection: 'row',
                }}>
                <View style={{width: '60%'}}>
                  <AppText
                    title={LABELS.maritalExpectation}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.lookingFor || 'N/A'}
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
                    title={`${userDetails?.ageFrom || 'N/A'} - ${
                      userDetails?.ageTo || 'N/A'
                    }`}
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
                    title={userDetails.Education?.education || 'N/A'}
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
                    title={userDetails?.motherTongue || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                </View>

                <View style={{width: '40%'}}>
                  <AppText
                    title={LABELS.cast}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.horoscopeDetails?.caste || 'N/A'}
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
                    title={`${userDetails.heightFrom || 'N/A'} - ${
                      userDetails.heightTo || 'N/A'
                    }`}
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
                  <Space mT={15} />
                  <AppText
                    title={LABELS.AnnualIncome}
                    variant={'h4'}
                    color={COLORS.dark.gray}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                  <AppText
                    title={userDetails?.annualIncome || 'N/A'}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
                  />
                </View>
              </View>
            </View>
          </View>
          <Space mT={80} />
          <Space mT={20} />
        </View>
        <View style={{height: 60}} />
        <Modal
          transparent={true}
          visible={isRequestSent}
          animationType="slide"
          onRequestClose={() => setIsRequestSent(false)}>
          <View
            style={{
              flex: 1,
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: 'rgba(0,0,0,0.5)',
            }}>
            <View
              style={{backgroundColor: 'white', padding: 20, borderRadius: 10}}>
              <View style={styles.box}>
                <View style={styles.contentbox}>
                  <View style={styles.iconbox}>
                    <Image
                      source={IMAGES.check}
                      style={styles.checkmarkImage}
                    />
                  </View>
                  <View style={styles.textbox}>
                    <Text style={styles.titlebox}>Request Sent</Text>
                    <Text style={styles.messagebox}>
                      Your request has been sent. We'll update you soon.
                    </Text>
                  </View>
                </View>
                <TouchableOpacity
                  style={styles.closeButton}
                  onPress={() => setIsRequestSent(false)}>
                  <Text style={styles.closeButtonText}>✕</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </ScrollView>
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
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
          }}>
          <View
            style={{
              width: '90%',
              backgroundColor: 'white',
              borderRadius: 10,
              paddingVertical: 20,
              paddingHorizontal: 25,
              shadowColor: '#000',
              shadowOffset: { width: 0, height: 2 },
              shadowOpacity: 0.25,
              shadowRadius: 4,
              elevation: 5,
              position: 'relative',
            }}>
            <TouchableOpacity
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                padding: 5,
              }}
              onPress={() => setModalVisible(false)}>
              <Text style={{ fontSize: 16, color: '#666' }}>X</Text>
            </TouchableOpacity>

            <Text
              style={{
                fontSize: 18,
                fontWeight: '600',
                textAlign: 'left',
                color: '#000',
              }}>
              Upgrade Membership
            </Text>

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
                textAlign: 'left',
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
                  borderRadius: 30,
                  backgroundColor: '#FFF',
                  borderWidth: 1,
                  borderColor: '#ccc',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={() => setModalVisible(false)}>
                <Text style={{ color: '#666', fontSize: 16 }}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity
                style={{
                  flex: 1,
                  paddingVertical: 12,
                  marginHorizontal: 5,
                  borderRadius: 30,
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
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          paddingHorizontal: 20,
          position: 'absolute', // Change from 'fixed' to 'absolute'
          bottom: 0,
          justifyContent: 'center',
          paddingVertical: 15,
          backgroundColor: 'white', // Optional: to create a background for the button container
          elevation: 5, // Optional: add shadow/elevation for better visibility
        }}>
        <TouchableOpacity
          style={{
            width: '48%',
            height: 50,
            backgroundColor: COLORS.dark.secondary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 30,
          }}
          onPress={() => {
            setIsRequestSent(true); // Trigger modal visibility
            sendInterest(); // Assuming this is the function to send the request
          }}>
          <Image
            source={IMAGES.sendIcon}
            style={{width:14,height:14}}
          />
          <Space mL={10} />
          <Text
            style={{fontFamily: Fonts.PoppinsRegular,color:'white',fontSize:14}}
          >Send Interest</Text>
        </TouchableOpacity>
        <Space mL={10} />

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('ChatScreen', {
              userId: userDetails?._id,
              roomId: `${userDetails?._id}_${currentUser.user._id}`,
              user: userDetails,
            });
          }}
          style={{
            width: '48%',
            height: 50,
            backgroundColor: COLORS.dark.primary,
            justifyContent: 'center',
            alignItems: 'center',
            flexDirection: 'row',
            borderRadius: 30,
          }}>
          <Image source={IMAGES.chatIcon} style={{width:14,height:14}} />
          <Space mL={10} />
          <Text
            style={{fontFamily: Fonts.PoppinsRegular,color:'white',fontSize:14}}
          >Chat Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default UserDetailsScreen;