import React, {useState} from 'react';
import {View, TouchableOpacity, ScrollView} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import AppButton from '../../../components/AppButton/AppButton';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import {
  connectionChat,
  connectionStatus,
  verticalCardData,
} from '../../../data/appData';
import {LABELS} from '../../../labels';
import {styles} from './styles';
import Space from '../../../components/Space/Space';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import AppText from '../../../components/AppText/AppText';
import AppCard from '../../../components/AppCard/AppCard';
import ConnectionsInboxCard from '../../../components/ConnectionsInboxCard/ConnectionsInboxCard';
import FastImage from 'react-native-fast-image';
import {Fonts} from '../../../assets/fonts';
import LinearGradient from 'react-native-linear-gradient';
import {Toast} from '../../../utils/native';

const Connections = ({navigation}) => {
  const [isSelected, setIsSelected] = useState(false);
  const [selectedBtn, setSelectedBtn] = useState(1);

  const handleProfileUpdate = item => {
    setSelectedBtn(item.key);
    setIsSelected(!isSelected);
  };
  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  const style = styles;

  return (
    <>
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
        <Space mT={20} />
        <View style={[STYLES.container]}>
          <View style={style.mapContainer}>
            {connectionStatus.map(item => {
              return (
                <AppButton
                  variant="filled"
                  key={item.key}
                  extraStyle={{
                    container: [
                      selectedBtn === item.key
                        ? style.selectedBtn
                        : style.unSelectedBtn,
                    ],
                    text: [
                      selectedBtn === item.key
                        ? style.selectedText
                        : style.unSelectedText,
                    ],
                  }}
                  title={item.value}
                  onPress={() => {
                    handleProfileUpdate(item);
                  }}
                />
              );
            })}
          </View>
        </View>
        <Space mT={20} />

        {selectedBtn === 1 ? (
          <ConnectionsInboxCard data={connectionChat} />
        ) : selectedBtn === 2 ? (
          <View style={STYLES.pH(HORIZON_MARGIN)}>
            <AppCard
              data={verticalCardData}
              isBtnShown={true}
              btnType={'requestAcception'}
              onPressBtn1={() => {
                Toast('Request accepted');
              }}
              onPressBtn2={() => {
                Toast('Request rejected');
              }}
            />
          </View>
        ) : (
          verticalCardData.map(item => {
            return (
              <View style={STYLES.pH(HORIZON_MARGIN)}>
                <View style={style.cardContainer} key={item.height}>
                  <View style={style.imgContainer}>
                    <FastImage
                      source={IMAGES.profile1}
                      resizeMode="cover"
                      style={style.img}
                    />
                    <AppText
                      title={item.profession}
                      color={'white'}
                      alignSelf={'center'}
                      variant={'h4'}
                      extraStyle={style.professionLabel}
                    />
                    <LinearGradient
                      colors={['transparent', COLORS.dark.secondary]}
                      style={style.gradientOverlay}
                    />
                  </View>

                  <View style={style.contentContainer}>
                    <View style={STYLES.rowCenterBt}>
                      <AppText
                        title={item.name}
                        variant={'h4'}
                        color={COLORS.dark.black}
                        extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                      />
                      <View style={style.verifyIconContainer}>
                        <CustomImage
                          source={IMAGES.verifyIcon}
                          size={12}
                          resizeMode={'cover'}
                        />
                      </View>
                    </View>
                    <AppText
                      title={`Age${item.age} , ${item.height}`}
                      color={COLORS.dark.inputBorder}
                      extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                    />
                    <View style={STYLES.rowCenter}>
                      <CustomImage
                        source={IMAGES.locationIcon}
                        size={10}
                        resizeMode={'contain'}
                      />
                      <Space mL={10} />
                      <AppText
                        title={LABELS.mumbaiIndia}
                        variant={'h5'}
                        extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                      />
                    </View>
                    <View style={style.btnShownContainer}>
                      <AppText
                        title={item.language}
                        variant={'h5'}
                        color={COLORS.dark.inputBorder}
                        extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                      />
                      <AppText
                        title={item.castName}
                        variant={'h5'}
                        color={COLORS.dark.inputBorder}
                        extraStyle={STYLES.fontFamily(Fonts.PoppinsRegular)}
                      />
                    </View>
                  </View>
                  <Space mT={10} />
                </View>
              </View>
            );
          })
        )}
      </ScrollView>
    </>
  );
};

export default Connections;
