import React from 'react';
import { ScrollView, TouchableOpacity, View } from 'react-native';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppInput from '../../../components/AppInput/AppInput';
import CustomImage from '../../../components/CustomImage/CustomImage';
import InboxCard from '../../../components/InboxCard/InboxCard';
import Space from '../../../components/Space/Space';
import { inboxData } from '../../../data/appData';
import { LABELS } from '../../../labels';
import { styles } from './styles';

const InboxScreen = ({navigation}) => {
  const style = styles;
  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };
  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          title={LABELS.inbox}
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
      <View style={style.searchBoxContainer}>
        <AppInput
          iconLeft={<SVG.magnifyingGlass fill={'black'} />}
          extraStyle={{
            textInputCont: {
              width: '80%',
              backgroundColor: COLORS.dark.searchBox,
              borderWidth: 0,
            },
          }}
          placeholder={LABELS.searchHere}
        />
        <TouchableOpacity style={style.filterBtn} activeOpacity={0.8}>
          <CustomImage
            source={IMAGES.filterIcon}
            size={17}
            resizeMode={'contain'}
          />
        </TouchableOpacity>
      </View>
      <Space mT={20} />
      <TouchableOpacity style={style.inboxContainer}>
        <InboxCard data={inboxData} />
      </TouchableOpacity>
    </ScrollView>
  );
};

export default InboxScreen;
