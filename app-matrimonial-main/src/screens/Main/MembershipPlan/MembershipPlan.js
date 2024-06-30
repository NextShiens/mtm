import React, { useState, useEffect } from 'react';
import { ScrollView, TouchableOpacity, View, Text } from 'react-native';
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
      <ScrollView>
        { subscription && subscription.length>0 &&  subscription.map((plan, index) => (
          <View key={plan._id} style={style.planContainer}>
            <Text style={style.planName}>{plan.name}</Text>
            <Text style={style.feature}><Text style={{ color: 'green' }}>✓ </Text>Duration: {plan.duration}</Text>
            <Text style={style.feature}><Text style={{ color: 'green' }}>✓ </Text>Messages: {plan.messages}</Text>
            <Text style={style.feature}><Text style={{ color: 'green' }}>✓ </Text>Live Chats: {plan.liveChats}</Text>
            <Text style={style.feature}><Text style={{ color: 'green' }}>✓ </Text>Profile Views: {plan.profileViews}</Text>
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