import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
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

  useEffect(() => {
    fetchRequests();
  }, [selectedBtn]); 
useEffect(async()=>{
    const user = await AsyncStorage.getItem('theUser'); 
  }
  ,[]);
  const fetchRequests = async () => {
    setLoading(true);
    try {
      let data;
      if (selectedBtn === 1) {
        data = await getAcceptedRequests();
      } else if (selectedBtn === 2 || selectedBtn === 3) {
        data = await getMyRequests();
      }
      setRequests(data.requests || []); // Ensure requests are initialized as an array
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
      console.log('Accepted requests:', data); // Corrected variable name
      return data;
    } catch (error) {
      console.error('There was a problem with the fetch operation:', error);
      throw error;
    }
  };

  const getMyRequests = async () => {
    const userId = user._id; 
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
            iconLeft={<SVG.BackArrow fill={'black'} />}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            title={LABELS.connection}
            iconRight={
              <TouchableOpacity onPress={handleRightIconPress}>
                <CustomImage
                  source={IMAGES.notificationIcon}
                  size={27}
                  resizeMode={'contain'}
                />
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

        {selectedBtn === 1 ? (
          <ConnectionsInboxCard data={requests} /> // Render accepted requests
        ) : selectedBtn === 2 || selectedBtn === 3 ? (
          <View style={STYLES.pH(HORIZON_MARGIN)}>
            <AppCard
              data={requests}
              isBtnShown={true}
              btnType={'requestAcception'}
              onPressBtn1={() => {
                Toast('Request accepted');
              }}
              onPressBtn2={() => {
                Toast('Request rejected');
              }}
            />
          </View>
        ) : (
          requests.map((item) => (
            <View style={STYLES.pH(HORIZON_MARGIN)} key={item._id}>
              <View style={style.cardContainer}>
                <View style={style.imgContainer}>
                  <FastImage
                    source={IMAGES.profile1} // Replace with actual image source logic
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
                      title={item.name}
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
                    title={`Age ${item.age}, ${item.height}`}
                    color={COLORS.dark.inputBorder}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                  />
                  <View style={STYLES.rowCenter}>
                    {/* Adjust according to your data structure */}
                    <AppText
                      title={item.location}
                      variant={'h5'}
                      extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                    />
                  </View>
                  <View style={style.btnShownContainer}>
                    <AppText
                      title={item.language}
                      variant={'h5'}
                      color={COLORS.dark.inputBorder}
                      extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                    />
                    <AppText
                      title={item.castName}
                      variant={'h5'}
                      color={COLORS.dark.inputBorder}
                      extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                    />
                  </View>
                </View>
                <Space mT={10} />
              </View>
            </View>
          ))
        )}
      </ScrollView>
    </>
  );
};

export default Connections;