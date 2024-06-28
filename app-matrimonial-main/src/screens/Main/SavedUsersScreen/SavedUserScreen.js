import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import {LABELS} from '../../../labels';
import {styles} from './styles';
import Space from '../../../components/Space/Space';
import AppCard from '../../../components/AppCard/AppCard';
import {verticalCardData} from '../../../data/appData';
import {HORIZON_MARGIN, STYLES} from '../../../assets/theme';

const SavedUserScreen = ({navigation}) => {
  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };
  const style = styles;
  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          title={LABELS.saved}
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
      <View style={STYLES.pH(HORIZON_MARGIN)}>
        <AppCard
          data={verticalCardData}
          isBtnShown={true}
          btnType={'sendInterest'}
          onPressBtn1={() => {
            navigation.navigate('UserDetailsScreen');
          }}
          onPressBtn2={() => {
            navigation.navigate('ChatScreen');
          }}
        />
      </View>
    </ScrollView>
  );
};

export default SavedUserScreen;
