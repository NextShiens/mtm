import React from 'react';
import Svg, { Path, Circle } from 'react-native-svg';
const SvgIcon = () => {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24" fill="green">
      <Circle cx="12" cy="12" r="10" fill="green" />
      <Path d="M20.3 4.3a1 1 0 0 0-1.4 0L9 14.6 4.7 10.3a1 1 0 0 0-1.4 1.4l5 5a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4z" fill="white" />
  </Svg>
    );
  };


export const plans = [
    {
      name: 'Basic Plan',
      features: [
        { icon: <SvgIcon/>, text: 'No Direct Message' },
        { icon: <SvgIcon/>, text: '100 Profile Visit Per Day' },
        { icon: <SvgIcon/>, text: 'Access for 30 Days' }
      ],
      price: '$3.99/mon'
    },
    {
      name: 'Budget Plan',
      features: [
        { icon: <SvgIcon/>, text: 'Direct Messages Allowed' },
        { icon: <SvgIcon/>, text: '200 Profile Visit Per Day' },
        { icon: <SvgIcon/>, text: 'Access for 60 Days' }
      ],
      price: '$5.99/mon'
    },
    {
      name: 'Premium Plan',
      features: [
        { icon: <SvgIcon/>, text: 'Unlimited Direct Messages' },
        { icon: <SvgIcon/>, text: '300 Profile Visit Per Day' },
        { icon: <SvgIcon/>, text: 'Access for 90 Days' }
      ],
      price: '$7.99/mon'
    }
  ];