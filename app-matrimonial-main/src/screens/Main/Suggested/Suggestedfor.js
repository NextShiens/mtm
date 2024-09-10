import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  ActivityIndicator,
  SafeAreaView,
  Dimensions,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { API_URL } from '../../../../constant';
import { COLORS, STYLES } from '../../../assets/theme';
import CustomImage from '../../../components/CustomImage/CustomImage';
import { IMAGES } from '../../../assets/images';
import { useNavigation } from '@react-navigation/native';
import {
    subscriptionCheck,
    checkLiveChatAvailability,
  } from '../../../utils/subscriptionCheck';
import Icon from '../../../components/Icon/Icon';
import {Toast} from '../../../utils/native';
import {SVG} from '../../../assets/svg';

const { width } = Dimensions.get('window');
const numColumns = 2;
const cardWidth = (width - 40) / numColumns;


const SuggestedUsersPage = () => {
  const navigation = useNavigation();
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [matchType, setMatchType] = useState('newUsers');

  useEffect(() => {
    fetchMatchedUsers();
  }, [matchType]);

  const fetchMatchedUsers = async () => {
    try {
      setLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');
      if (!token) {
        throw new Error('Access token not found');
      }

      const response = await fetch(
        `${API_URL}/user/userMatch?matchType=${matchType}`,
        {
          method: 'GET',
          headers: {
            authorization: `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        const errorResponse = await response.json();
        console.error('Error response:', errorResponse);
        throw new Error(
          errorResponse.message || 'Failed to fetch matched users',
        );
      }

      const data = await response.json();
      console.log('response', data);
      setMatchedUsers(data?.matchedUsers || []);
      setFilteredUsers(data?.matchedUsers || []);
    } catch (err) {
      console.error('Error fetching matched users:', err);
      setError(
        err.message || 'Failed to fetch matched users. Please try again.',
      );
    } finally {
      setLoading(false);
    }
  };

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

  const renderUserItem = ({ item }) => (
    <View style={styles.userItem}>
      <Text style={styles.newBadge}>New</Text>
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
        style={styles.userImage}
      />
      <View style={styles.userInfo}>
        <Text style={styles.userName} numberOfLines={1} width='60%'>{item.name || 'N/A'}</Text>
        <View style={styles.userDetails}>
          <Text style={styles.userAge}>Age {item.age || 'N/A'}, </Text>
          <Text style={styles.userHeight}>{item.height || 'N/A'}</Text>
        </View>
        <View style={styles.professionContainer}>
          <Text style={styles.userProfession} numberOfLines={1}>
            {item.occupation || 'N/A'}
          </Text>
        </View>
        <View style={styles.locationContainer}>
        <Icon
                SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
              />
          <Text style={styles.userLocation}>{item.city || 'N/A'}</Text>
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
              <CustomImage
                source={IMAGES.chatIcon}
                size={10}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#ff385c" />
        <Text style={styles.text}>loading....</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={styles.errorContainer}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
      <TouchableOpacity onPress={() => {navigation.navigate('HomePage')}}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.headerText}>Suggested For You</Text>
      </View>
      <FlatList
        data={filteredUsers}
        renderItem={renderUserItem}
        keyExtractor={(item, index) => `user-${index}`}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        numColumns={numColumns}
        key={numColumns}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  backButton: {
    fontSize: 24,
    marginRight: 16,
    color: '#333',
  },
  headerText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  listContainer: {
    padding: 8,
  },
  userItem: {
    margin: 8,
    backgroundColor: '#fff',
    borderRadius: 10,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    position: 'relative',
    height: 200, 
    width: cardWidth, 
  },
  userImage: {
    width: '100%',
    height: 100, 
    resizeMode: 'cover',
  },
  userInfo: {
    padding: 7,
  },
  userName: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 4,
    marginTop: -6,
  },
  userDetails: {
    flexDirection: 'row',
    marginBottom: 4,
  },
  userAge: {
    fontSize: 12,
    color: '#666',
  },
  userHeight: {
    fontSize: 12,
    color: '#666',
  },
  professionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  userProfession: {
    fontSize: 12,
    color: '#666',
    width: '70%',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  userLocation: {
    fontSize: 12,
    color: '#666',
  },
  actionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  actionButton: {
    width: 18,
    height: 18,
    borderRadius: 15,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  actionButtonText: {
    fontSize: 16,
    color: '#fff',
  },
  newBadge: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.dark.primary,
    color: '#fff',
    paddingVertical: 2,
    paddingHorizontal: 8,
    borderRadius: 10,
    fontSize: 12,
    fontWeight: 'bold',
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  errorText: {
    color: '#ff385c',
    textAlign: 'center',
    fontSize: 16,
  },
  text: {
    fontSize: 12,
    color: '#ff385c',
  },
});

export default SuggestedUsersPage;