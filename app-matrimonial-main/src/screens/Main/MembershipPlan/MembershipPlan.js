import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { API_URL } from '../../../../constant';
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

const SvgIcon = () => {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="green">
      <Circle cx="12" cy="12" r="10" fill="green" />
      <Path d="M20.3 4.3a1 1 0 0 0-1.4 0L9 14.6 4.7 10.3a1 1 0 0 0-1.4 1.4l5 5a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4z" fill="white" />
    </Svg>
  );
};



const MembershipPlan = ({ navigation }) => {
  const [subscription, setSubscription] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // Added loading st
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
  const getSubscriptions = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/getSubscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setSubscription(data.subscriptions);
      console.log(data);
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getSubscriptions();
  }, []);
  const style = styles;
  const HorizontalLine = () => {
    return <View style={style.line} />;
  };

  if (isLoading) {
    return (
      <View style={style.container}>
        <Text>Loading...</Text>
      </View>
    );
  }
  return (
    <ScrollView>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow size={24} fill={'black'} />}
          onLeftIconPress={() => navigation.goBack()}
          title={LABELS.membership}
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <Image source={IMAGES.notificationIcon} style={styles.Bell_Icon} />
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
      <ScrollView>
        {subscription && subscription.length > 0 && subscription.map((plan, index) => (
          <View key={plan._id} style={style.planContainer}>
            <Text style={style.planName}>{plan.name}</Text>
            <HorizontalLine />
            <View style={style.featureContainer}>
              <View style={style.featureItem}>
                <SvgIcon style={style.icon} />
                <Text style={style.feature}>Duration: {plan.duration}</Text>
              </View>
              <View style={style.featureItem}>
                <SvgIcon style={style.icon} />
                <Text style={style.feature}>Messages: {plan.messages}</Text>
              </View>
              <View style={style.featureItem}>
                <SvgIcon style={style.icon} />
                <Text style={style.feature}>Live Chats: {plan.liveChats}</Text>
              </View>
              <View style={style.featureItem}>
                <SvgIcon style={style.icon} />
                <Text style={style.feature}>Profile Views: {plan.profileViews}</Text>
              </View>
            </View>
            <HorizontalLine />
            <Text style={style.price}>₹{plan.price}</Text>
            <TouchableOpacity style={style.button} onPress={() => membershipSelectionHandler(plan)}>
              <Text style={style.buttonText}>Start Now</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default MembershipPlan;