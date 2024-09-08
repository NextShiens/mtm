import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React from 'react';
import SuccessStoriesCard from '../../../components/successStories/SuccessStoriesCard';
import {Image} from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function SuccessStories() {
  const nav = useNavigation()
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
          data={arr}
          renderItem={({item, index}) => (
            <SuccessStoriesCard
              {...item}
              index={index}
              image={item.image}
              name={item.name}
              des={item.decription}
              onPress={() => {nav.navigate('SuccessStoriesDetals')}}
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
