import React from 'react';
import { View } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { COLORS, STYLES } from '../../assets/theme';
import { LABELS } from '../../labels';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Space from '../Space/Space';
import { styles, windowWidth } from './style';

const InboxCard = ({ conversation }) => {
  const style = styles;

  if (!conversation) {
    console.error('InboxCard: conversation is undefined');
    return null;
  }

  const {
    chattedUser = {},
    lastMessage = {},
    unreadCount = 0
  } = conversation;

  const {
    name: senderName = 'Unknown',
    userImages = []
  } = chattedUser;

  const {
    text: message = '',
    createdAt = new Date()
  } = lastMessage;

  const messageTime = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  return (
    <View style={unreadCount > 0 ? style.unreadCardContainer : style.readCardContainer}>
      <View style={style.profileContainer}>
        <CustomImage
          source={userImages[0] ? { uri: userImages[0] } : IMAGES.userIcon}
          size={windowWidth * 0.15}
          extraStyle={{container: [STYLES.bR(25)]}}
        />
      </View>
      <Space mL={5} />
      <View style={style.textContainer}>
        <AppText
          title={senderName}
          variant={'h5'}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
        />
        <AppText
          title={message}
          numberOfLines={2}
          variant={'h5'}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          color={unreadCount > 0 ? COLORS.dark.black : COLORS.dark.inputBorder}
          elipsizeMode="tail"
        />
      </View>

      <View style={style.timeContainer}>
        <AppText
          title={messageTime}
          color={COLORS.dark.inputBorder}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
        />
        <Space mT={5} />
        <View style={unreadCount > 0 ? style.messageCountContainer : style.nullContainer}>
          <AppText
            title={unreadCount > 0 ? unreadCount.toString() : ''}
            color={COLORS.dark.white}
            extraStyle={{fontFamily: Fonts.PoppinsMedium}}
          />
        </View>
      </View>
    </View>
  );
};

export default InboxCard;