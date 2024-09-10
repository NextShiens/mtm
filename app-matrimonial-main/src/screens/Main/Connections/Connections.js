import React, {useState, useEffect} from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  Image,
  ActivityIndicator,
  Text,
} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import Icon from '../../../components/Icon/Icon';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import {connectionStatus} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {styles} from './styles';
import Space from '../../../components/Space/Space';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import AppText from '../../../components/AppText/AppText';
import AppCard from '../../../components/AppCard/AppCard';
import ConnectionsInboxCard from '../../../components/ConnectionsInboxCard/ConnectionsInboxCard';
import FastImage from 'react-native-fast-image';
import {Fonts} from '../../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {Toast} from '../../../utils/native';
import {API_URL} from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connections = ({navigation}) => {
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, [selectedBtn]);

  useEffect(() => {}, []);
  const rejectRequest = async requestId => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(
        `${API_URL}/user/rejectRequest?requestId=${requestId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          Toast('Request not found');
        } else {
          Toast('Something went wrong');
        }
      }

      const {requests} = await response.json();
    } catch (error) {
      console.error('Error rejecting request:', error);
      Toast('Error rejecting request');
      throw error;
    }
  };
  const acceptRequest = async requestId => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(
        `${API_URL}/user/acceptRequest?requestId=${requestId}`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          Toast('Request not found');
        } else if (response.status === 409) {
          Toast('Request already accepted');
        } else {
          Toast('Something went wrong');
        }
      }

      const {requests} = await response.json();
      return {requests};
    } catch (error) {
      console.error('Error accepting request:', error);
      throw error;
    }
  };
  const fetchRequests = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedBtn === 1) {
        data = await getAcceptedRequests();
      } else if (selectedBtn === 2 || selectedBtn === 3) {
        data = await getMyRequests();
        console.log('data:', data);
      }
      setRequests(data?.requests);
    } catch (error) {
      console.error('Error fetching requests:', error);
    } finally {
      setLoading(false);
    }
  };

  const getAcceptedRequests = async () => {
    const token = await AsyncStorage.getItem('AccessToken');
    try {
      const response = await fetch(`${API_URL}/user/getAcceptedRequests`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Accepted requests:', data);
      setAcceptedRequests(data);
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const handleAcceptRequest = requestId => {
    acceptRequest(requestId);
    Toast('Request accepted');
  };

  const handleRejectRequest = (requestId) => {
    rejectRequest(requestId);
    Toast('Request rejected');
  };

  const getMyRequests = async () => {
    const theUser = await AsyncStorage.getItem('theUser');
    const user = JSON.parse(theUser);
    const userId = user.user._id;
    const token = await AsyncStorage.getItem('AccessToken');

    try {
      const response = await fetch(`${API_URL}/user/getMyRequests`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({userId: userId}),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('My requests: line 162', data);
      // console.log("requests" + data.requests)
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const handleProfileUpdate = item => {
    setSelectedBtn(item.key);
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const style = styles;

  return (
    <>
      <ScrollView>
        <View style={style.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
            onLeftIconPress={() => navigation.goBack()}
            title={LABELS.connection}
            textColor={COLORS.dark.primary}
            iconRight={
              <TouchableOpacity onPress={handleRightIconPress}>
                <Image
                  source={IMAGES.notificationIcon}
                  style={styles.Bell_Icon}
                />
              </TouchableOpacity>
            }
          />
        </View>
        <Space mT={20} />
        <View style={[STYLES.container]}>
          <View style={style.mapContainer}>
            {connectionStatus.map(item => (
              <AppButton
                key={item.key}
                variant="filled"
                extraStyle={{
                  container: [
                    selectedBtn === item.key
                      ? style.selectedBtn
                      : style.unSelectedBtn,
                  ],
                  text: [
                    selectedBtn === item.key
                      ? style.selectedText
                      : style.unSelectedText,
                  ],
                }}
                title={item.value}
                onPress={() => {
                  handleProfileUpdate(item);
                }}
              />
            ))}
          </View>
        </View>
        <Space mT={20} />

        {loading ? (
          <View
            style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          </View>
        ) : (
          <>
            {selectedBtn === 1 ? (
              <ConnectionsInboxCard data={acceptedRequests} />
            ) : selectedBtn === 2 || selectedBtn === 3 ? (
              <View style={styles.main}>
                {requests && requests.length > 0 ? (
                  requests.map(
                    (item, index) => (
                      console.log('item:', item),
                      (
                        <View
                          style={styles.cardContainer}
                          key={`${item._id}_${index}`}>
                          <View style={styles.imageContainer}>
                            <Image
                              source={{
                                uri:
                                  item.userImages && item.userImages.length > 0
                                    ? item.userImages[0]
                                    : item?.gender === 'male'
                                    ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                                    : item?.gender === 'female'
                                    ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg'
                                    : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
                              }}
                              style={styles.profileImage}
                            />
                            <View style={styles.newTag}>
                              <AppText
                                title="New"
                                extraStyle={styles.newText}
                              />
                            </View>
                            {item.isVerified && (
                              <View style={styles.verifiedIcon}>
                                <CustomImage
                                  source={IMAGES.verifyIcon}
                                  size={24}
                                  resizeMode="contain"
                                />
                              </View>
                            )}
                            <LinearGradient
                              colors={['transparent', COLORS.dark.secondary]}
                              style={styles.gradientOverlay}
                            />
                          </View>
                          <View style={styles.infoContainer}>
                            <View style={styles.nameLocationContainer}>
                              <Text style={styles.test}>
                                {item?.receiverId?.name || 'N/A'}
                              </Text>
                              <View style={styles.locationContainer}>
                                <Icon
                                  SVGIcon={
                                    <SVG.locationIconSVG
                                      fill={COLORS.dark.primary}
                                    />
                                  }
                                />
                                <AppText
                                  title={item?.receiverId?.city || 'N/A'}
                                  color={COLORS.dark.inputBorder}
                                  extraStyle={[
                                    Fonts.PoppinsRegular,
                                    styles.locationText,
                                  ]}
                                />
                              </View>
                            </View>
                            {/* <View style={styles.ageHeightActionContainer}>
                              <Text
                                title={`Age ${
                                  item?.receiverId?.age || 'N/A'
                                }, ${item.receiverId?.height}`}
                                color={COLORS.dark.inputBorder}
                                extraStyle={[
                                  STYLES.fontFamily(Fonts.PoppinsRegular),
                                  STYLES.fontSize(11),
                                  styles.detailsText,
                                ]}
                              />
                            </View> */}
                            <View style={styles.ageHeightActionContainer}>
                              <AppText
                                title={`Age ${
                                  item?.receiverId?.age || 'N/A'
                                }, ${item.receiverId?.height}`}
                                color={COLORS.dark.inputBorder}
                                extraStyle={[
                                  STYLES.fontFamily(Fonts.PoppinsRegular),
                                  STYLES.fontSize(11),
                                  styles.detailsText,
                                ]}
                              />
                            </View>
                            <AppText
                              title={item?.receiverId?.occupation || 'N/A'}
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
                                onPress={() => handleAcceptRequest(item._id)}>
                                <Image
                                  source={require('../../../assets/images/tick.png')}
                                  style={{
                                    width: 16,
                                    height: 16,
                                    alignSelf: 'center',
                                  }} // Add inline styling here
                                />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleRejectRequest(item._id)}>
                                <Image
                                  source={require('../../../assets/images/reject.png')}
                                  style={{
                                    width: 16,
                                    height: 16,
                                    alignSelf: 'center',
                                  }} // Add inline styling here
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )
                    ),
                  )
                ) : (
                  <AppText
                    title="No requests found"
                    variant="h3"
                    color="black"
                  />
                )}
              </View>
            ) : (
              <View style={styles.main}>
                {requests && requests.length > 0 ? (
                  requests.map(
                    (item, index) => (
                      console.log('item:', item),
                      (
                        <View
                          style={styles.cardContainer}
                          key={`${item._id}_${index}`}>
                          <View style={styles.imageContainer}>
                            <Image
                              source={{
                                uri:
                                  item.userImages && item.userImages.length > 0
                                    ? item.userImages[0]
                                    : item?.gender === 'male'
                                    ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                                    : item?.gender === 'female'
                                    ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg'
                                    : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
                              }}
                              style={styles.profileImage}
                            />
                            <View style={styles.newTag}>
                              <AppText
                                title="New"
                                extraStyle={styles.newText}
                              />
                            </View>
                            {item.isVerified && (
                              <View style={styles.verifiedIcon}>
                                <CustomImage
                                  source={IMAGES.verifyIcon}
                                  size={24}
                                  resizeMode="contain"
                                />
                              </View>
                            )}
                            <LinearGradient
                              colors={['transparent', COLORS.dark.secondary]}
                              style={styles.gradientOverlay}
                            />
                          </View>
                          <View style={styles.infoContainer}>
                            <View style={styles.nameLocationContainer}>
                              <Text style={styles.test}>
                                {item?.receiverId?.name || 'N/A'}
                              </Text>
                              <View style={styles.locationContainer}>
                                <Icon
                                  SVGIcon={
                                    <SVG.locationIconSVG
                                      fill={COLORS.dark.primary}
                                    />
                                  }
                                />
                                <AppText
                                  title={item?.receiverId?.city || 'N/A'}
                                  color={COLORS.dark.inputBorder}
                                  extraStyle={[
                                    Fonts.PoppinsRegular,
                                    styles.locationText,
                                  ]}
                                />
                              </View>
                            </View>
                            {/* <View style={styles.ageHeightActionContainer}>
                            <Text
                              title={`Age ${
                                item?.receiverId?.age || 'N/A'
                              }, ${item.receiverId?.height}`}
                              color={COLORS.dark.inputBorder}
                              extraStyle={[
                                STYLES.fontFamily(Fonts.PoppinsRegular),
                                STYLES.fontSize(11),
                                styles.detailsText,
                              ]}
                            />
                          </View> */}
                            <View style={styles.ageHeightActionContainer}>
                              <AppText
                                title={`Age ${
                                  item?.receiverId?.age || 'N/A'
                                }, ${item.height}`}
                                color={COLORS.dark.inputBorder}
                                extraStyle={[
                                  STYLES.fontFamily(Fonts.PoppinsRegular),
                                  STYLES.fontSize(11),
                                  styles.detailsText,
                                ]}
                              />
                            </View>
                            <AppText
                              title={item?.receiverId?.occupation || 'N/A'}
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
                                onPress={() => handleAcceptRequest(item._id)}>
                                <Image source={IMAGES.accept} size={10} />
                              </TouchableOpacity>
                              <TouchableOpacity
                                style={styles.actionButton}
                                onPress={() => handleRejectRequest(item._id)}>
                                <CustomImage
                                  source={IMAGES.chatIcon}
                                  size={10}
                                />
                              </TouchableOpacity>
                            </View>
                          </View>
                        </View>
                      )
                    ),
                  )
                ) : (
                  <AppText
                    title="No requests found"
                    variant="h3"
                    color="black"
                  />
                )}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Connections;
