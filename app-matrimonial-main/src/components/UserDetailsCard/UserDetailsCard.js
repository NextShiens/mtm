import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {IMAGES} from '../../assets/images';
import {STYLES} from '../../assets/theme';
import AppText from '../AppText/AppText';
import CustomImage from '../CustomImage/CustomImage';
import {styles} from './styles';

const UserDetailsCard = ({
  extraStyle,
  leftIcon,
  rightIcon,
  data,
  onRightIconPress,
  onLeftIconPress,
}) => {
  const style = styles;
  return (
    <>
      {data ? (
        data.map(item => {
          return (
            <>
              <View style={style.contentContainer} key={item.key}>
                <TouchableOpacity
                  style={[STYLES.rowCenter, STYLES.width100]}
                  key={item.key}>
                  <View
                    style={{
                      width: '95%',
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}>
                    <CustomImage
                      source={item.rightIcon}
                      size={12}
                      resizeMode={'contain'}
                    />
                    <View style={STYLES.width(10)}></View>
                    <AppText
                      title={item.value}
                      extraStyle={style.text}
                      variant={'h5'}
                    />
                  </View>
                  <CustomImage
                    source={IMAGES.arrowIcon}
                    size={12}
                    resizeMode={'contain'}
                  />
                </TouchableOpacity>
              </View>
              <View style={style.hr}></View>
            </>
          );
        })
      ) : (
        <></>
      )}
    </>
  );
};

export default UserDetailsCard;
