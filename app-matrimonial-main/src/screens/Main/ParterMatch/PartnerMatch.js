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
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [matchType, setMatchType] = useState('match');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
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
    fetchMatchedUsers();

    return () => {
      setMatchedUsers([]);
      setFilteredUsers([]);
      setLoading(true);
      setError(null);
    }
  }, []);

  useEffect(() => {
    filterUsers();
  }, [searchTerm, matchedUsers]);

  const fetchMatchedUsers = async () => {
    console.log('Fetching matched users...');
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) {
        throw new Error('Access token not found');
      }

      const response = await fetch(`${API_URL}/user/userMatch?matchType=${matchType}`, {
        method: 'GET',
        headers: {
          'authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(errorResponse.message || 'Failed to fetch matched users');
      }

      const data = await response.json();
      setMatchedUsers(data?.matchedUsers || []);
      setFilteredUsers(data?.matchedUsers || []);
    } catch (err) {
      console.error('Error fetching matched users:', err);
      setError(err.message || 'Failed to fetch matched users. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handlesearchFunctionality = (text) => {
    setSearchTerm(text);
  };

  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(matchedUsers);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = matchedUsers.filter(user => {
      return (
        user.name?.toLowerCase().includes(lowercasedSearch) ||
        user.profession?.toLowerCase().includes(lowercasedSearch) ||
        user.age?.toString().includes(lowercasedSearch) ||
        user.height?.toLowerCase().includes(lowercasedSearch) ||
        user.location?.toLowerCase().includes(lowercasedSearch) ||
        user.language?.toLowerCase().includes(lowercasedSearch) ||
        user.castName?.toLowerCase().includes(lowercasedSearch)
      );
    });

    setFilteredUsers(filtered);
  };

  const handlesearchBtn = () => {
    // Implement search button functionality here if needed
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
          title={LABELS.matches || 'Matches'}
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
          placeholder={LABELS.searchHere || 'Search here'}
          onChangeText={handlesearchFunctionality}
          value={searchTerm}
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
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <AppCard
              key={user?._id || Math.random().toString()}
              isBtnShown={true}
              btnType={'requestsubmission'}
              data={user}
              onPressBtn1={() => {
                navigation.navigate('UserDetailsScreen', { userId: user?._id });
              }}
              onPressBtn2={() => {
                console.log('Chat button pressed');
                navigation.navigate('ChatScreen', { userId: user?._id, roomId: `${user?._id}_${user._id}`,user:user });
              }}
            />
          ))
        ) : (
          <AppText title="No matched users found" color={COLORS.dark.secondary} />
        )}
      </View>
    </ScrollView>
  );
};

export default PartnerMatch;