import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  FlatList,
  Image,
  StyleSheet,
} from 'react-native';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { Fonts } from '../../../assets/fonts';
import { COLORS, STYLES } from '../../../assets/theme';
import Icon from '../../../components/Icon/Icon';
import AppText from '../../../components/AppText/AppText';
import { API_URL } from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import LinearGradient from 'react-native-linear-gradient';
import CustomImage from '../../../components/CustomImage/CustomImage';
import { Toast } from '../../../utils/native';
import { checkLiveChatAvailability, subscriptionCheck } from '../../../utils/subscriptionCheck';


const RECENT_SEARCHES_KEY = 'recentSearches';

export default function SearchScreen() {
  const navigation = useNavigation();
  const inputRef = useRef(null);
  const [search, setSearch] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [newUsersLoading, setNewUsersLoading] = useState(false);
  const [isFirstTime, setIsFirstTime] = useState(true);
  const [recentSearches, setRecentSearches] = useState([]);

  useEffect(() => {
    if (isFirstTime) {
      const timer = setTimeout(() => {
        if (inputRef.current) {
          inputRef.current.focus();
        }
      }, 500);
      setIsFirstTime(false);
      return () => clearTimeout(timer);
    }
  }, [isFirstTime]);

  useEffect(() => {
    const loadRecentSearches = async () => {
      try {
        const savedSearches = await AsyncStorage.getItem(RECENT_SEARCHES_KEY);
        if (savedSearches) {
          setRecentSearches(JSON.parse(savedSearches));
        }
      } catch (error) {
        console.error('Error loading recent searches:', error);
      }
    };

    loadRecentSearches();
  }, []);

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        fetchSuccesStories(searchQuery);
      } else {
        setSearch([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery]);

  const saveRecentSearch = async (query) => {
    try {
      const updatedSearches = [query, ...recentSearches.filter(item => item !== query)].slice(0, 5);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const fetchSuccesStories = async (query) => {
    if (!query) return;

    try {
      setNewUsersLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(
        `${API_URL}/user/search?query=${query}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('response', response);
      if (!response.ok) {
        console.error('Error fetching success stories:', response);
        throw new Error(
          response.status === 404 ? 'No results found' : 'Server error'
        );
      }

      const result = await response.json();
      setSearch(result.data || []);
      await saveRecentSearch(query);
    } catch (error) {
      console.error('Error fetching success stories:', error);
    } finally {
      setNewUsersLoading(false);
    }
  };

  const handleRecentSearchClick = (query) => {
    setSearchQuery(query);
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
        console.log('canChat', canChat);
      } else {
        Toast("You can't chat. Please buy premium.");
      }
    } catch (error) {
      console.error('Error checking chat availability:', error);
      Toast("An error occurred. Please try again.");
    }
  };

  const renderItem = ({ item, index }) => (
    <View style={styles.cardContainer} key={`${item._id}_${index}`}>
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
          <AppText title="New" extraStyle={styles.newText} />
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
          <AppText
            title={item?.name || 'N/A'}
            numberOfLines={1}
            width={'60%'}
            variant="h6"
            color={COLORS.dark.black}
          />
          <View style={styles.locationWrapper}>
            <Icon SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />} />
            <AppText
              title={item.city || 'N/A'}
              color={'black'}
              extraStyle={[Fonts.PoppinsRegular, styles.locationText]}
            />
          </View>
        </View>
        <View style={styles.ageHeightContainer}>
          <AppText
            title={`Age ${item?.age || 'N/A'}, ${item.height}`}
            color={'gray'}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.fontSize(11),
              styles.detailsText,
            ]}
          />
        </View>
        <View style={styles.occupationActionContainer}>
          <AppText
            title={item?.occupation || 'N/A'}
            style={styles.occupation}
            color={'gray'}
            numberOfLines={1}
            width={'60%'}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.fontSize(11),
            ]}
          />
          <View style={styles.actionContainer}>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleSendInterest(item)}
            >
              <CustomImage source={IMAGES.sendIcon} size={10} resizeMode="contain" />
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.actionButton}
              onPress={() => handleChatBtnClick(item)}
            >
              <CustomImage source={IMAGES.chatIcon} size={10} />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
  

  return (
    <View style={styles.container}>
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Search</Text>
      </View>

      <View style={styles.searchBar}>
        <SVG.magnifyingGlass
          fill={'gray'}
          height={20}
          width={20}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search ..."
          placeholderTextColor={'gray'}
          ref={inputRef}
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
      </View>

      {newUsersLoading ? (
        <Text style={styles.loadingText}>Loading...</Text>
      ) : search.length === 0 && !searchQuery ? (
        <>
          <Text style={styles.recentSearchesText}>Recent Searches</Text>
          <FlatList
            data={recentSearches}
            renderItem={({ item }) => (
              <TouchableOpacity onPress={() => handleRecentSearchClick(item)}>
                <View style={styles.listItem}>
                  <Image source={IMAGES.filter} style={styles.icon} />
                  <Text style={styles.listItemText}>{item}</Text>
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={(item, index) => `${index}`}
          />
        </>
      ) : (
        <FlatList
          data={search}
          renderItem={renderItem}
          numColumns={2}
          keyExtractor={(item, index) => `${item._id}_${index}`}
          columnWrapperStyle={styles.columnWrapper}
          ListEmptyComponent={
            <Text style={styles.noResultsText}>No results found</Text>
          }
        />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: 'white',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10,
    alignSelf: 'center',
    marginBottom: 10,
  },
  heading: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    width: '85%',
    fontWeight: '700',
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 30,
    paddingHorizontal: 10,
    marginVertical: 10,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: 'black',
  },
  icon: {
    width: 20,
    height: 20,
  },
  recentSearchesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color:'black'
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
    color: 'black', 
  },
  columnWrapper: {
    justifyContent: 'space-between', 
    marginBottom: 15,
  },
  cardContainer: {
    width: '48%',
    height: 190,
    backgroundColor: COLORS.dark.white,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.dark.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  newText: {
    color: COLORS.dark.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  infoContainer: {
    paddingHorizontal: 10,
    paddingTop: 7,
  },
  nameOccupationContainer: {
    marginBottom: 5,
  },
  occupation: {
    marginTop: 2,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 5,
  },
  locationText: {
    fontSize: 10,
    marginLeft: 5,
  },
  ageHeightActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  detailsText: {
    flex: 1,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 17,
    height: 17,
    borderRadius: 20,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 10,
  },
  loadingText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  noResultsText: {
    fontSize: 16,
    color: 'black',
    textAlign: 'center',
    marginTop: 20,
  },
  nameLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  ageHeightContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  occupation: {
    marginTop: 2,
    marginBottom: 5,
  },
  nameLocationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  locationWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
    marginLeft: 2, // Reduced margin to remove space
  },
  occupationActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 5,
  },
  occupation: {
    flex: 1,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
  },
  actionButton: {
    width: 17,
    height: 17,
    borderRadius: 20,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 5,
  },
});