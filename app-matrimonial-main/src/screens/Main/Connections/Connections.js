import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView, Image, ActivityIndicator } from 'react-native';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import { connectionStatus } from '../../../data/appData';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import Space from '../../../components/Space/Space';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AppText from '../../../components/AppText/AppText';
import AppCard from '../../../components/AppCard/AppCard';
import ConnectionsInboxCard from '../../../components/ConnectionsInboxCard/ConnectionsInboxCard';
import FastImage from 'react-native-fast-image';
import { Fonts } from '../../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import { Toast } from '../../../utils/native';
import { API_URL } from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Connections = ({ navigation }) => {
  const [selectedBtn, setSelectedBtn] = useState(1);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [acceptedRequests, setAcceptedRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, [selectedBtn]);

  useEffect(() => {
  }, []);
  const rejectRequest = async (requestId) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/rejectRequest?requestId=${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          Toast('Request not found');
        } else {
          Toast('Something went wrong');
        }
      }

      const { requests } = await response.json();
    } catch (error) {
      console.error('Error rejecting request:', error);
      Toast('Error rejecting request');
      throw error;
    }
  };
  const acceptRequest = async (requestId) => {
    try {

      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/acceptRequest?requestId=${requestId}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        if (response.status === 404) {
          Toast('Request not found');
        } else if (response.status === 409) {
          Toast('Request already accepted');
        } else {
          Toast('Something went wrong');
        }
      }

      const { requests } = await response.json();
      return { requests };
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
      }
      setRequests(data.requests);
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
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('Accepted requests:', data);
      setAcceptedRequests(data)
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const handleAcceptRequest = (requestId) => {
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
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: userId }),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok');
      }

      const data = await response.json();
      console.log('My requests:', data);
      console.log("requests" + data.requests)
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const handleProfileUpdate = (item) => {
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
            iconRight={
              <TouchableOpacity onPress={handleRightIconPress}>
                <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
              </TouchableOpacity>
            }
          />
        </View>
        <Space mT={20} />
        <View style={[STYLES.container]}>
          <View style={style.mapContainer}>
            {connectionStatus.map((item) => (
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
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          </View>
        ) : (
          <>
            {selectedBtn === 1 ? (
              <ConnectionsInboxCard data={acceptedRequests} />
            ) : selectedBtn === 2 || selectedBtn === 3 ? (
              <View style={STYLES.pH(HORIZON_MARGIN)}>
                {requests && requests.length > 0 ? (
                  requests.map((item) => (
                    <AppCard
                      key={item._id}
                      data={item.receiverId}
                      isBtnShown={true}
                      btnType={'requestAcception'}
                      onPressBtn1={() => handleAcceptRequest(item._id)}
                      onPressBtn2={() => handleRejectRequest(item._id)}
                    />
                  ))
                ) : (
                  <AppText title="No requests found" variant="h3" />
                )}
              </View>
            ) : (
              <View style={STYLES.pH(HORIZON_MARGIN)}>
                {requests && requests.length>0 && requests.map((item) => (
                  <View style={STYLES.pH(HORIZON_MARGIN)} key={item.receiverId._id}>
                    <View style={style.cardContainer}>
                      <View style={style.imgContainer}>
                        <FastImage
                          source={{ uri: item.receiverId.userImages[0] }}
                          resizeMode="cover"
                          style={style.img}
                        />
                        <LinearGradient
                          colors={['transparent', COLORS.dark.secondary]}
                          style={style.gradientOverlay}
                        />
                      </View>
                      <View style={style.contentContainer}>
                        <View style={STYLES.rowCenterBt}>
                          <AppText
                            title={item.receiverId.name}
                            variant={'h4'}
                            color={COLORS.dark.black}
                            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                          />
                          <View style={style.verifyIconContainer}>
                            <CustomImage
                              source={IMAGES.verifyIcon}
                              size={12}
                              resizeMode={'cover'}
                            />
                          </View>
                        </View>
                        <AppText
                          title={`Age ${item.receiverId.age}, ${item.receiverId.height}`}
                          color={COLORS.dark.inputBorder}
                          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                        />
                        <View style={STYLES.rowCenter}>
                          <AppText
                            title={item.receiverId.city}
                            variant={'h5'}
                            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                          />
                        </View>
                        <View style={style.btnShownContainer}>
                          <AppText
                            title={item.receiverId.motherTongue}
                            variant={'h5'}
                            color={COLORS.dark.inputBorder}
                            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                          />
                          <AppText
                            title={item.receiverId.sect}
                            variant={'h5'}
                            color={COLORS.dark.inputBorder}
                            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                          />
                        </View>
                      </View>
                      <Space mT={10} />
                    </View>
                  </View>
                ))}
              </View>
            )}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default Connections;