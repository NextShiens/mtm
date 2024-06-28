import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { COLORS, STYLES } from '../../assets/theme';
import { LABELS } from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Space from '../Space/Space';
import { styles, windowWidth } from './style';

const InboxCard = ({data, selectedChat}) => {
  const style = styles;
  return (
    <>
      {data.map(item => {
        return (
          <TouchableOpacity key={item.key}>
            <View
              style={
                item.messageCount > 0
                  ? style.unreadCardContainer
                  : style.readCardContainer
              }>
              <View style={style.profileContainer}>
                <CustomImage
                  source={item.senderProfile}
                  size={windowWidth * 0.15}
                  extraStyle={{container: [STYLES.bR(25)]}}
                />
              </View>
              <Space mL={5} />
              <View style={style.textContainer}>
                <AppText
                  title={item.senderName}
                  variant={'h5'}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                />
                <AppText
                  title={item.message}
                  numberOfLines={2}
                  variant={'h5'}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                  color={
                    item.messageCount > 0
                      ? COLORS.dark.black
                      : COLORS.dark.inputBorder
                  }
                  elipsizeMode="tail"
                />
              </View>

              <View style={style.timeContainer}>
                <AppText
                  title={item.messageTime}
                  color={COLORS.dark.inputBorder}
                  extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                />
                <Space mT={5} />
                <View
                  style={
                    item.messageCount > 0
                      ? style.messageCountContainer
                      : style.nullContainer
                  }>
                  <AppText
                    title={item.messageCount > 0 ? item.messageCount : ''}
                    color={COLORS.dark.white}
                    extraStyle={{fontFamily: Fonts.PoppinsMedium}}
                  />
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      })}

      <View style={style.readCardContainer}>
        <View style={style.profileContainer}>
          <CustomImage
            source={IMAGES.carousel1}
            size={windowWidth * 0.15}
            extraStyle={{container: [STYLES.bR(25)]}}
          />
        </View>
        <Space mL={5} />
        <View style={style.textContainer}>
          <AppText
            title={LABELS.exampleName}
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          />
          <AppText
            title={LABELS.examplePara}
            numberOfLines={2}
            variant={'h6'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            elipsizeMode="tail"
          />
        </View>

        <View style={style.timeContainer}>
          <AppText
            title={'11:30'}
            color={COLORS.dark.inputBorder}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          />
          <Space mT={5} />
          <View style={style.nullContainer}></View>
        </View>
      </View>
    </>
  );
};

export default InboxCard;
