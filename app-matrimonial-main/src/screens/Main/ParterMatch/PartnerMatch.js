import React, {useState, useEffect} from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  ActivityIndicator,
  Image,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  RefreshControl,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../../constant';
import {Toast} from '../../../utils/native';
import {
  subscriptionCheck,
  checkLiveChatAvailability,
} from '../../../utils/subscriptionCheck';
import {SVG} from '../../../assets/svg';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import {styles} from './styles';
import AppCard from '../../../components/AppCard/AppCard';
import {IMAGES} from '../../../assets/images';
import CheckBox from '@react-native-community/checkbox';
import GridCard from '../../../components/SuggestedCard/GridCard';
import PartnerCard from '../../../components/PartnerCard/PartnerCard';
const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    padding: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
    color: 'black',
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    borderRadius: 30,
    padding: 10,
    paddingLeft: 10,
    paddingRight: 10,
  },
  button: {
    borderRadius: 30,
    width: '50%',
    padding: 0,
    margin: 0,
    paddingHorizontal: 20,
    paddingVertical: 10,
    color: 'black',
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedButton: {
    backgroundColor: 'rgba(249, 123, 34, 0.1)',
    borderColor: '#F97B22',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 30,
    width: '50%',
    borderWidth: 2,
    fontSize: 16,
    fontWeight: 'bold',
  },

  sliderContainer: {
    marginBottom: 15,
  },
  salaryText: {
    fontSize: 16,
    color: '#F97B22',
  },
  closeButton: {
    marginTop: 20,
    alignItems: 'center',
  },
  closeButtonText: {
    fontSize: 16,
    color: COLORS.dark.secondary,
  },
  applyButton: {
    backgroundColor: COLORS.dark.secondary,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  label: {
    fontSize: 18,
    marginBottom: 10,
  },
  sliderContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: -10,
  },
  value: {
    fontSize: 16,
    color: 'black',
  },
  leftValue: {
    position: 'absolute',
    left: 0,
  },
  rightValue: {
    position: 'absolute',
    right: 0,
  },
  ChildContainer: {
    margin: 5,
    backgroundColor: '#F8F8F8',
    paddingBottom: 25,
    borderRadius: 10,
    padding: 10,
  },
  ChildContainer1: {
    backgroundColor: '#F8F8F8',
    margin: 5,
    paddingBottom: 25,
    borderRadius: 10,
    padding: 10,
  },
  buttonRow2: {
    width: '100%',
    flexDirection: 'row',
  },
  button2: {
    width: '30%',
    backgroundColor: '#F8F8F8',
    marginLeft: 10,
    borderRadius: 30,
    padding: 10,
    borderWidth: 2,
    borderColor: 'white',
  },
  selectedButton2: {
    width: '30%',
    backgroundColor: 'rgba(249, 123, 34, 0.1)',
    borderWidth: 2,
    borderColor: '#F97B22',
    borderRadius: 30,
    padding: 10,
  },
  Bell_Icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginRight: '1%',
  },
});
const PartnerMatch = ({navigation, route}) => {
  const [matchedUsers, setMatchedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [matchType, setMatchType] = useState('newUsers');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState(route.params?.searchTerm || '');
  const [currentUser, setCurrentUser] = useState({});
  const [showFilters, setShowFilters] = useState(false);
  // const [selectedGender, setSelectedGender] = useState('');
  // const [selectedMaritalStatus, setSelectedMaritalStatus] = useState('');
  // const [selectedLanguage, setSelectedLanguage] = useState('');
  // const [salaryRange, setSalaryRange] = useState([0, 10000000]);
  const [refreshing, setRefreshing] = useState(false);
  const [selectedGender, setSelectedGender] = useState(null);
  const [selectedMaritalStatus, setSelectedMaritalStatus] = useState(null);
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [salaryRange, setSalaryRange] = useState([0, 10000000]);
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
    };
  }, []);

  useEffect(() => {
    filterUsers();
  }, [
    searchTerm,
    matchedUsers,
    selectedGender,
    selectedMaritalStatus,
    selectedLanguage,
    salaryRange,
  ]);

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
      // console.log('response', data);
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
  const handleSearchFocus = () => {
    navigation.navigate('SearchScreen'); // Replace with your search screen name
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const onSubmitFilter = () => {
    filterUsers();
    setShowFilters(false);
  };

  const handlesearchFunctionality = text => {
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
          authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          userId: viewedUserId,
        }),
      });

      if (!response.ok) {
        let errorMessage =
          'An error occurred while adding user to recently viewed';
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
        data: data,
      };
    } catch (error) {
      console.error('Error adding user to recently viewed:', error);
      return {
        success: false,
        message: error.message || 'An unexpected error occurred',
        error: error,
      };
    }
  }
  const clearFilters = () => {
    setSelectedGender('');
    setSelectedMaritalStatus('');
    setSelectedLanguage('');
    setSalaryRange([0, 10000000]);
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 2000);
  }, []);
  const closeFilters = () => {
    clearFilters();
    setShowFilters(false);
    filterUsers(); // Apply the cleared filters
  };
  const filterUsers = () => {
    let filtered = matchedUsers;

    // Apply search term filter
    if (searchTerm) {
      const lowercasedSearch = searchTerm.toLowerCase();
      filtered = filtered.filter(user => {
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
          user.workLocation?.toLowerCase().includes(lowercasedSearch)
        );
      });
    }

    if (selectedGender) {
      filtered = filtered.filter(
        user => user.gender?.toLowerCase() == selectedGender.toLowerCase(),
      );
    }

    // Apply marital status filter
    if (selectedMaritalStatus) {
      filtered = filtered.filter(
        user =>
          user.maritalStatus?.toLowerCase() ==
          selectedMaritalStatus.toLowerCase(),
      );
    }

    // Apply language filter
    if (selectedLanguage) {
      filtered = filtered.filter(
        user =>
          user.motherTongue?.toLowerCase() == selectedLanguage.toLowerCase(),
      );
    }

    // Apply salary range filter
    filtered = filtered.filter(user => {
      // console.log('usersalary', user.annualIncome);
      const userSalary = parseInt(user?.annualIncome?.replace(/,/g, '')) || 0;
      return userSalary >= salaryRange[0] && userSalary <= salaryRange[1];
    });

    setFilteredUsers(filtered);
  };

  const handlesearchBtn = () => {
    // Implement search button functionality here if needed
  };

  const style = styles;

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="xl" color={COLORS.dark.primary} />
        <Text style={style.text}>Loading....</Text>
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
    <ScrollView
      refreshControl={
        <RefreshControl
          refreshing={refreshing}
          onRefresh={onRefresh}
          colors={[COLORS.dark.primary]}
        />
      }>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title={LABELS.matches || 'Matches'}
          textColor={COLORS.dark.black}
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
      <Space mT={15} />
      <View style={style.searchBoxContainer}>
        <AppInput
          iconLeft={<SVG.magnifyingGlass fill={'black'} />}
          extraStyle={{
            textInputCont: [style.textInputCont],
          }}
          placeholder={LABELS.searchHere || 'Search here'}
          onFocus={handleSearchFocus}
          value={searchTerm}
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
        <View style={style.container}>
          <View style={style.modalContent}>
            <ScrollView>
              {/* Gender Filter */}
              <View style={style.ChildContainer}>
                <Text style={style.sectionTitle}>Gender</Text>
                <View style={style.line} />
                <View style={style.buttonRow}>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedGender === 'all'}
                      onValueChange={() => setSelectedGender('all')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                      style={{}}
                    />
                    <Text style={style.checkboxLabel}>All</Text>
                  </View>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedGender === 'male'}
                      onValueChange={() => setSelectedGender('male')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Male</Text>
                  </View>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedGender === 'female'}
                      onValueChange={() => setSelectedGender('female')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Female</Text>
                  </View>
                </View>
              </View>

              {/* Marital Status Filter */}
              <View style={style.ChildContainer1}>
                <Text style={style.sectionTitle}>Marital Status</Text>
                <View style={style.line} />
                <View style={[style.buttonRow]}>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedMaritalStatus === 'married'}
                      onValueChange={() => setSelectedMaritalStatus('married')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Married</Text>
                  </View>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedMaritalStatus === 'unmarried'}
                      onValueChange={() =>
                        setSelectedMaritalStatus('unmarried')
                      }
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Unmarried</Text>
                  </View>
                </View>
              </View>

              {/* Language Filter */}
              <View style={style.ChildContainer2}>
                <Text style={style.sectionTitle}>Language</Text>
                <View style={style.line} />
                <View style={style.buttonRow2}>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedLanguage === 'english'}
                      onValueChange={() => setSelectedLanguage('english')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>English</Text>
                  </View>
                  <View style={[style.checkboxContainer, {marginRight: 20}]}>
                    <CheckBox
                      value={selectedLanguage === 'urdu'}
                      onValueChange={() => setSelectedLanguage('urdu')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Urdu</Text>
                  </View>
                </View>
                <View style={style.buttonRow2}>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedLanguage === 'hindi'}
                      onValueChange={() => setSelectedLanguage('hindi')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Hindi</Text>
                  </View>
                  <View style={style.checkboxContainer}>
                    <CheckBox
                      value={selectedLanguage === 'marathi'}
                      onValueChange={() => setSelectedLanguage('marathi')}
                      tintColors={{true: '#F97B22', false: 'gray'}}
                    />
                    <Text style={style.checkboxLabel}>Marathi</Text>
                  </View>
                </View>
              </View>

              {/* Salary Range Filter */}
              <Text style={style.sectionTitle}>Salary Range</Text>
              <Text style={style.salaryText}>
                {salaryRange[0]} - {salaryRange[1]}
              </Text>
              <View style={style.sliderContainer}>
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
                    width: '100%',
                  }}
                  markerStyle={{
                    backgroundColor: 'white',
                    borderWidth: 2,
                    borderColor: '#F97B22',
                    padding: 5,
                    marginTop: 5,
                  }}
                />
              </View>

              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'center',
                  gap: 20,
                }}>
                <Pressable style={style.closeButton} onPress={closeFilters}>
                  <Text style={style.closeButtonText}>Close Filters</Text>
                </Pressable>
                <TouchableOpacity
                  style={style.applyButton}
                  onPress={onSubmitFilter}>
                  <Text style={style.applyButtonText}>Apply Filter</Text>
                </TouchableOpacity>
              </View>
            </ScrollView>
          </View>
        </View>
      </Modal>

      <Space mT={5} />
      {/* <View style={STYLES.pH(HORIZON_MARGIN)}>
        {filteredUsers.length > 0 ? (
          filteredUsers.map(user => (
            <AppCard
              key={user?._id || Math.random().toString()}
              isBtnShown={true}
              btnType={'requestsubmission'}
              data={user}
              onPressBtn1={async () => {
                addToRecentlyViewed(user?._id);
                if (await subscriptionCheck(user)) {
                  navigation.navigate('UserDetailsScreen', {userId: user?._id});
                } else {
                  Toast('Your profile view limit exceeded.');
                }
              }}
              onPressBtn2={async () => {
                if (await checkLiveChatAvailability()) {
                  navigation.navigate('ChatScreen', {
                    userId: user?._id,
                    roomId: `${user?._id}_${currentUser.user._id}`,
                    user: user,
                  });
                } else {
                  Toast("You can't chat buy premium plan.");
                }
              }}
            />
          ))
        ) : (
          <AppText
            title="No matched users found"
            color={COLORS.dark.secondary}
          />
        )}
      </View> */}
      <View style={[STYLES.pL(6)]}>
        {loading ? (
          <ActivityIndicator size="large" color={COLORS.dark.primary} />
        ) : filteredUsers && filteredUsers.length > 0 ? (
          <PartnerCard data={filteredUsers} />
        ) : (
          <Text style={styles.noDataText}>No matched users found</Text>
        )}
      </View>
    </ScrollView>
  );
};

export default PartnerMatch;
