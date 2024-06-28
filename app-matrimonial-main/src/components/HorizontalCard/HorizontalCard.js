import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import {Fonts} from '../../assets/fonts';
import {IMAGES} from '../../assets/images';
import {SVG} from '../../assets/svg';
import {COLORS, STYLES} from '../../assets/theme';
import {LABELS} from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';
import {styles} from './styles';
import LinearGradient from 'react-native-linear-gradient';

const HorizontalCard = ({
  data,
  onLinkPress,
  onSendInterest,
  onChatBtnClick,
  onVerifyBtnClick,
}) => {
  const style = styles;
  return (
    <>
      <View style={style.parentContainer}>
        <View style={style.textContainer}>
          <AppText
            title={LABELS.recentlyViewed}
            variant={'h3'}
            extraStyle={[STYLES.fontFamily(Fonts.PoppinsSemiBold)]}
          />
          <TouchableOpacity style={style.linkContainer} onPress={onLinkPress}>
            <AppText
              title={LABELS.seeMore}
              variant={'h5'}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
              color={COLORS.dark.primary}
            />
            <View>
              <Icon
                SVGIcon={
                  <SVG.vectorIcon
                    fill={COLORS.dark.primary}
                    iconLeft={true}
                    height={'10'}
                    width={'10'}
                  />
                }
              />
            </View>
          </TouchableOpacity>
        </View>

        <ScrollView
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          style={style.horizontalScrollContainer}>
          {data ? (
            data.map((item, index) => {
              return (
                <>
                  <View style={style.cardContainer} key={item.key + index}>
                    <View style={style.imgContainer}>
                      <FastImage
                        source={IMAGES.carousel1}
                        resizeMode="cover"
                        style={style.img}
                      />
                      <AppText
                        title={item.profession}
                        color={'white'}
                        alignSelf={'center'}
                        variant={'h4'}
                        extraStyle={style.professionLabel}
                      />
                      <LinearGradient
                        colors={['transparent', COLORS.dark.secondary]}
                        style={style.gradientOverlay}
                      />
                    </View>
                    <View style={style.contentContainer}>
                      <AppText
                        title={item.name}
                        variant={'h4'}
                        color={COLORS.dark.black}
                        extraStyle={[Fonts.PoppinsMedium]}
                      />
                      <AppText
                        title={`Age${item.age} , ${item.height}`}
                        color={COLORS.dark.inputBorder}
                        extraStyle={[
                          STYLES.fontFamily(Fonts.PoppinsRegular),
                          STYLES.bottom('5%'),
                        ]}
                      />
                      <View style={[STYLES.JCBt, STYLES.row]}>
                        <TouchableOpacity
                          style={style.sendIconBtn}
                          onPress={onSendInterest}>
                          <CustomImage
                            source={IMAGES.sendIcon}
                            size={11}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.chatIconBtn}
                          onPress={onChatBtnClick}>
                          <CustomImage
                            source={IMAGES.chatIcon}
                            size={11}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.verifyIconBtn}
                          onPress={onVerifyBtnClick}>
                          <CustomImage
                            source={IMAGES.verifyIcon}
                            size={11}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                      </View>
                    </View>
                  </View>
                  <Space mL={10} />
                </>
              );
            })
          ) : (
            <></>
          )}
        </ScrollView>
      </View>
    </>
  );
};

export default HorizontalCard;
