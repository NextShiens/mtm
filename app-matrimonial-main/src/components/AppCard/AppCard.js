import React from 'react';
import { ScrollView, TouchableOpacity, View, Text,Image } from 'react-native';
import FastImage from 'react-native-fast-image';
import LinearGradient from 'react-native-linear-gradient';
import { Svg, Circle, Path } from 'react-native-svg';
import { Fonts } from '../../assets/fonts';
import { COLORS, STYLES } from '../../assets/theme';
import { LABELS } from '../../labels';
import AppButton from '../AppButton/AppButton';
import AppText from '../AppText/AppText';
import Space from '../Space/Space';
import { styles } from './styles';
import CustomImage from '../CustomImage/CustomImage';
import { IMAGES } from '../../assets/images';
import { SVG } from '../../assets/svg';

const LocationIcon = ({ size = 24, color = 'black' }) => (
  <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
    <Path
      d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7Zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5S10.62 6.5 12 6.5s2.5 1.12 2.5 2.5S13.38 11.5 12 11.5Z"
      fill={color}
    />
  </Svg>
);
const ProfileIcon = () => (
  <Svg width="20" height="20" viewBox="0 0 20 20">
    <Circle cx="10" cy="10" r="15" fill="#E0E0E0" />
    <Circle cx="10" cy="10" r="4" fill="#BDBDBD" />
    <Path
      d="M25 28c-7.18 0-13 5.82-13 13 0 1.1.9 2 2 2h22c1.1 0 2-.9 2-2 0-7.18-5.82-13-13-13z"
      fill="#BDBDBD"
    />
  </Svg>
);

const AppCard = ({ isBtnShown, btnType, data, onPressBtn1, onPressBtn2 }) => {
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
      ? onAcceptRequest
      :  onSendRequest;

  const onSecondBtnPress =
    isBtnShown && btnType === 'requestAcception'
      ? onRejectRequest
      : onChatBtnPress;

  const renderCard = (item) => {
    console.log(item,"dsjhkjhakjhdkahkf");
    return (
      <View style={style.cardContainer(isBtnShown)} key={item?.id}>
                <View style={style.imgContainer}>
          {item?.userImages?.length > 0 ? (
            <FastImage
              source={{ uri: item?.userImages[0] }}
              resizeMode="cover"
              style={style.img}
            />
          ) : (
            <Image
              source={{
                uri: item?.gender === 'male' 
                  ? 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png'
                  :  item?.gender === 'female' 
                  ? 'https://i.pinimg.com/564x/df/a0/36/dfa036866ac5d4ba8760b3671ae9381c.jpg' 
                  : 'https://icons.veryicon.com/png/o/miscellaneous/user-avatar/user-avatar-male-5.png',
              }}
              resizeMode="cover"
              style={{width: '100%', height: '100%'}} 
            />
          )}
          <AppText
            title={item?.occupation || 'N/A'}
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
              title={item?.name || 'Unknown'}
              variant={'h4'}
              color={COLORS.dark.black}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
          </View>

          <AppText
            title={`Age ${item?.age || 'N/A'} , ${item?.height || 'N/A'}`}
            color={COLORS.dark.inputBorder}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          />
          <View style={STYLES.rowCenter}>

            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <LocationIcon size={16} />
              <AppText
                title={item?.city || 'N/A'}
                variant={'h5'}
                extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
              />
            </View>
          </View>
          <View style={style.btnShownContainer(isBtnShown)}>
            <AppText
              title={item?.motherTongue || 'N/A'}
              variant={'h5'}
              color={COLORS.dark.inputBorder}
              extraStyle={[
                STYLES.fontFamily(Fonts.PoppinsRegular),
                STYLES.bottom(5),
              ]}
            />
            <AppText
              title={item?.sect || 'N/A'}
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
                <TouchableOpacity onPress={() => onPressFunction(item)}>
                  <View>
                    <AppButton
                      extraStyle={{
                        container: [style.acceptBtn],
                      }}
                      title={btnType === 'requestAcception' ? "Accept" : 'View Profile'}
                      onPress={() => {
                        onPressFunction(item);
                      }}
                    />
                    <CustomImage
                      source={IMAGES.sendIcon}
                      size={11}
                      resizeMode={'contain'}
                    />
                  </View>
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
               <TouchableOpacity
               onPress={() => {
                onPressFunction(item);
              }}
              style={styles.ButtonContainer}>
              {/* Image Icon */}
              <Image
                source={IMAGES.sendIcon} // Replace with your image URL or local asset
                style={styles.imageStyle}
              />

              {/* Space between Image and Text */}
              <View style={{marginLeft: 10}} />

              {/* Button Text */}
              <Text style={{color:"white"}}>Send Interest</Text>
            </TouchableOpacity>
              </TouchableOpacity>

              <TouchableOpacity
                style={style.chatBtn}
                onPress={() => {
                  onSecondBtnPress(item);
                }}>
              <Image source={IMAGES.chatIcon} size={12} />
              </TouchableOpacity>
            </View>
          )}
        </View>
      </View>
    );
  };

  return (
    <ScrollView style={STYLES.flex1}>
      {Array.isArray(data) && data.length > 0 ? (
        data.map(renderCard)
      ) : data && typeof data === 'object' ? (
        renderCard(data)
      ) : (
        <View style={[STYLES.flex1, STYLES.center]}>
          <AppText
            title="No data available"
            color={COLORS.dark.inputBorder}
            variant={'h4'}
          />
        </View>
      )}
    </ScrollView>
  );
};

export default AppCard;