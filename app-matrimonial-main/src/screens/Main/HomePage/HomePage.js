import React, {useEffect, useState} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  RefreshControl,
  Modal,
  Pressable,
  Image,
  ActivityIndicator,
  FlatList,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import CustomImage from '../../../components/CustomImage/CustomImage';
import HorizontalCard from '../../../components/HorizontalCard/HorizontalCard';
import HorizontalScreen from '../../../components/HorizontalScroll/HorizontalScreen';
import SnapCarousel from '../../../components/SnapCarousel/SnapCarousel';
import Space from '../../../components/Space/Space';
import {API_URL} from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useNavigation} from '@react-navigation/native';
import Svg, {Path} from 'react-native-svg';
import {
  HorizontalCardData,
  carouselData,
  filterOptions,
  usersData,
} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {Toast} from '../../../utils/native';
import {styles} from './styles';
import GridCard from '../../../components/SuggestedCard/GridCard';
import SuccessStoriesCard from '../../../components/successStories/SuccessStoriesCard';
import CheckBox from '@react-native-community/checkbox';

const MenuIcon = ({size = 24, color = 'black'}) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M3 12h18M3 6h18M3 18h18"
      stroke={color}
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </Svg>
);
const filterStyles = StyleSheet.create({
  textInputCont: {
    width: '80%',
    backgroundColor: COLORS.dark.searchBox,
    borderWidth: 0,
  },
  headerContainer: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
  searchBoxContainer: {
    width: '100%',
    paddingHorizontal: HORIZON_MARGIN,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  searchBox: {
    height: 50,
    width: '75%',
    backgroundColor: COLORS.dark.lightGrey,
  },
  filterBtn: {
    height: 50,
    width: '15%',
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    height: 155,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.dark.text,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  imgContainer: {
    width: '35%',
    borderRadius: 20,
  },
  contentContainer: {
    justifyContent: 'center',
    paddingHorizontal: HORIZON_MARGIN,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalScrollContainer: {
    width: '100%',
    height: 150,
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
  sendIconBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIconBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.dark.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyIconBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.dark.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  sendInterestBtn: {
    width: '55%',
    height: 40,
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 5,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBtn: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.primary,
    borderRadius: 5,
  },
  Bell_Icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginRight: '1%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  ChildContainer: {
    marginBottom: 20,
  },
  ChildContainer1: {
    marginBottom: 20,
  },
  ChildContainer2: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
    color: '#333',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonRow2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    // Define your button styles
  },
  selectedButton: {
    // Define your selected button styles
  },
  button2: {
    // Define your button2 styles
  },
  selectedButton2: {
    // Define your selected button2 styles
  },
  sliderContainer: {
    marginVertical: 20,
    paddingHorizontal: 10,
    alignItems: 'center',
  },
  salaryText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: 'black',
  },
  applyButton: {
    backgroundColor: '#F97B22',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    borderColor: '#F97B22',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 30,
    borderWidth: 1,
  },
  closeButtonText: {
    color: '#F97B22',
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    height: 2,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
  text: {
    fontSize: 12,
    color: '#ff385c',
  },
});

const HomePage = () => {
  const navigation = useNavigation();
  const [selectedFilter, setSelectedFilter] = useState('1');
  const [selectedCategory, setSelectedCategory] = useState('New Join');
  const [error, setError] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredData, setFilteredData] = useState(usersData);
  const [showFilters, setShowFilters] = useState(false);
  const [selectedGender, setSelectedGender] = useState('');
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('');
  const [selectedLanguage, setSelectedLanguage] = useState('');
  const [range, setRange] = useState([0, 1000000]);
  const [recentlyViewed, setRecentlyViewed] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [recentlyViewedLoading, setRecentlyViewedLoading] = useState(true);
  const [newUsersLoading, setNewUsersLoading] = useState(true);
  const [salaryRange, setSalaryRange] = useState([0, 10000000]);
  const [refreshing, setRefreshing] = React.useState(false);
  const [matchType, setMatchType] = useState('newUsers');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [successStories, setSuccessStories] = useState([]);

  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        setRecentlyViewedLoading(true);
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/getRecentViewed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Users not found');
          } else {
            throw new Error('Something went wrong');
          }
        }

        const {recentlyViewed} = await response.json();
        console.log('Recently Viewed:', recentlyViewed);
        setRecentlyViewed(recentlyViewed);
      } catch (error) {
        setError(error.message);
      } finally {
        setRecentlyViewedLoading(false);
      }
    };

    const fetchNewUsers = async () => {
      try {
        setNewUsersLoading(true);
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/newUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No new users found');
          } else {
            throw new Error('Something went wrong');
          }
        }

        const {newUsers} = await response.json();
        setNewUsers(newUsers);
      } catch (error) {
        console.error('Error fetching new users:', error);
        throw error;
      } finally {
        setNewUsersLoading(false);
      }
    };

    const fetchSuccesStories = async () => {
      try {
        setNewUsersLoading(true);
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/get-success-stories`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No new users found');
          } else {
            throw new Error('Something went wrong');
          }
        }

        const {successStories} = await response.json();
        console.log('stories', successStories);
        setSuccessStories(successStories);
      } catch (error) {
        console.error('Error fetching Success stories:', error);
        throw error;
      } finally {
        setNewUsersLoading(false);
      }
    };
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

    Promise.all([
      fetchNewUsers(),
      fetchRecentlyViewed(),
      fetchMatchedUsers(),
      fetchSuccesStories(),
    ]).then(() => {
      setLoading(false);
    });
  }, [matchType]);

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleItemPress = async item => {
    setSelectedCategory(item.value);

    if (item.value == 'Matches' || item.value == 'Nearest me') {
      navigation.navigate('PartnerMatch');
    }
  };

  const handleSearchFocus = () => {
    // Navigate to your search screen
    navigation.navigate('SearchScreen'); // Replace with your search screen name
  };

  const handleSearch = query => {
    setSearchQuery(query);
  };

  const handleSearchBtn = () => {
    navigation.navigate('ProfessionPreferenceScreen');
  };

  const showMoreUserHandler = () => {
    navigation.navigate('SavedUserScreen');
  };

  const sendInterestHandler = () => {
    navigation.navigate('UserDetailsScreen');
  };

  const chatPressHandler = () => {
    navigation.navigate('ChatScreen');
  };

  const onSubmitFilter = () => {
    navigation.navigate('PartnerMatch', {
      filteredData: {
        selectedGender,
        selectedMaritalStatus,
        selectedLanguage,
        range,
      },
    });
    setShowFilters(false);
  };

  const clearFilters = () => {
    setSelectedGender('');
    setSelectedMaritalStatus('');
    setSelectedLanguage('');
    setSalaryRange([0, 10000000]);
  };

  const closeFilters = () => {
    clearFilters();
    setShowFilters(false);
  };

  const arr = [
    {
      id: 1,
      image: require('../../../assets/images/image.png'),
      name: 'Lorem ipsum dolor',
      decription:
        'Lorem ipsum dolor sit amet consectetur. Risus nulla auctor tellus quam enim amet lorem. Consectetur aliquet nunc nunc.',
    },
    {
      id: 1,
      image: require('../../../assets/images/image.png'),
      name: 'Lorem ipsum dolor',
      decription:
        'Lorem ipsum dolor sit amet consectetur. Risus nulla auctor tellus quam enim amet lorem. Consectetur aliquet nunc nunc.',
    },
    {
      id: 1,
      image: require('../../../assets/images/image.png'),
      name: 'Lorem ipsum dolor',
      decription:
        'Lorem ipsum dolor sit amet consectetur. Risus nulla auctor tellus quam enim amet lorem. Consectetur aliquet nunc nunc.',
    },
    {
      id: 1,
      image: require('../../../assets/images/image.png'),
      name: 'Lorem ipsum dolor',
      decription:
        'Lorem ipsum dolor sit amet consectetur. Risus nulla auctor tellus quam enim amet lorem. Consectetur aliquet nunc nunc.',
    },
    {
      id: 1,
      image: require('../../../assets/images/image.png'),
      name: 'Lorem ipsum dolor',
      decription:
        'Lorem ipsum dolor sit amet consectetur. Risus nulla auctor tellus quam enim amet lorem. Consectetur aliquet nunc nunc.',
    },
  ];

  return (
    <ScrollView
      style={[STYLES.flex1, {backgroundColor: 'white'}]}
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.dark.primary]}
        />
      }>
      <View style={styles.headerContainer}>
        <AppHeader
          iconLeft={
            <TouchableOpacity
              onPress={() => {
                navigation.openDrawer();
              }}>
              <MenuIcon />
            </TouchableOpacity>
          }
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <Image
                source={IMAGES.Bell}
                style={{width: 25, height: 25}}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <Space mT={20} />
      <View style={styles.contentContainer}>
        <View style={styles.searchBoxContainer}>
          <AppInput
            // iconLeft={
            //   <SVG.magnifyingGlass
            //     fill={COLORS.dark.inputBorder}
            //     height={15}
            //     width={15}
            //   />
            // }
            extraStyle={{textInputCont: [styles.searchInputCont]}}
            placeholder={LABELS.searchHere}
            onFocus={handleSearchFocus}
          />
          <TouchableOpacity
            style={styles.filterBtn}
            activeOpacity={0.8}
            onPress={() => setShowFilters(true)}>
          <Image
            source={IMAGES.filterIcon}
            resizeMode={'contain'}
            style={{width:20,height:20}}
          />
          </TouchableOpacity>
        </View>

        <Space mT={20} />

        <Modal
          animationType="slide"
          transparent={true}
          visible={showFilters}
          onRequestClose={closeFilters}>
          <View style={filterStyles.container}>
            <View style={filterStyles.modalContent}>
              <ScrollView>
                {/* Gender Filter */}
                <View style={filterStyles.ChildContainer}>
                  <Text style={filterStyles.sectionTitle}>Gender</Text>
                  <View style={filterStyles.line} />
                  <View style={filterStyles.buttonRow}>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedGender === 'all'}
                        onValueChange={() => setSelectedGender('all')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                        style={{}}
                      />
                      <Text style={filterStyles.checkboxLabel}>All</Text>
                    </View>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedGender === 'male'}
                        onValueChange={() => setSelectedGender('male')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Male</Text>
                    </View>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedGender === 'female'}
                        onValueChange={() => setSelectedGender('female')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Female</Text>
                    </View>
                  </View>
                </View>

                {/* Marital Status Filter */}
                <View style={filterStyles.ChildContainer1}>
                  <Text style={filterStyles.sectionTitle}>Marital Status</Text>
                  <View style={filterStyles.line} />
                  <View style={[filterStyles.buttonRow]}>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedMaritalStatus === 'married'}
                        onValueChange={() =>
                          setSelectedMaritalStatus('married')
                        }
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Married</Text>
                    </View>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedMaritalStatus === 'unmarried'}
                        onValueChange={() =>
                          setSelectedMaritalStatus('unmarried')
                        }
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Unmarried</Text>
                    </View>
                  </View>
                </View>

                {/* Language Filter */}
                <View style={filterStyles.ChildContainer2}>
                  <Text style={filterStyles.sectionTitle}>Language</Text>
                  <View style={filterStyles.line} />
                  <View style={filterStyles.buttonRow2}>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedLanguage === 'english'}
                        onValueChange={() => setSelectedLanguage('english')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>English</Text>
                    </View>
                    <View
                      style={[
                        filterStyles.checkboxContainer,
                        {marginRight: 20},
                      ]}>
                      <CheckBox
                        value={selectedLanguage === 'urdu'}
                        onValueChange={() => setSelectedLanguage('urdu')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Urdu</Text>
                    </View>
                  </View>
                  <View style={filterStyles.buttonRow2}>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedLanguage === 'hindi'}
                        onValueChange={() => setSelectedLanguage('hindi')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Hindi</Text>
                    </View>
                    <View style={filterStyles.checkboxContainer}>
                      <CheckBox
                        value={selectedLanguage === 'marathi'}
                        onValueChange={() => setSelectedLanguage('marathi')}
                        tintColors={{true: '#F97B22', false: 'gray'}}
                      />
                      <Text style={filterStyles.checkboxLabel}>Marathi</Text>
                    </View>
                  </View>
                </View>

                {/* Salary Range Filter */}
                <Text style={filterStyles.sectionTitle}>Salary Range</Text>
                <Text style={filterStyles.salaryText}>
                  {salaryRange[0]} - {salaryRange[1]}
                </Text>
                <View style={filterStyles.headerContainer}>
                  <MultiSlider
                    values={salaryRange}
                    min={0}
                    max={10000000}
                    step={100}
                    onValuesChange={setSalaryRange}
                    selectedStyle={{
                      backgroundColor: '#F97B22',
                    }}
                    trackStyle={{
                      height: 6,
                      width: '80%',
                      alignSelf: 'center',
                    }}
                    markerStyle={{
                      backgroundColor: 'white',
                      borderWidth: 2,
                      borderColor: '#F97B22',
                      padding: 5,
                      marginLeft: 14,
                      marginTop: 5,
                    }}
                  />
                </View>

                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'center',
                    gap: 20,
                    marginTop: 20,
                  }}>
                  <Pressable
                    style={filterStyles.closeButton}
                    onPress={closeFilters}>
                    <Text style={filterStyles.closeButtonText}>
                      Close Filters
                    </Text>
                  </Pressable>
                  <TouchableOpacity
                    style={filterStyles.applyButton}
                    onPress={onSubmitFilter}>
                    <Text style={filterStyles.applyButtonText}>
                      Apply Filter
                    </Text>
                  </TouchableOpacity>
                </View>
              </ScrollView>
            </View>
          </View>
        </Modal>

        <Space mT={20} />

        <HorizontalScreen
          data={filterOptions}
          onPress={handleItemPress}
          initialSelectedItem={selectedFilter}
        />

        <Space mT={20} />

        <View style={{paddingHorizontal: 15, borderRadius: 20}}>
          {newUsersLoading ? (
            <ActivityIndicator
              size="large"
              style={{objectFit: 'cover'}}
              color={COLORS.dark.primary}
            />
          ) : (
            <SnapCarousel data={newUsers} />
          )}
        </View>

        <Space mT={20} />

        <View style={[STYLES.pL(6)]}>
          {loading ? (
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          ) : matchedUsers && matchedUsers.length > 0 ? (
            <GridCard data={matchedUsers.slice(0, 8)} />
          ) : (
            <Text style={styles.noDataText}>No matched users found</Text>
          )}
        </View>
        <Space mT={10} />

        <View style={[STYLES.pL(6)]}>
          {recentlyViewedLoading ? (
            <ActivityIndicator size="large" color={COLORS.dark.primary} />
          ) : recentlyViewed && recentlyViewed.length > 0 ? (
            <HorizontalCard
              data={recentlyViewed}
              onLinkPress={showMoreUserHandler}
              onSendInterest={sendInterestHandler}
              onChatBtnClick={chatPressHandler}
              onVerifyBtnClick={() => {
                Toast('This account is verified');
              }}
            />
          ) : (
            <Text style={styles.noDataText}>No recently viewed users</Text>
          )}
        </View>
        <View style={{width: '100%', paddingHorizontal: 7}}>
          {/* Header with title and See All */}
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: 10,
            }}>
            <Text style={{fontSize: 18, fontWeight: 'bold', color: '#333', marginLeft:8}}>
              Success Stories
            </Text>
            <TouchableOpacity
              onPress={() => navigation.navigate('SuccessStories')}>
              <Text style={{color: 'rgba(249, 123, 34, 1)', fontSize: 16}}>
                See All
              </Text>
            </TouchableOpacity>
          </View>

          {/* FlatList for horizontal cards */}
          <FlatList
            horizontal
            data={successStories}
            renderItem={({item, index}) => (
              console.log('item', item),
              <View>
                <SuccessStoriesCard
                  {...item}
                  index={index}
                  image={item.image}
                  name={item.title}
                  des={item.description}
                  onPress={() => {
                    navigation.navigate('SuccessStoriesDetals', {id: item._id});
                  }}
                />
              </View>
            )}
            keyExtractor={(item, index) => index.toString()}
          />
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;
