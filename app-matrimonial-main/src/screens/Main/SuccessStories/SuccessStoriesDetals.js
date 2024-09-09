import {
    View,
    Text,
    StyleSheet,
    TouchableOpacity,
    Image,
    ScrollView,
  } from 'react-native';
  import React from 'react';
  import { useNavigation } from '@react-navigation/native';
  
  export default function SuccessStoriesDetals() {
    const nav = useNavigation()
    return (
      <View style={style.container}>
        <View style={style.flexrow}>
          <TouchableOpacity
            onPress={() => {
              nav.goBack();
            }}>
            <Image source={require('../../../assets/images/leftarrow.png')} />
          </TouchableOpacity>
          <Text style={style.heading}>Recent Success Stories</Text>
        </View>
        <ScrollView contentContainerStyle={style.scrollContent}>
          <Image
            source={require('../../../assets/images/image.png')}
            style={style.img}
          />
          <View style={{padding:5}}>
            <Text style={style.name}>Lorem ipsum dolor</Text>
            <Text style={style.des}>
              Lorem ipsum dolor sit amet consectetur. Risus nulla auctor tellus
              quam enim amet lorem. Consectetur aliquet nunc nunc. Lorem ipsum
              dolor sit amet consectetur. Risus nulla auctor tellus quam enim amet
              lorem. Consectetur aliquet nunc nunc. Lorem ipsum dolor sit amet
              consectetur. Risus nulla auctor tellus quam enim amet lorem.
              Consectetur aliquet nunc nunc. Lorem ipsum dolor sit amet
              consectetur. Risus nulla auctor tellus quam enim amet lorem.
              Consectetur aliquet nunc nunc. Lorem ipsum dolor sit amet
              consectetur. Risus nulla auctor tellus quam enim amet lorem.
              Consectetur aliquet nunc nunc. Read more....
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
      width: '100%',
      height: 300,
      marginTop: 20,
      borderRadius: 10,
    },
    name:{
      fontSize:14,
      color:'black',
      fontWeight:'700',
      marginTop:10
    },
    des:{
      fontSize:13,
      color:'#949494',
      lineHeight: 24,
      marginTop:10
    }
  });
  