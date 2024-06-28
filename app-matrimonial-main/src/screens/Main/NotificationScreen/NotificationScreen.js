import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import NotificationCard from '../../../components/NotificationCard/NotificationCard';
import Space from '../../../components/Space/Space';
import {notificationsData} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {styles} from './styles';

const NotificationScreen = ({navigation}) => {
  const style = styles;
  const handleRightIconPress = () => {};
  const handleNotificationPress = () => {};
  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          title={LABELS.notification}
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <CustomImage
                source={IMAGES.notificationIcon}
                size={27}
                resizeMode={'contain'}
              />
            </TouchableOpacity>
          }
        />
      </View>
      <Space mT={20} />
      <NotificationCard
        data={notificationsData}
        onPress={handleNotificationPress}
      />
    </ScrollView>
  );
};

export default NotificationScreen;
