import React from 'react';
import {ScrollView, View} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, STYLES} from '../../../assets/theme';
import AppCard from '../../../components/AppCard/AppCard';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import ProfileSelector from '../../../components/ProfileSelector/ProfileSelector';
import Space from '../../../components/Space/Space';
import {connectionStatus, verticalCardData} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {styles} from './styles';
const RequestedConnections = () => {
  const getBtn1Data = item => {};
  const getBtn2Data = item => {};
  const style = styles;
  return (
    <ScrollView style={STYLES.flex1}>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={COLORS.dark.black} />}
          title={LABELS.connection}
          onLeftIconPress={() => {
            navigation.goBack();
          }}
          iconRight={
            <>
              <CustomImage
                source={IMAGES.notificationIcon}
                size={25}
                resizeMode="contain"
              />
            </>
          }
        />
      </View>
      <Space mT={10} />
      <ProfileSelector profileData={connectionStatus} isCameraShown={false} />
      <Space mT={10} />
      <AppCard
        data={verticalCardData}
        isBtnShown={true}
        btnType={'requestAcception'}
        onPressBtn1={getBtn1Data}
        onPressBtn2={getBtn2Data}
      />
    </ScrollView>
  );
};

export default RequestedConnections;
