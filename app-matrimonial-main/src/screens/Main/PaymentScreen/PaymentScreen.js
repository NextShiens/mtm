import React, { useEffect, useState } from 'react';
import { Image, ScrollView, TouchableOpacity, View, Alert, Text, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { Fonts } from '../../../assets/fonts';
import { IMAGES } from '../../../assets/images';
import { SVG } from '../../../assets/svg';
import { COLORS, HORIZON_MARGIN, STYLES } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { paymentMethods } from '../../../data/appData';
import Icon from '../../../components/Icon/Icon';
import { styles } from './styles';
import { API_URL } from '../../../../constant';

const PaymentScreen = ({ navigation, route }) => {
  const { plan, index } = route.params;
  const [memberShipPlan, setMemberShipPlan] = useState(null);
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [keyId, setKeyId] = useState('rzp_test_kBRcDfjP4gr0PM');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const getMemberShipPlan = async () => {
      const data = await AsyncStorage.getItem('memberShipPlan');
      console.log('data from line 30', data);
      setMemberShipPlan(data);
    };
    getMemberShipPlan();
  }, []);

  const fetchKeyId = async () => {
    console.log('API_URL from line 36', API_URL);
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/get-keyid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          "authorization": `Bearer ${token}`
        },
      });

      if (!response.ok) {
        console.log('response from line 50', response);
        throw new Error(`Failed to fetch key ID: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log('data from line 52', data);

      if (!data.keyId) {
        throw new Error('KeyId is not present in the response');
      }

      setKeyId(data.keyId);
      console.log('keyId from line 59', data.keyId);
    } catch (error) {
      console.error('Error fetching key ID:', error);
      Alert.alert('Error', 'Unable to initialize payment. Please try again.');
    }
  };

  const bacKNavigationHandler = () => {
    navigation.goBack();
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  useEffect(() => {
    fetchKeyId();
  }, []);

  const createOrder = async (amount) => {
    console.log("createOrder called with amount:", amount);
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      console.log("Token fetched:", token);

      const response = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({ amount }),
      });

      console.log("Response from create-order:", response);

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to create order: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
      }

      const data = await response.json();
      console.log("Order created successfully:", data);
      return data;
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify(paymentData),
      });
      if (!response.ok) throw new Error('Failed to verify payment');
      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    console.log("handlePayment called");
    setLoading(true);
    try {
      const amount = plan.price;
      console.log("Amount for createOrder:", amount);

      const order = await createOrder(amount);
      console.log("Order created:", order);

      const options = {
        description: 'Membership Payment',
        image: 'https://your-app-logo.png',
        currency: 'INR',
        key: keyId,
        amount: order.amount,
        name: 'Metromonial',
        order_id: order.id,
        prefill: {
          email: 'user@example.com',
          contact: '9999999999',
          name: 'John Doe'
        },
        theme: { color: '#F37254' }
      };

      console.log("Razorpay options:", options);

      const data = await RazorpayCheckout.open(options);
      console.log("Razorpay response:", data);

      const verificationResult = await verifyPayment({
        razorpay_payment_id: data.razorpay_payment_id,
        razorpay_order_id: data.razorpay_order_id,
        razorpay_signature: data.razorpay_signature,
        userId: 'user123',
        membershipId: memberShipPlan?.id || 'defaultMembershipId',
        amount
      });

      console.log("Verification result:", verificationResult);

      if (verificationResult.success) {
        Alert.alert('Success', 'Payment was successful');
      } else {
        throw new Error('Payment verification failed');
      }
    } catch (error) {
      console.error('Error in payment process:', error);
      Alert.alert('Error', `Payment failed: ${error.message || 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const onRightIconPress = () => {
    navigation.goBack();
  };
  const membershipSelectionHandler = async (plan) => {
    await handlePayment()
  };


  const onPayCardSelection = (item) => {
    setSelectedMethod(item.key);
  };

  const style = styles;

  return (
    <ScrollView style={style.main}>
      <View style={style.headerContainer}>
        <AppHeader
          iconLeft={<SVG.BackArrow fill={'black'} />}
          onLeftIconPress={bacKNavigationHandler}
          title={LABELS.Payment}
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
      <View key={index} style={style.planContainer}>
        <Text style={style.planName}>{plan.name || 'Default Plan Name'}</Text>
        <View style={style.featureContainer}>
          <Text style={style.feature}>Duration: {plan.duration || 'N/A'}</Text>
        </View>
        <View style={style.featureContainer}>
          <Text style={style.feature}>Live Chats: {plan.liveChats || 'N/A'}</Text>
        </View>
        <View style={style.featureContainer}>
          <Text style={style.feature}>Messages: {plan.messages || 0}</Text>
        </View>
        <View style={style.featureContainer}>
          <Text style={style.feature}>Profile Views: {plan.profileViews || 0}</Text>
        </View>
        <Text style={style.price}>{plan.price || 0}</Text>
      </View>
      <Space mT={10} />
      <View style={STYLES.pH(HORIZON_MARGIN)}>
        <Space mT={20} />
        <AppText
          title={LABELS.choosePayMethod}
          variant={'h3'}
          extraStyle={STYLES.fontFamily(Fonts.PoppinsMedium)}
        />
        <Space mT={20} />
        {paymentMethods ? (
          paymentMethods.map((item, index) => (
            <React.Fragment key={item.key}>
              <TouchableOpacity
                style={style.optionContainer}
                onPress={() => onPayCardSelection(item)}
                disabled={loading}>
                <View style={{ width: '50%', paddingHorizontal: 10 }}>
                  <Image
                    source={item.img}
                    style={style.payIcons}
                    resizeMode="contain"
                  />
                </View>
                <View style={{
                  width: '10%',
                  justifyContent: 'center',
                  alignItems: 'flex-end',
                }}>
                  <Icon
                    SVGIcon={
                      selectedMethod === item.key ? (
                        <SVG.circleFilled fill={COLORS.dark.primary} />
                      ) : (
                        <SVG.unfilledCircle fill={COLORS.dark.lightGrey} />
                      )
                    }
                  />
                </View>
              </TouchableOpacity>
              <Space mT={20} />
              <TouchableOpacity style={style.button} onPress={() => membershipSelectionHandler(plan)}>
                <Text style={style.buttonText}>Subscribe</Text>
              </TouchableOpacity>
            </React.Fragment>
          ))
        ) : null}
        <Space mT={10} />
      </View>
    </ScrollView>
  );
};

export default PaymentScreen;
