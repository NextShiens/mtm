import {
    View,
    Text,
    StyleSheet,
    FlatList,
    TouchableOpacity,
    ScrollView,
  } from 'react-native';
  import React, { useEffect } from 'react';
  import {useState} from 'react';
  import SuccessStoriesCard from '../../../components/successStories/SuccessStoriesCard';
  import {Image} from 'react-native';
  import AsyncStorage from '@react-native-async-storage/async-storage';
  import { useNavigation } from '@react-navigation/native';
  import { API_URL } from '../../../../constant';
  
  
  
  export default function SuccessStories() {
    const nav = useNavigation();
    const [successStories, setSuccessStories] = useState([]);
    const [newUsersLoading, setNewUsersLoading] = useState(true);
  
  
  
  
    useEffect(() => { fetchSuccesStories(); }, []);
  
  
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
      <View style={style.container}>
        <View style={style.flexrow}>
          <TouchableOpacity onPress={() => {nav.goBack()}}>
            <Image source={require('../../../assets/images/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={style.heading}>Recent Success Stories</Text>
        </View>
        <ScrollView contentContainerStyle={style.scrollContent}>
          <FlatList
            data={successStories}
            renderItem={({item, index}) => (
              <SuccessStoriesCard
                {...item}
                index={index}
                image={item.image||require('../../../assets/images/leftarrow.png')}
                name={item.title}
                des={item.description}
                onPress={() => {
                    if (item._id) {
                      nav.navigate('SuccessStoriesDetails', { id: item._id });
                    } else {
                      console.log('Item ID is undefined');
                    }
                  }}
              />
            )}
          />
        </ScrollView>
      </View>
    );
  }
  
  const style = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#F5F5F5'
    },
    flexrow: {
      flexDirection: 'row',
      alignItems: 'center',
      marginTop: 20,
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
    scrollContent: {
      paddingHorizontal: 10,
      flex:1
    },
  });
  