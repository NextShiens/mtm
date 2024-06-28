import {View} from 'react-native';
import React from 'react';
import {SkypeIndicator} from 'react-native-indicators';
import {styles} from './styles';

const ActivityIndicator = ({isLoading, color, count, size}) => {
  const style = styles;
  return isLoading ? (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <SkypeIndicator color={color} count={count} size={size} />
    </View>
  ) : null;
};

export default ActivityIndicator;
