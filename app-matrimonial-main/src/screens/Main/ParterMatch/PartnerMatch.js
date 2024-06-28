import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import ConnectionsInboxCard from '../../../components/ConnectionsInboxCard/ConnectionsInboxCard';
import AppCard from '../../../components/AppCard/AppCard';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';

const PartnerMatch = ({ navigation }) => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [matchType, setMatchType] = useState('match');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(async () => {
    await fetchMatchedUsers();

    return () => {
      setMatchedUsers([]);
      setLoading(true);
      setError(null);
    }
  }, []);

  const fetchMatchedUsers = async () => {
    console.log('Fetching matched users...');
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      console.log('Token from mathc :', token);
      const response = await fetch(`${API_URL}/user/userMatch?matchType=${matchType}`, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
      }

      const data = await response.json();
      console.log('Matched users:', data.matchedUsers);
      setMatchedUsers(data.matchedUsers);
      setLoading(false);
    } catch (err) {
      console.error('Error fetching matched users:', err);
      setError('Failed to fetch matched users. Please try again.');
      setLoading(false);
    }
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handlesearchFunctionality = item => {
  };

  const handlesearchBtn = () => {
  };

  const style = styles;

  if (loading) {
    return (
      <View style={[STYLES.flexCenter, STYLES.flex1]}>
        <ActivityIndicator size="large" color={COLORS.dark.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[STYLES.flexCenter, STYLES.flex1]}>
        <AppText title={error} color={COLORS.dark.danger} />
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          title={LABELS.matches}
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
      <Space mT={15} />
      <View style={style.searchBoxContainer}>
        <AppInput
          iconLeft={<SVG.magnifyingGlass fill={'black'} />}
          extraStyle={{
            textInputCont: [style.textInputCont],
          }}
          placeholder={LABELS.searchHere}
          onChangeText={handlesearchFunctionality}
        />
        <TouchableOpacity
          style={style.filterBtn}
          activeOpacity={0.8}
          onPress={handlesearchBtn}>
          <CustomImage
            source={IMAGES.filterIcon}
            size={17}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>

      <Space mT={5} />
      <View style={STYLES.pH(HORIZON_MARGIN)}>
        {matchedUsers.map(user => (
          <AppCard
            key={user._id}
            isBtnShown={true}
            btnType={'requestsubmission'}
            data={user}
            onPressBtn1={() => {
              navigation.navigate('UserDetailsScreen', { userId: user._id });
            }}
            onPressBtn2={() => {
              navigation.navigate('ChatScreen', { userId: user._id });
            }}
          />
        ))}
      </View>
    </ScrollView>
  );
};

export default PartnerMatch;