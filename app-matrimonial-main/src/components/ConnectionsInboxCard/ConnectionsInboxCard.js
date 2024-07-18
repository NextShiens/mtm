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
const formatDate = (dateString) => {
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric',
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true
  };
  return date.toLocaleDateString('en-US', options);
};
const ConnectionsInboxCard = ({data}) => {  
  console.log('data from card ', data);
  const style = styles;
  return (
    <View style={[STYLES.container]}>
      <>
         { data.requests &&data.requests.length>0 && data.requests.map(item => {
          const formattedTime = formatTimestamp(item.timestamp);
          return (
            <TouchableOpacity key={item.key}>
              <View style={style.readCardContainer}>
                <View style={style.profileContainer}>
                  <CustomImage
                    source={{uri:item?.friend?.userImages[0] ?item.friend?.userImages[0] : 'https://www.pngitem.com/pimgs/m/146-1468479_my-profile-icon-blank-profile-picture-circle-hd.png'}}
                    size={windowWidth * 0.15}
                    extraStyle={{container: [STYLES.bR(25)]}}
                  />
                </View>
                <Space mL={5} />

                <View style={style.newTextContainer}>
                  <View style={[STYLES.rowCenterBt]}>
                    <AppText
                      title={item.friend.name}
                      color={COLORS.dark.secondary}
                      variant={'h4'}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
                    />
                    <AppText
                     title={item?.friend.sect || 'N/A'}   
                      color={COLORS.light.inputBorder}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                    />
                  </View>
                  <View style={[STYLES.bottom(5)]}>
                    <AppText
                      title={item.friend?.occupation}
                      variant={'h5'}
                      extraStyle={[STYLES.fontFamily(Fonts.PoppinsRegular)]}
                    />
                    <AppText
                         title={item?.updatedAt ? formatDate(item.updatedAt) : 'N/A'}
                      numberOfLines={1}
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
{    data && data.length === 0 && (
          <View style={style.noDataContainer}>
            <AppText
              title={'No new requests'}
              variant={'h4'}
              color={COLORS.dark.secondary}
              extraStyle={[STYLES.fontFamily(Fonts.PoppinsMedium)]}
            />
          </View>
        )
        }
      </>
    </View>
  );
};

export default ConnectionsInboxCard;
