import React from 'react';
import {View} from 'react-native';
import { styles } from './styles';

const Space = props => {
  const {
    mT = 0,
    mL = 0,
    mB = 0,
    mH = 0,
    mR = 0,
    mV = 0,
    children = null,
  } = props;
  const style = styles;

  return (
    <View style={style.container(mT, mL, mB, mH, mR, mV)} {...props}>
      {children && children}
    </View>
  );
};

export default Space;
