import React, { useEffect, useState } from 'react';
import {
  ScrollView,
  TouchableOpacity,
  View,
  Alert,
  Text,
  Image,
  StyleSheet,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';
import { SVG } from '../../../assets/svg';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import { LABELS } from '../../../labels';
import { paymentMethods } from '../../../data/appData';
import Icon from '../../../components/Icon/Icon';
import Svg, { Path, Circle } from 'react-native-svg';
import { API_URL } from '../../../../constant';

const PaymentScreen = ({ navigation, route }) => {
  const { plan } = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);

  const SvgIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="green">
      <Circle cx="12" cy="12" r="10" fill="green" />
      <Path d="M20.3 4.3a1 1 0 0 0-1.4 0L9 14.6 4.7 10.3a1 1 0 0 0-1.4 1.4l5 5a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4z" fill="white" />
    </Svg>
  );

  const createOrder = async (amount) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/create-order`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ amount }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        console.error(`Failed to create order: ${response.status} ${response.statusText} - ${errorText}`);
        throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Error creating order:', error);
      throw error;
    }
  };

  const verifyPayment = async (paymentData) => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const userId = await AsyncStorage.getItem('userId');
      const response = await fetch(`${API_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paymentData,
          userId,
          membership: plan._id,
        }),
      });
      if (!response.ok) throw new Error('Failed to verify payment');
      return await response.json();
    } catch (error) {
      console.error('Error verifying payment:', error);
      throw error;
    }
  };

  const handlePayment = async () => {
    if (!selectedMethod) {
      Alert.alert('Error', 'Please select a payment method');
      return;
    }

    setLoading(true);
    try {
      const orderData = await createOrder(plan.price);
      console.log('Order data:', orderData);

      const options = {
        key: 'rzp_test_FIno2mP3rGvz9W', // Replace with your actual Razorpay key
        amount: orderData.amount,
        currency: orderData.currency,
        name: "Flex Flow",
        description: "Test Transaction",
        image: "https://example.com/your_logo",
        order_id: orderData.id,
        prefill: {
          name: "John Doe",
          email: "john.doe@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#F37254",
        },
      };

      RazorpayCheckout.open(options)
        .then(async (data) => {
          console.log('Payment success:', data);
          const verificationResult = await verifyPayment({
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
            amount: orderData.amount,
          });

          if (verificationResult.success) {
            Alert.alert('Success', 'Payment successful!');
            // Navigate to success screen or update UI accordingly
          } else {
            Alert.alert('Error', 'Payment verification failed!');
          }
        })
        .catch((error) => {
          console.error('Payment error:', error);
          Alert.alert('Error', 'Payment failed. Please try again.');
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Error handling payment:', error);
      setLoading(false);
      Alert.alert('Error', 'Error initiating payment. Please try again.');
    }
  };

  const onPayCardSelection = (item) => {
    setSelectedMethod(item.key);
  };

  const bacKNavigationHandler = () => {
    navigation.goBack();
  };

  const handleRightIconPress = () => {
    navigation.navigate('NotificationScreen');
  };

  return (
    <ScrollView style={styles.main}>
      <View style={styles.headerContainer}>
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

      {plan && (
        <View style={styles.planContainer}>
          <Text style={styles.planName}>{plan.name}</Text>
          <View style={styles.line} />
          <View style={styles.featureContainer}>
            <View style={styles.featureItem}>
              <SvgIcon />
              <Text style={styles.feature}>Duration: {plan.duration}</Text>
            </View>
            <View style={styles.featureItem}>
              <SvgIcon />
              <Text style={styles.feature}>Messages: {plan.messages}</Text>
            </View>
            <View style={styles.featureItem}>
              <SvgIcon />
              <Text style={styles.feature}>Live Chats: {plan.liveChats}</Text>
            </View>
            <View style={styles.featureItem}>
              <SvgIcon />
              <Text style={styles.feature}>Profile Views: {plan.profileViews}</Text>
            </View>
          </View>
          <View style={styles.line} />
          <Text style={styles.price}>₹{plan.price}</Text>
        </View>
      )}

      <Space mT={20} />

      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      {paymentMethods && paymentMethods.map((item, index) => (
        <TouchableOpacity
          key={item.key}
          style={styles.optionContainer}
          onPress={() => onPayCardSelection(item)}
          disabled={loading}
        >
          <View style={styles.paymentMethodContent}>
            <Image
              source={item.img}
              style={styles.payIcons}
              resizeMode="contain"
            />
            <Text style={styles.paymentMethodName}>{item.name}</Text>
          </View>
          <View style={styles.radioButton}>
            {selectedMethod === item.key ? (
              <View style={styles.radioButtonInner} />
            ) : null}
          </View>
        </TouchableOpacity>
      ))}

      <TouchableOpacity
        style={[styles.button, (loading || !selectedMethod) && styles.disabledButton]}
        onPress={handlePayment}
        disabled={loading || !selectedMethod}
      >
        <Text style={styles.buttonText}>
          {loading ? 'Processing...' : 'Subscribe'}
        </Text>
      </TouchableOpacity>

      <Space mT={20} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  main: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  planContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  planName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  line: {
    height: 1,
    backgroundColor: '#E0E0E0',
    marginVertical: 8,
  },
  featureContainer: {
    marginVertical: 8,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  feature: {
    marginLeft: 8,
    fontSize: 14,
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    padding: 16,
    marginHorizontal: 16,
    marginBottom: 8,
    borderRadius: 8,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payIcons: {
    width: 40,
    height: 40,
    marginRight: 12,
  },
  paymentMethodName: {
    fontSize: 16,
  },
  radioButton: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 2,
    borderColor: COLORS.dark.primary,
    justifyContent: 'center',
    alignItems: 'center',
  },
  radioButtonInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.dark.primary,
  },
  button: {
    backgroundColor: COLORS.dark.primary,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 8,
    alignItems: 'center',
    marginHorizontal: 16,
    marginTop: 16,
  },
  disabledButton: {
    backgroundColor: '#A0A0A0',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default PaymentScreen;