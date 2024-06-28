import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {Fonts} from '../../assets/fonts';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../assets/theme';
import {formatTimestamp} from '../../utils/helper';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import {windowWidth} from '../InboxCard/style';
import Space from '../Space/Space';
import {styles} from './styles';

const ConnectionsInboxCard = ({data}) => {
  const style = styles;
  return (
    <View style={[STYLES.container]}>
      <>
        {data.map(item => {
          const formattedTime = formatTimestamp(item.timestamp);
          return (
            <TouchableOpacity key={item.key}>
              <View style={style.readCardContainer}>
                <View style={style.profileContainer}>
                  <CustomImage
                    source={item.senderProfile}
                    size={windowWidth * 0.15}
                    extraStyle={{container: [STYLES.bR(25)]}}
                  />
                </View>
                <Space mL={5} />

                <View style={style.newTextContainer}>
                  <View style={[STYLES.rowCenterBt]}>
                    <AppText
                      title={item.senderName}
                      color={COLORS.dark.secondary}
                      variant={'h4'}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
                    />
                    <AppText
                      title={formattedTime}
                      variant={'h5'}
                      color={COLORS.light.inputBorder}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                    />
                  </View>
                  <View style={[STYLES.bottom(5)]}>
                    <AppText
                      title={item.profession}
                      variant={'h5'}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                    />
                    <AppText
                      title={item.message}
                      numberOfLines={1}
                      variant={'h6'}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                      color={COLORS.dark.inputBorder}
                      elipsizeMode="tail"
                    />
                  </View>
                </View>
              </View>
            </TouchableOpacity>
          );
        })}
      </>
    </View>
  );
};

export default ConnectionsInboxCard;
