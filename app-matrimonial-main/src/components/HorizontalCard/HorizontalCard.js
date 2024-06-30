import React from 'react';
import { ScrollView, TouchableOpacity, View, Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { SVG } from '../../assets/svg';
import { COLORS, STYLES } from '../../assets/theme';
import { LABELS } from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Icon from '../Icon/Icon';
import Space from '../Space/Space';
import { styles } from './styles';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Path } from 'react-native-svg';
import { useRoute } from '@react-navigation/native';
import { useNavigation } from '@react-navigation/native';
const HorizontalCard = ({
  data,
  onLinkPress,
  onSendInterest,
  onChatBtnClick,
  onVerifyBtnClick,
}) => {

  const navigation = useNavigation();

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
          <TouchableOpacity style={style.linkContainer} onPress={
            () => {
              navigation.navigate('PartnerMatch');
            }
          }>
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
                      {
                        item.userImages?.[0] ? (
                          <FastImage
                            source={{ uri: item.userImages?.[0] }}
                            resizeMode="cover"
                            style={style.img}
                          />
                        ) : (
                          <Svg
                            height="45"
                            width="45"
                            viewBox="0 0 100 100"
                            style={style.img} 
                          >
                            <Path
                              d="M50 50m-40 0a40 40 0 1 0 80 0 40 40 0 1 0 -80 0ZM50 20a15 15 0 1 1 0 30 15 15 0 1 1 0-30ZM50 75c-16.569 0-30-10.745-30-24h60C80 64.255 66.569 75 50 75z"
                              fill="#ccc" 
                            />
                          </Svg>
                        )
                      }
                      <AppText
                        title={item.occupation}
                        color={'white'}
                        alignSelf={'center'}
                        variant={'h6'}
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
                      <View style={[STYLES.selfLeft, STYLES.gap, STYLES.row]}>
                        <TouchableOpacity
                          style={style.sendIconBtn}
                          onPress={() => {
                            navigation.navigate('UserDetailsScreen', { userId: item?._id });
                          }}>
                          <CustomImage
                            source={IMAGES.sendIcon}
                            size={11}
                            resizeMode={'contain'}
                          />
                        </TouchableOpacity>
                        <TouchableOpacity
                          style={style.chatIconBtn}
                          onPress={() => {
                            navigation.navigate('ChatScreen', { userId: item?._id, roomId: `${item?._id}_${item._id}`, user: item });
                          }}>
                          <CustomImage
                            source={IMAGES.chatIcon}
                            size={11}
                          />
                        </TouchableOpacity>
                        {item.isVerified && (
                          <TouchableOpacity
                            style={style.verifyIconBtn}
                            onPress={onVerifyBtnClick}>
                            <CustomImage
                              source={IMAGES.verifyIcon}
                              size={11}
                              resizeMode={'contain'}
                            />
                          </TouchableOpacity>
                        )}
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
