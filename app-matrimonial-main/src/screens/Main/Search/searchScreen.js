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
    // Focus the input only the first time the user visits the screen
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
    // Load recent searches from AsyncStorage
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

  const saveRecentSearch = async (query) => {
    try {
      const updatedSearches = [query, ...recentSearches].slice(0, 5);
      await AsyncStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(updatedSearches));
      setRecentSearches(updatedSearches);
    } catch (error) {
      console.error('Error saving recent searches:', error);
    }
  };

  const fetchSuccesStories = async () => {
    if (!searchQuery) return;

    try {
      setNewUsersLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(
        `${API_URL}/user/search?query=${searchQuery}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error(
          response.status === 404 ? 'No results found' : 'Server error'
        );
      }

      const result = await response.json();
      setSearch(result.data || []);
      await saveRecentSearch(searchQuery); // Save recent search
    } catch (error) {
      console.error('Error fetching success stories:', error);
    } finally {
      setNewUsersLoading(false);
    }
  };

  const handleSendInterest = (item) => {
    navigation.navigate('UserDetailsScreen', { userId: item?._id });
  };

  const handleChatBtnClick = (item) => {
    navigation.navigate('ChatScreen')
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
            variant="h6"
            color={COLORS.dark.black}
          />
          <View style={styles.locationContainer}>
            <Icon SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />} />
            <AppText
              title={item.city || 'N/A'}
              color={COLORS.dark.inputBorder}
              extraStyle={[Fonts.PoppinsRegular, styles.locationText]}
            />
          </View>
        </View>
        <View style={styles.ageHeightActionContainer}>
          <AppText
            title={`Age ${item?.age || 'N/A'}, ${item.height}`}
            color={COLORS.dark.inputBorder}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.fontSize(11),
              styles.detailsText,
            ]}
          />
        </View>
        <AppText
          title={item?.occupation || 'N/A'}
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
  );

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.flexrow}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Search</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchBar}>
        <SVG.magnifyingGlass
          fill={COLORS.dark.inputBorder}
          height={20}
          width={20}
          style={{ marginLeft: 10, marginRight: 10 }}
        />
        <TextInput
          style={styles.input}
          placeholder="Search ..."
          ref={inputRef}
          onChangeText={setSearchQuery}
        />
        <TouchableOpacity onPress={fetchSuccesStories}>
          <Image
            source={require('../../../assets/images/leftarrow.png')}
            style={styles.icon}
          />
        </TouchableOpacity>
      </View>

      {/* Conditional Rendering */}
      {search.length === 0 ? (
        // Show Recent Searches when there's no search result
        <>
          <Text style={styles.recentSearchesText}>Recent Searches</Text>
          <FlatList
            data={recentSearches}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Image source={IMAGES.filter} style={styles.icon} />
                <Text style={styles.listItemText}>{item}</Text>
              </View>
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
    marginTop: 20,
    alignSelf: 'center',
    marginBottom: 30,
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
  },
  icon: {
    width: 20,
    height: 20,
  },
  recentSearchesText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  listItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  listItemText: {
    marginLeft: 10,
    fontSize: 16,
  },
  columnWrapper: {
    justifyContent: 'space-between', // Ensure cards are spaced evenly
    marginBottom: 15,
  },
  cardContainer: {
    width: '48%', // Reduce this value to make sure two cards fit in one row
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
    paddingHorizontal: 20,
    paddingTop: 15,
  },
  nameLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  locationText: {
    fontSize: 10,
    marginLeft: 5,
  },
  detailsText: {
    flex: 1,
    marginRight: 10,
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  actionButton: {
    width: 17,
    height: 17,
    borderRadius: 20,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    marginLeft: 10,
  },
});
