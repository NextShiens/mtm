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
import { Toast } from '../../../utils/native';
import { subscriptionCheck ,checkLiveChatAvailability} from '../../../utils/subscriptionCheck';

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
  async function addToRecentlyViewed(viewedUserId) {
    const apiUrl = `${API_URL}/user/recentlyViewed`;
    const token = await AsyncStorage.getItem('AccessToken');

    try {
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userId: viewedUserId
        })
      });

      if (!response.ok) {
        let errorMessage = 'An error occurred while adding user to recently viewed';
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
        data: data
      };
    } catch (error) {
      console.error('Error adding user to recently viewed:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        error: error
      };
    }
  }
  const filterUsers = () => {
    if (!searchTerm) {
      setFilteredUsers(matchedUsers);
      return;
    }

    const lowercasedSearch = searchTerm.toLowerCase();
    const filtered = matchedUsers.filter(user => {
      return (
        user.name?.toLowerCase().includes(lowercasedSearch) ||
        user.occupation?.toLowerCase().includes(lowercasedSearch) ||
        user.age?.toString().includes(lowercasedSearch) ||
        user.height?.toLowerCase().includes(lowercasedSearch) ||
        user.city?.toLowerCase().includes(lowercasedSearch) ||
        user.motherTongue?.toLowerCase().includes(lowercasedSearch) ||
        user.sect?.toLowerCase().includes(lowercasedSearch) ||
        user.religion?.toLowerCase().includes(lowercasedSearch) ||
        user.highestDegree?.toLowerCase().includes(lowercasedSearch) ||
        user.maritalStatus?.toLowerCase().includes(lowercasedSearch) ||
        user.annualIncome?.toLowerCase().includes(lowercasedSearch) ||
        user.workLocation?.toLowerCase().includes(lowercasedSearch) 
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
      <View style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
      }}>
        <ActivityIndicator size="xl" color={COLORS.dark.primary} />
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
              onPressBtn1={ async () => {
                addToRecentlyViewed(user?._id);
                if (await subscriptionCheck(user)) {
                  navigation.navigate('UserDetailsScreen', { userId: user?._id });
                } else {
                  Toast("Your profile view limit exceeded.");
                }
               
              }}
              onPressBtn2={async() => {
                if (await checkLiveChatAvailability(user)) {
                  navigation.navigate('ChatScreen', { userId: user?._id, roomId: `${user?._id}_${user._id}`, user: user });
                } else {
                  Toast("Your profile view limit exceeded.");
                }
              
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