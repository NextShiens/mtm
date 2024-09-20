import React from 'react';
import { View } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { IMAGES } from '../../assets/images';
import { COLORS, STYLES } from '../../assets/theme';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import Space from '../Space/Space';
import { styles, windowWidth } from './style';
import { color } from 'react-native-elements/dist/helpers';

const InboxCard = ({ conversation }) => { 
  if (!conversation) {
    console.error('InboxCard: conversation is undefined');
    return null;
  }

  // const {
  //   chattedUser = {},
  //   lastMessage = {},
  //   unreadCount = 0
  // } = conversation;

  // const {
  //   name: senderName = 'Unknown',
  //   userImages = []
  // } = chattedUser;

  // const {
  //   text: message = '',
  //   createdAt = new Date()
  // } = lastMessage;

  // const messageTime = new Date(createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

  // const isUnread = unreadCount > 0;

  return (
    <View style={styles.readCardContainer}>
      <View style={styles.profileContainer}>
        <CustomImage
          source={conversation?.userImages[0] ? { uri: conversation.userImages[0] } :{uri:  'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}}
          size={windowWidth * 0.15}
          extraStyle={{container: [STYLES.bR(25)]}}
        />
      </View>
      <Space mL={5} />
      <View style={styles.textContainer}>
        <AppText

          title={conversation?.name || 'Unknown'}
          variant="h5"
          extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular),{color: COLORS.dark.black}]}
        />
        {/* <AppText
          title={message}
          numberOfLines={2}
          variant="h5"
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          color={isUnread ? COLORS.dark.black : COLORS.dark.inputBorder}
          ellipsizeMode="tail"
        /> */}
      </View>

      {/* <View style={styles.timeContainer}>
        <AppText
          title={messageTime}
          color={COLORS.dark.inputBorder}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
        />
        <Space mT={5} />
        {isUnread && (
          <View style={styles.messageCountContainer}>
            <AppText
              title={unreadCount.toString()}
              color={COLORS.dark.white}
              extraStyle={{fontFamily: Fonts.PoppinsMedium}}
            />
          </View>
        )}
      </View> */}
    </View>
  );
};

export default InboxCard;