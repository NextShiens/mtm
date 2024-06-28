import React from 'react';
import {TouchableOpacity, View, ScrollView} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import AppHeader from '../../../components/AppHeader/AppHeader';
import ConnectionsInboxCard from '../../../components/ConnectionsInboxCard/ConnectionsInboxCard';
import CustomImage from '../../../components/CustomImage/CustomImage';
import ProfileSelector from '../../../components/ProfileSelector/ProfileSelector';
import Space from '../../../components/Space/Space';
import {connectionChat, connectionStatus} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {styles} from './styles';
const AcceptedConnections = ({navigation}) => {
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
          title={LABELS.connection}
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
      <ProfileSelector profileData={connectionStatus} isCameraShown={false} />
      
      <Space mT={20} />
      <ConnectionsInboxCard data={connectionChat} />
    </ScrollView>
  );
};

export default AcceptedConnections;
