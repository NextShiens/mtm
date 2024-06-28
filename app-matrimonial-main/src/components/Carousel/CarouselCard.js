import React, { useState } from 'react';
import { View } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, { Pagination } from 'react-native-snap-carousel';
import { IMAGES } from '../../assets/images';
import { COLORS, WIDTH } from '../../assets/theme';
import { styles } from './styles';


const CarouselCard = () => {
  const [activeSlide, setActiveSlide] = useState(0);
  const style = styles;
  const data = [
    {image: IMAGES.carousel1, key: '1'},
    {image: IMAGES.carousel1, key: '2'},
    {image: IMAGES.carousel1, key: '3'},
    {image: IMAGES.carousel1, key: '4'},
  ];
  const renderItem = ({item}) => {
    return (
      <View style={style.slide}>
        <FastImage
          source={item.image}
          style={style.image}
          resizeMode={'cover'}
        />
        <LinearGradient
          colors={['transparent', COLORS.dark.secondary]}
          style={style.gradient}
        />
      </View>
    );
  };

  return (
    <>
      <Carousel
        data={data}
        renderItem={renderItem}
        sliderWidth={WIDTH * 0.9}
        itemWidth={WIDTH}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <Pagination
        dotsLength={data.length}
        activeDotIndex={activeSlide}
        containerStyle={style.paginationContainer}
        dotStyle={styles.paginationDot}
        inactiveDotOpacity={0.4}
        inactiveDotScale={0.6}
      />
    </>
  );
};

export default CarouselCard;
