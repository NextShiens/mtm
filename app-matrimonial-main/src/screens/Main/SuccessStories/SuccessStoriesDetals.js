import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
} from 'react-native';
import React from 'react';
import {useState, useEffect} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {API_URL} from '../../../../constant';
import {useNavigation} from '@react-navigation/native';
import FastImage from 'react-native-fast-image';

export default function SuccessStoriesDetals({route}) {
  const nav = useNavigation();
  console.log(route.params); // Log the params to check if 'id' is passed
  const {id} = route.params || {};
  const [successStory, setsuccessStory] = useState(null);
  const [newUsersLoading, setNewUsersLoading] = useState(true);
  console.log('id', id);

  console.log('Success Stories:', successStory);

  useEffect(() => {
    fetchSuccesStorie();
  }, []);
  const fetchSuccesStorie = async () => {
    try {
      setNewUsersLoading(true);
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(
        `${API_URL}/user/get-success-storie/66dd954c43773ab522b8de27`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
          },
        },
      );

      if (!response.ok) {
        if (response.status === 404) {
          throw new Error('No new users found');
        } else {
          throw new Error('Something went wrong');
        }
      }

      // Ensure the response is properly parsed as JSON
      const data = await response.json();
      console.log('Success Stories Data:', data); // Check the data structure here
      setsuccessStory(data.singleStory);
      //   console.log('Success Stories:', successStory);
    } catch (error) {
      console.error('Error fetching success stories:', error);
      throw error;
    } finally {
      setNewUsersLoading(false);
    }
  };

  return (
    <View style={style.container}>
      <View style={style.flexrow}>
        <TouchableOpacity onPress={() => nav.goBack()}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={style.heading}>Recent Success Stories</Text>
      </View>
      <ScrollView contentContainerStyle={style.scrollContent}>
        <FastImage
          source={{uri: successStory?.image}} // Updated to use the `image` prop
          style={style.img}
        />
        <View style={{padding: 5}}>
          <Text style={style.name}>{successStory?.title}</Text>
          <Text style={style.des}>
            {successStory?.description.length > 100
              ? `${successStory.description.substring(0, 100)}... Read more`
              : successStory?.description}
          </Text>
        </View>
      </ScrollView>
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
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
    flex: 1,
  },
  img: {
    width:'100%',
    height: 200,
    resizeMode: 'contain',
    borderRadius: 10,
  },
  name: {
    fontSize: 14,
    color: 'black',
    fontWeight: '700',
    marginTop: 10,
  },
  des: {
    fontSize: 13,
    color: '#949494',
    lineHeight: 24,
    marginTop: 10,
  },
});
