import React from 'react';
import {Dimensions, Image, TouchableOpacity, View} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Carousel, {Pagination} from 'react-native-snap-carousel';
import {Fonts} from '../../assets/fonts';
import {IMAGES} from '../../assets/images';
import {SVG} from '../../assets/svg';
import {COLORS, STYLES} from '../../assets/theme';
import {carouselData} from '../../data/appData';
import {LABELS} from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';
import {styles} from './styles';

const SnapCarousel = ({data, isSelected}) => {
  const screenWidth = Dimensions.get('window').width;
  const [activeSlide, setActiveSlide] = React.useState(0);
  const style = styles;
  console.log('carosel data', data);
  const renderItem = ({item}) => (
    <>
      <View style={style.slideContainer}>
        <Image source={item.img} style={style.image} />
        <LinearGradient
          colors={['transparent', COLORS.dark.secondary]}
          style={style.gradient}>
          <View style={style.headerContainer}>
            <TouchableOpacity style={style.headerBtn1}>
              <AppText
                title={LABELS.new}
                color={COLORS.dark.white}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
              />
            </TouchableOpacity>
            <TouchableOpacity style={style.verifyBtn}>
              <CustomImage source={IMAGES.verifyIcon} size={12} />
            </TouchableOpacity>
          </View>

          <View style={style.nameContainer}>
            <AppText
              title={item.name}
              variant={'h3'}
              color={'white'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
            />
          </View>
          <View style={style.locationCont}>
            <View>
              <AppText
                title={[`Age${item.age}, `, item.height]}
                variant={'h6'}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                color={'white'}
              />
            </View>
            <View style={style.locationIcon}>
              <Icon
                SVGIcon={<SVG.locationIconSVG fill={COLORS.dark.primary} />}
              />
              <Space mL={5} />
              <AppText
                title={item.location}
                variant={'h6'}
                extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                color={'white'}
              />
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              alignItems: 'center',
              top: 60,
            }}>
            <CustomImage source={IMAGES.briefcaseColored} size={14} />
            <Space mL={5} />
            <AppText
              title={item.occupation}
              variant={'h5'}
              color={'white'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
            />
          </View>
          <Pagination
        dotsLength={carouselData.length}
        activeDotIndex={activeSlide}
        containerStyle={style.paginationContainer}
        dotStyle={style.dotStyle}
        inactiveDotStyle={style.inactiveDotStyle}
        inactiveDotOpacity={0.6}
        inactiveDotScale={0.6}
      />
        </LinearGradient>
      </View>
      <Space mT={20} />
    </>
  );

  return (
    <View style={style.container}>
      <Carousel
        data={carouselData}
        renderItem={renderItem}
        sliderWidth={screenWidth}
        itemWidth={screenWidth}
        onSnapToItem={index => setActiveSlide(index)}
      />
      <TouchableOpacity style={style.btnContainer}>
        <TouchableOpacity
          style={style.btnOptionsCont}
          onPress={() => {
            navigation.navigate('UserDetailsScreen');
          }}>
          <CustomImage
            source={IMAGES.sendIcon}
            size={12}
            resizeMode={'contain'}
          />
          <Space mL={10} />
          <AppText
            title={LABELS.sendInterest}
            color={'white'}
            extraStyle={style.btnLabel}
            onPress={() => {
              navigation.navigate('UserDetailsScreen');
            }}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={style.chatBtn}
          onPress={() => {
            navigation.navigate('ChatScreen');
          }}>
          <CustomImage
            source={IMAGES.chatIcon}
            size={12}
            resizeMode={'contain'}
          />
          <Space mL={10} />
          <AppText
            title={LABELS.chat}
            color={'white'}
            extraStyle={style.btnLabel}
          />
        </TouchableOpacity>
      </TouchableOpacity>
    </View>
  );
};

export default SnapCarousel;