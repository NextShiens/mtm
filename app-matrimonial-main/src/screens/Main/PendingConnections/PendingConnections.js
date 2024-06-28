import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../../assets/images';
import {SVG} from '../../../assets/svg';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import {
  connectionStatus,
  profilePictures,
  profileUpdateData,
  verticalCardData,
} from '../../../data/appData';
import {styles} from './styles';
import {LABELS} from '../../../labels';
import Space from '../../../components/Space/Space';
import FastImage from 'react-native-fast-image';
import AppText from '../../../components/AppText/AppText';
import LinearGradient from 'react-native-linear-gradient';
import {Fonts} from '../../../assets/fonts';
import ProfileSelector from '../../../components/ProfileSelector/ProfileSelector';

const PendingConnections = () => {
  const style = styles;
  return (
    <ScrollView>
      <View style={STYLES.flex1}>
        <View style={style.headerContainer}>
          <AppHeader
            iconLeft={<SVG.BackArrow fill={'black'} />}
            onLeftIconPress={() => {
              navigation.goBack();
            }}
            title={LABELS.connection}
            iconRight={
              <TouchableOpacity
              //  onPress={handleRightIconPress}
              >
                <CustomImage
                  source={IMAGES.notificationIcon}
                  size={27}
                  resizeMode={'contain'}
                />
              </TouchableOpacity>
            }
          />
        </View>

        <ProfileSelector
          profileData={connectionStatus}
          isCameraShown={false}
        />
        <Space mT={10} />
        <View style={STYLES.pH(HORIZON_MARGIN)}>
          {verticalCardData ? (
            verticalCardData.map(item => {
              return (
                <>
                  <View style={style.cardContainer} key={item.key}>
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
                  </View>
                  <Space mT={10} />
                </>
              );
            })
          ) : (
            <></>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default PendingConnections;
