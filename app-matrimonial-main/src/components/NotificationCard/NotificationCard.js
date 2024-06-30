import React from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import AppText from '../AppText/AppText';
import {COLORS, STYLES} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';
import CustomImage from '../CustomImage/CustomImage';
import {IMAGES} from '../../assets/images';
import Space from '../Space/Space';
import {styles} from './styles';

const style = styles;

const groupNotificationsByDate = (data, handleNotificationPress) => {
  const today = new Date();
  const yesterday = new Date(today);
  yesterday.setDate(today.getDate() - 1);

  const groupedNotifications = {
    today: [],
    yesterday: [],
    older: [],
  };

  data && data.forEach(item => {
    const notificationDate = new Date(item.timestamp);

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

const NotificationCard = ({data}) => {
  const groupedNotifications = groupNotificationsByDate(data);

  return (
    <TouchableOpacity style={style.cardContainer}>
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
                onPress={handleNotificationPress(item)}
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
              <NotificationItem key={index} item={item} />
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
              <NotificationItem key={index} item={item} />
            ))}
            <Space mT={20} />
          </>
        )}
      </ScrollView>
    </TouchableOpacity>
  );
};

const NotificationItem = ({item}) => {
  return (
    <TouchableOpacity>
      <View style={style.contentContainer}>
        <View style={style.profileContainer}>
          <CustomImage
            source={IMAGES.carousel1}
            size={40}
            extraStyle={{container: STYLES.bR(20)}}
          />
        </View>
        <View style={style.messageContainer}>
          <AppText
            title={item.message}
            numberOfLines={2}
            elipsizeMode="tail"
            variant={'h5'}
            extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
          />
        </View>
        <View style={style.timeStampContainer}>
          <AppText
            title={'7 min'}
            extraStyle={[
              STYLES.fontFamily(Fonts.PoppinsRegular),
              STYLES.bottom(10),
            ]}
            color={COLORS.dark.inputBorder}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default NotificationCard;
