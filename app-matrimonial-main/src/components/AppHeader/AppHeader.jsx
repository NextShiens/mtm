import React from 'react';
import {View, Text} from 'react-native';
import {styles} from './styles';
import AppText from '../AppText/AppText';
import Icon from '../Icon/Icon';
import {COLORS} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';

const AppHeader = ({
  iconLeft = null,
  children = null,
  iconRight = null,
  title,
  extraStyle = {
    container: {},
    text: {},
    icon: {},
    leftContainer: {},
    rightContainer: {},
    leftIcon: {},
  },
  onLeftIconPress = () => {},
  onRightIconPress = () => {},
  textColor,
}) => {
  const style = styles;
  return (
    <>
      <View style={[style.container, extraStyle.container]}>
        <View
          style={[style.leftContainer, extraStyle.leftContainer]}
          onPress={onLeftIconPress}>
          {iconLeft && (
            <View
              style={[style.iconLeft, extraStyle.leftIcon]}
              onPress={onLeftIconPress}>
              <Icon
                SVGIcon={iconLeft}
                alignSelf="center"
                iconLeft={true}
                onPress={onLeftIconPress}
              />
            </View>
          )}
        </View>
        {title && (
          <AppText
            title={title}
            alignSelf="center"
            extraStyle={[style.title, extraStyle.text]}
            color={textColor ? textColor : COLORS.white}
          />
        )}
        <View style={[style.rightContainer, extraStyle.rightContainer]}>
          {iconRight && (
            <Icon
              SVGIcon={iconRight}
              alignSelf="center"
              iconLeft={false}
              onPress={onRightIconPress}
            />
          )}
        </View>
        {children && children}
      </View>
    </>
  );
};

export default AppHeader;
