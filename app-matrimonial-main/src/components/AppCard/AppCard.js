import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../../assets/fonts';
import {IMAGES} from '../../assets/images';
import {COLORS, STYLES} from '../../assets/theme';
import {LABELS} from '../../labels';
import AppButton from '../AppButton/AppButton';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Space from '../Space/Space';
import {styles} from './styles';
import {Image} from 'react-native';

const AppCard = ({isBtnShown, btnType, data, onPressBtn1, onPressBtn2}) => {
  const style = styles;
  const onSendRequest = item => {
    onPressBtn1(item);
  };
  const onRejectRequest = item => {
    onPressBtn2(item);
  };
  const onAcceptRequest = item => {
    onPressBtn1(item);
  };
  const onChatBtnPress = item => {
    onPressBtn2(item);
  };
  const onPressFunction =
    isBtnShown && btnType === 'requestAcception'
      ? onSendRequest
      : onAcceptRequest;

  const onSecondBtnPress =
    isBtnShown && btnType === 'requestAcception'
      ? onRejectRequest
      : onChatBtnPress;

  return (
    <ScrollView style={STYLES.flex1}>
      {data ? (
        data.map(item => {
          return (
            <View style={style.cardContainer(isBtnShown)} key={item.key}>
              <View style={style.imgContainer}>
                <FastImage
                  source={IMAGES.profile1}
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
                <View style={STYLES.rowCenterBt}>
                  <AppText
                    title={item.name}
                    variant={'h4'}
                    color={COLORS.dark.black}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                  />
                  <View style={style.verifyIconContainer}>
                    <CustomImage
                      source={IMAGES.verifyIcon}
                      size={10}
                      resizeMode={'cover'}
                    />
                  </View>
                </View>

                <AppText
                  title={`Age${item.age} , ${item.height}`}
                  color={COLORS.dark.inputBorder}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                />
                <View style={STYLES.rowCenter}>
                  <CustomImage
                    source={IMAGES.locationIcon}
                    size={10}
                    resizeMode={'contain'}
                  />
                  <Space mL={10} />
                  <AppText
                    title={LABELS.mumbaiIndia}
                    variant={'h5'}
                    extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                  />
                </View>
                <View style={style.btnShownContainer(isBtnShown)}>
                  <AppText
                    title={item.language}
                    variant={'h5'}
                    color={COLORS.dark.inputBorder}
                    extraStyle={[
                      STYLES.fontFamily(Fonts.PoppinsRegular),
                      STYLES.bottom(5),
                    ]}
                  />
                  <AppText
                    title={item.castName}
                    variant={'h5'}
                    color={COLORS.dark.inputBorder}
                    extraStyle={[
                      STYLES.fontFamily(Fonts.PoppinsRegular),
                      STYLES.bottom(5),
                    ]}
                  />
                </View>

                {btnType && btnType == 'requestAcception' ? (
                  <>
                    <View style={style.acceptBtnContainer}>
                      <TouchableOpacity
                        onPress={() => {
                          onPressFunction(item);
                        }}>
                        <AppButton
                          extraStyle={{
                            container: [style.acceptBtn],
                          }}
                          title={[
                            btnType === 'requestAcception'
                              ? LABELS.accept
                              : LABELS.sendInterest,
                          ]}
                          onPress={() => {
                            onPressFunction(item);
                          }}
                          onPressText={onPressFunction}
                        />
                      </TouchableOpacity>

                      <TouchableOpacity
                        onPress={() => {
                          onSecondBtnPress(item);
                        }}>
                        <AppButton
                          extraStyle={{
                            container: [style.rejectButton],
                          }}
                          title={LABELS.reject}
                          onPress={() => {
                            onSecondBtnPress(item);
                          }}
                        />
                      </TouchableOpacity>
                    </View>
                  </>
                ) : (
                  <View style={style.requestBtnContainer}>
                    <TouchableOpacity
                      style={style.sendInterestBtn}
                      onPress={() => {
                        onPressFunction(item);
                      }}>
                      <Image
                        source={IMAGES.sendIcon}
                        style={[STYLES.height(15), STYLES.width(15)]}
                        resizeMode={'contain'}
                        onPress={() => {
                          onPressFunction(item);
                        }}
                      />
                      <AppText
                        title={LABELS.sendInterest}
                        color={COLORS.dark.white}
                        extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                        variant={'h5'}
                        onPress={() => {
                          onPressFunction(item);
                        }}
                      />
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={style.chatBtn}
                      onPress={() => {
                        onSecondBtnPress(item);
                      }}>
                      <CustomImage
                        source={IMAGES.chatIcon}
                        size={15}
                        resizeMode={'contain'}
                      />
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            </View>
          );
        })
      ) : (
        <></>
      )}
    </ScrollView>
  );
};

export default AppCard;
