import React from 'react';
import { View } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { COLORS, STYLES } from '../../assets/theme';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Space from '../Space/Space';
import { styles, windowWidth } from './style';

const InboxCard = ({ conversation }) => {
  const style = styles;
  const { chattedUser } = conversation;

  return (
    <View style={style.readCardContainer}>
      <View style={style.profileContainer}>
        <CustomImage
          source={{ uri: chattedUser.userImages[0] }}
          size={windowWidth * 0.15}
          extraStyle={{container: [STYLES.bR(25)]}}
        />
      </View>
      <Space mL={5} />
      <View style={style.textContainer}>
        <AppText
          title={chattedUser.name}
          variant={'h5'}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
        />
        <AppText
          title={chattedUser.occupation || 'No occupation'}
          numberOfLines={2}
          variant={'h6'}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          color={COLORS.dark.inputBorder}
          elipsizeMode="tail"
        />
      </View>

      <View style={style.timeContainer}>
        <AppText
          title={new Date(conversation.updatedAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
          color={COLORS.dark.inputBorder}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
        />
        <Space mT={5} />
        <View style={style.nullContainer}></View>
      </View>
    </View>
  );
};

export default InboxCard;