import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text, Image } from 'react-native';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { API_URL } from '../../../../constant';
import { SVG } from '../../../assets/svg';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { styles } from './styles';
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
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      const userString = await AsyncStorage.getItem('theUser');
      if (userString) {
        const user = JSON.parse(userString);
        setCurrentUser(user);
      }
    };

    fetchUser();
    getSubscriptions();
  }, []);

  const membershipSelectionHandler = async plan => {
    await AsyncStorage.setItem('memberShipPlan', JSON.stringify(plan));
    navigation.navigate('PaymentScreen', { plan });
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
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
    } catch (error) {
      console.error(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  const isSubscribed = (plan) => {
    if (!currentUser || !currentUser.membership) return false;
    return currentUser.membership === plan._id && new Date(currentUser.membershipExpiry) > new Date();
  };

  const HorizontalLine = () => {
    return <View style={styles.line} />;
  };

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <ScrollView>
      <View style={styles.headerContainer}>
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
        {subscription && subscription.length > 0 && subscription.map((plan) => (
          <View key={plan._id} style={styles.planContainer}>
            <Text style={styles.planName}>{plan.name}</Text>
            <HorizontalLine />
            <View style={styles.featureContainer}>
              <View style={styles.featureItem}>
                <SvgIcon style={styles.icon} />
                <Text style={styles.feature}>Duration: {plan.duration}</Text>
              </View>
              <View style={styles.featureItem}>
                <SvgIcon style={styles.icon} />
                <Text style={styles.feature}>Messages: {plan.messages}</Text>
              </View>
              <View style={styles.featureItem}>
                <SvgIcon style={styles.icon} />
                <Text style={styles.feature}>Live Chats: {plan.liveChats}</Text>
              </View>
              <View style={styles.featureItem}>
                <SvgIcon style={styles.icon} />
                <Text style={styles.feature}>Profile Views: {plan.profileViews}</Text>
              </View>
            </View>
            <HorizontalLine />
            <Text style={styles.price}>₹{plan.price}</Text>
            <TouchableOpacity 
              style={[styles.button, isSubscribed(plan) && styles.disabledButton]} 
              onPress={() => membershipSelectionHandler(plan)}
              disabled={isSubscribed(plan)}
            >
              <Text style={styles.buttonText}>
                {isSubscribed(plan) ? 'Current Plan' : 'Start Now'}
              </Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>
    </ScrollView>
  );
};

export default MembershipPlan;