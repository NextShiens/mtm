import React from 'react';
import { Image, ScrollView, TouchableOpacity, View, Text } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { memberShipPlans } from '../../../data/appData';
import { LABELS } from '../../../labels';
import { styles } from './styles';
import Icon from 'react-native-vector-icons/FontAwesome';
import { UseSelector, useDispatch } from 'react-redux/es/hooks/useSelector';
import Svg, { Path, Circle } from 'react-native-svg';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { plans } from './plans';

const MembershipPlan = ({ navigation }) => {
  // const dispatch = useDispatch()
  const membershipSelectionHandler = async plan => {
    await AsyncStorage.setItem('memberShipPlan', JSON.stringify(plan));
    navigation.navigate('PaymentScreen', { plan });
  };
  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };
  const bacKNavigationHandler = () => {
    navigation.goBack();
  };
  const style = styles;
  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={bacKNavigationHandler}
          title={LABELS.membership}
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
      <View style={STYLES.pH(HORIZON_MARGIN)}>
        <AppText
          title={LABELS.selectMembershipPlan}
          variant={'h4'}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
        />
      </View>
      {plans.map((plan, index) => (
        <View key={index} style={style.planContainer}>
          <Text style={style.planName}>{plan.name}</Text>
          {plan.features.map((feature, i) => (
            <View key={i} style={style.featureContainer}>
              {feature.icon}
              <Text style={style.feature}>{feature.text}</Text>
            </View>
          ))}
          <Text style={style.price}>{plan.price}</Text>
          <TouchableOpacity style={style.button} onPress={() => membershipSelectionHandler(plan)}>
            <Text style={style.buttonText}>Start Now</Text>
          </TouchableOpacity>
        </View>
      ))}
    </ScrollView>
  );
};

export default MembershipPlan;