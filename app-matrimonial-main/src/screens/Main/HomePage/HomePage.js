import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  Modal,
  Pressable,
  Image,
} from 'react-native';
import MultiSlider from '@ptomasroos/react-native-multi-slider';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import CustomImage from '../../../components/CustomImage/CustomImage';
import HorizontalCard from '../../../components/HorizontalCard/HorizontalCard';
import HorizontalScreen from '../../../components/HorizontalScroll/HorizontalScreen';
import SnapCarousel from '../../../components/SnapCarousel/SnapCarousel';
import Space from '../../../components/Space/Space';
import { API_URL } from '../../../../constant';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import {
  HorizontalCardData,
  carouselData,
  filterOptions,
  usersData,
} from '../../../data/appData';
import { LABELS } from '../../../labels';
import { Toast } from '../../../utils/native';
import { styles } from './styles';

const filterStyles = StyleSheet.create({
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
    shadowOffset: { width: 0, height: 2 },
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

const HomePage = () => {
  const navigation = useNavigation();
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

  useEffect(() => {
    const fetchRecentlyViewed = async () => {
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/getRecentViewed`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('Users not found');
          } else {
            throw new Error('Something went wrong');
          }
        }

        const { recentlyViewed } = await response.json();
        console.log('Recently Viewed:', recentlyViewed);
        setRecentlyViewed(recentlyViewed);
      } catch (error) {
        setError(error.message);
      }
    };
    const fetchNewUsers = async () => {
      try {
        const token = await AsyncStorage.getItem('AccessToken');
        const response = await fetch(`${API_URL}/user/newUsers`, {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          if (response.status === 404) {
            throw new Error('No new users found');
          } else {
            throw new Error('Something went wrong');
          }
        }

        const { newUsers } = await response.json();
        setNewUsers(newUsers)
      } catch (error) {
        console.error('Error fetching new users:', error);
        throw error;
      }
    };
    fetchNewUsers();
    fetchRecentlyViewed();
  }, []);
  

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const handleItemPress = (item) => {
    setSelectedCategory(item.value);
    console.log('Selected Category:', item.value);
    
    if (item.value === 'Matches') {
      navigation.navigate('PartnerMatch', { selectedCategory: item.value });
    }
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
    navigation.navigate('PartnerMatch', { filteredData: { selectedGender, selectedMaritalStatus, selectedLanguage, range } });
    setShowFilters(false);
  };

  return (
    <ScrollView style={[STYLES.flex1, { backgroundColor: 'white' }]}>
      <View style={styles.container}>
        <View style={styles.headerContainer}>
          <AppHeader
            iconLeft={
              <TouchableOpacity onPress={() => {
                navigation.openDrawer();
              }}>
                <CustomImage
                  source={IMAGES.menuIcon}
                  size={17}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            }
            iconRight={
              <TouchableOpacity onPress={handleRightIconPress}>
                <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
              </TouchableOpacity>
            }
          />
        </View>

        <Space mT={20} />
        <View style={styles.contentContainer}>
          <View style={styles.searchBoxContainer}>
            <AppInput
              iconLeft={
                <SVG.magnifyingGlass
                  fill={COLORS.dark.inputBorder}
                  height={15}
                  width={15}
                />
              }
              extraStyle={{ textInputCont: [styles.searchInputCont] }}
              placeholder={LABELS.searchHere}
              onChangeText={handleSearch}
            />
            <TouchableOpacity
              style={styles.filterBtn}
              activeOpacity={0.8}
              onPress={() => setShowFilters(true)}>
              <CustomImage
                source={IMAGES.filterIcon}
                size={17}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          </View>

          <Space mT={20} />

          <Modal
            animationType="slide"
            transparent={true}
            visible={showFilters}
            onRequestClose={() => setShowFilters(false)}>
            <View style={filterStyles.container}>
              <View style={filterStyles.modalContent}>
                <ScrollView>
                  <View style={filterStyles.ChildContainer}>
                    <Text style={filterStyles.sectionTitle}>Gender</Text>
                    <View style={filterStyles.buttonRow}>
                      <TouchableOpacity
                        style={
                          selectedGender === 'male'
                            ? filterStyles.selectedButton
                            : filterStyles.button

                        }
                        onPress={() => setSelectedGender('male')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>Male</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          selectedGender === 'female'
                            ? filterStyles.selectedButton
                            : filterStyles.button
                        }
                        onPress={() => setSelectedGender('female')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>Female</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={filterStyles.ChildContainer1}>
                    <Text style={filterStyles.sectionTitle}>Marital Status</Text>
                    <View style={filterStyles.buttonRow}>
                      <TouchableOpacity
                        style={
                          selectedMaritalStatus === 'married'
                            ? filterStyles.selectedButton
                            : filterStyles.button
                        }
                        onPress={() => setSelectedMaritalStatus('married')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>Married</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          selectedMaritalStatus === 'unmarried'
                            ? filterStyles.selectedButton
                            : filterStyles.button
                        }
                        onPress={() => setSelectedMaritalStatus('unmarried')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>Unmarried</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <View style={filterStyles.ChildContainer2}>
                    <Text style={filterStyles.sectionTitle}>Language</Text>
                    <View style={filterStyles.buttonRow2}>
                      <TouchableOpacity
                        style={
                          selectedLanguage === 'english'
                            ? filterStyles.selectedButton2
                            : filterStyles.button2
                        }
                        onPress={() => setSelectedLanguage('english')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>English</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          selectedLanguage === 'urdu'
                            ? filterStyles.selectedButton2
                            : filterStyles.button2
                        }
                        onPress={() => setSelectedLanguage('urdu')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>Urdu</Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={
                          selectedLanguage === 'hindi'
                            ? filterStyles.selectedButton2
                            : filterStyles.button2
                        }
                        onPress={() => setSelectedLanguage('hindi')}>
                        <Text style={{ color: '#F97B22', textAlign: 'center', fontWeight: 'bold', }}>Hindi</Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                  <Text style={filterStyles.sectionTitle}>Salary Range</Text>
                  <Text style={filterStyles.salaryText}>
                    {range[0]} - {range[1]}
                  </Text>
                  <View style={filterStyles.sliderContainer}>
                    <MultiSlider
                      values={range}
                      min={0}
                      max={1000000}
                      step={100}
                      onValuesChange={setRange}
                      selectedStyle={{
                        backgroundColor: '#F97B22',
                      }}
                      trackStyle={{
                        height: 6,
                      }}
                      markerStyle={{
                        backgroundColor: 'white',
                        borderWidth: 2,
                        borderColor: '#F97B22',
                        padding: 5,

                      }}
                    />
                  </View>
                  <TouchableOpacity
                    style={filterStyles.applyButton}
                    onPress={onSubmitFilter}>
                    <Text style={filterStyles.applyButtonText}>
                      Apply Filter
                    </Text>
                  </TouchableOpacity>
                </ScrollView>

                <Pressable
                  style={filterStyles.closeButton}
                  onPress={() => setShowFilters(false)}>
                  <Text style={filterStyles.closeButtonText}>
                    Close Filters
                  </Text>
                </Pressable>
              </View>
            </View>
          </Modal>

          <Space mT={20} />

          <HorizontalScreen data={filterOptions} onPress={handleItemPress} />
          <Space mT={20} />

          <View style={{ paddingHorizontal: 15, borderRadius: 20 }}>
            <SnapCarousel data={newUsers} />
          </View>

          <Space mT={20} />

          <View style={[STYLES.pL(6)]}>
            {
              recentlyViewed && recentlyViewed.length > 0 ? (
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
                <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                  <Text>No recently viewed users</Text>
                </View>
              )
            }
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default HomePage;