import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import AppText from '../AppText/AppText';
import { COLORS, STYLES } from '../../assets/theme';
import { Fonts } from '../../assets/fonts';
import CustomImage from '../CustomImage/CustomImage';
import { IMAGES } from '../../assets/images';
import Space from '../Space/Space';
import { styles } from './styles';
import { Image } from 'react-native-elements';

const style = styles;

const groupNotificationsByDate = (data) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groupedNotifications = {
    today: [],
    yesterday: [],
    older: [],
  };

  data && data.forEach(item => {
    const notificationDate = new Date(item.createdAt);

    if (notificationDate.toDateString() === today.toDateString()) {
      groupedNotifications.today.push(item);
    } else if (notificationDate.toDateString() === yesterday.toDateString()) {
      groupedNotifications.yesterday.push(item);
    } else {
      groupedNotifications.older.push(item);
    }
  });

  return groupedNotifications;
};

const NotificationCard = ({ data, onPress }) => {
  const groupedNotifications = groupNotificationsByDate(data);

  return (
    <View style={style.cardContainer}>
      <ScrollView>
        {groupedNotifications.today.length > 0 && (
          <>
            <AppText
              title={'Today'}
              variant={'h2'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            {groupedNotifications.today.map((item, index) => (
              <NotificationItem
                key={index}
                item={item}
                onPress={() => onPress(item)}
              />
            ))}
            <Space mT={20} />
          </>
        )}

        {groupedNotifications.yesterday.length > 0 && (
          <>
            <AppText
              title={'Yesterday'}
              variant={'h2'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            {groupedNotifications.yesterday.map((item, index) => (
              <NotificationItem
                key={index}
                item={item}
                onPress={() => onPress(item)}
              />
            ))}
            <Space mT={20} />
          </>
        )}

        {groupedNotifications.older.length > 0 && (
          <>
            <AppText
              title={'Older Messages'}
              variant={'h2'}
              extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
            />
            {groupedNotifications.older.map((item, index) => (
              <NotificationItem
                key={index}
                item={item}
                onPress={() => onPress(item)}
              />
            ))}
            <Space mT={20} />
          </>
        )}
      </ScrollView>
    </View>
  );
};

const NotificationItem = ({ item, onPress }) => {
  const getTimeAgo = (createdAt) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffInMinutes = Math.floor((now - created) / (1000 * 60));

    if (diffInMinutes < 60) {
      return `${diffInMinutes} min`;
    } else if (diffInMinutes < 1440) {
      return `${Math.floor(diffInMinutes / 60)} hours`;
    } else {
      return `${Math.floor(diffInMinutes / 1440)} days`;
    }
  };

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={{ borderBottomColor:'rgba(228, 232, 238, 1)' , borderBottomWidth:1}}>
      <View style={style.contentContainer}>
        <View style={style.profileContainer}>
          <Image
            source={item.senderId.userImages[0] ? { uri: item.senderId.userImages[0] } : { uri: 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png' }}
            size={40}
            style={{ borderRadius: 20,width:50,height:50 }}
          />
        </View>
        <View style={style.messageContainer}>
          <AppText
            title={item.title == 'Chat' ? `${item?.senderId?.name} have sent you a Message` : item.message}
            color={'black'}
            numberOfLines={2}
            elipsizeMode="tail"
            style={{alignSelf: 'center'}}
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          />
        </View>
      </View>
      <View style={style.timeStampContainer}>
          <AppText
            title={getTimeAgo(item.createdAt)}
            variant={'h6'}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.bottom(10),
            ]}
            color={'gray'}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;