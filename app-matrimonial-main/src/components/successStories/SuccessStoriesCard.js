import {View, Text, StyleSheet, Image, TouchableOpacity, Dimensions} from 'react-native';
import React from 'react';
const {width} = Dimensions.get('window'); 

export default function SuccessStoriesCard({image, name, des,onPress}) {
  return (
    <TouchableOpacity style={style.container} onPress={onPress}>
      <Image source={image} />
     <View style={{flex:1}}>
     <Text style={style.name}>{name}</Text>
     <Text style={style.des} numberOfLines={4}>{des}</Text>
     </View>
    </TouchableOpacity>
  );
}

const style = StyleSheet.create({
  container: {
    borderWidth: 0.5,
    borderColor: '#E5E5E5',
    flex: 1,
    backgroundColor: 'white',
    elevation: 3,
    flexDirection:'row',
    gap:10,
    padding:5,
    marginTop:10,
    borderRadius:10,
    width:'97%',
    alignSelf:'center',
    marginBottom:10
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
    width:width-160
  }
});
