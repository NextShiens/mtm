// import React, { useEffect, useState } from 'react';
// import {
//   ScrollView,
//   TouchableOpacity,
//   View,
//   Alert,
//   Text,
//   Image,
//   StyleSheet,
// } from 'react-native';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// import RazorpayCheckout from 'react-native-razorpay';
// import { SVG } from '../../../assets/svg';
// import { IMAGES } from '../../../assets/images';
// import { COLORS } from '../../../assets/theme';
// import AppHeader from '../../../components/AppHeader/AppHeader';
// import CustomImage from '../../../components/CustomImage/CustomImage';
// import Space from '../../../components/Space/Space';
// import { LABELS } from '../../../labels';
// import { paymentMethods } from '../../../data/appData';
// import Icon from '../../../components/Icon/Icon';
// import Svg, { Path, Circle } from 'react-native-svg';
// import { API_URL } from '../../../../constant';

// const PaymentScreen = ({ navigation, route }) => {
//   const { plan } = route.params;
//   const [selectedMethod, setSelectedMethod] = useState(null);
//   const [keyId, setKeyId] = useState('rzp_test_kBRcDfjP4gr0PM');

//   const [loading, setLoading] = useState(false);

//   const SvgIcon = () => (
//     <Svg width={20} height={20} viewBox="0 0 24 24" fill="green">
//       <Circle cx="12" cy="12" r="10" fill="green" />
//       <Path d="M20.3 4.3a1 1 0 0 0-1.4 0L9 14.6 4.7 10.3a1 1 0 0 0-1.4 1.4l5 5a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4z" fill="white" />
//     </Svg>
//   );

//   const fetchKeyId = async () => {
//     try {
//       const token = await AsyncStorage.getItem('AccessToken');
//       const response = await fetch(`${API_URL}/get-keyid`, {
//         method: 'GET',
//         headers: {
//           'Content-Type': 'application/json',
//           "authorization": `Bearer ${token}`,
//         },
//       });

//       if (!response.ok) {
//         throw new Error(
//           `Failed to fetch key ID: ${response.status} ${response.statusText}`,
//         );
//       }

//       const data = await response.json();

//       if (!data.keyId) {
//         throw new Error('KeyId is not present in the response');
//       }

//       setKeyId(data.keyId);
//     } catch (error) {
//       console.error('Error fetching key ID:', error);
//       Alert.alert('Error', 'Unable to initialize payment. Please try again.');
//     }
//   };

//   useEffect(() => {
//     fetchKeyId();
//   }, []);

//   const createOrder = async (amount) => {
//     try {
//       const token = await AsyncStorage.getItem('AccessToken');
//       const response = await fetch(`${API_URL}/create-order`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({ amount }),
//       });

//       if (!response.ok) {
//         const errorText = await response.text();
//         console.error(`Failed to create order: ${response.status} ${response.statusText} - ${errorText}`);
//         throw new Error(`Failed to create order: ${response.status} ${response.statusText}`);
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error creating order:', error);
//       throw error;
//     }
//   };

//   const verifyPayment = async (paymentData) => {
//     try {
//       const token = await AsyncStorage.getItem('AccessToken');
//       const CurrentUser = await AsyncStorage.getItem('theUser');
//       const response = await fetch(`${API_URL}/verify-payment`, {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           Authorization: `Bearer ${token}`,
//         },
//         body: JSON.stringify({
//           ...paymentData,
//           userId: CurrentUser.user._id,
//           membership: plan._id,
//         }),
//       });
//       if (!response.ok) throw new Error('Failed to verify payment');
//       return await response.json();
//     } catch (error) {
//       console.error('Error verifying payment:', error);
//       throw error;
//     }
//   };

//   const handlePayment = async () => {
//     if (!selectedMethod) {
//       Alert.alert('Error', 'Please select a payment method');
//       return;
//     }

//     setLoading(true);
//     try {
//       const orderData = await createOrder(plan.price);
//       console.log('Order data:', orderData);

//       const options = {
//         key: keyId,
//         amount: orderData.amount,
//         currency: orderData.currency,
//         name: "Flex Flow",
//         description: "Test Transaction",
//         image: "https://example.com/your_logo",
//         order_id: orderData.id,
//         prefill: {
//           name: "John Doe",
//           email: "john.doe@example.com",
//           contact: "9999999999",
//         },
//         theme: {
//           color: "#F37254",
//         },
//       };

//       RazorpayCheckout.open(options)
//         .then(async (data) => {
//           console.log('Payment success:', data);
//           const verificationResult = await verifyPayment({
//             razorpay_order_id: data.razorpay_order_id,
//             razorpay_payment_id: data.razorpay_payment_id,
//             razorpay_signature: data.razorpay_signature,
//             amount: orderData.amount,
//           });
//           const afterJson = verificationResult.json();
//           console.log('Verification result:', verificationResult);

//           if (verificationResult.success) {
//             Alert.alert('Success', 'Payment successful!');
//             // Navigate to success screen or update UI accordingly
//           } else {
//             Alert.alert('Error', 'Payment verification failed!');
//           }
//         })
//         .catch((error) => {
//           console.error('Payment error:', error);
//           Alert.alert('Error', 'Payment failed. Please try again.');
//         })
//         .finally(() => {
//           setLoading(false);
//         });
//     } catch (error) {
//       console.error('Error handling payment:', error);
//       setLoading(false);
//       Alert.alert('Error', 'Error initiating payment. Please try again.');
//     }
//   };

//   const onPayCardSelection = (item) => {
//     setSelectedMethod(item.key);
//   };

//   const bacKNavigationHandler = () => {
//     navigation.goBack();
//   };

//   const handleRightIconPress = () => {
//     navigation.navigate('NotificationScreen');
//   };

//   return (
//     <ScrollView style={styles.main}>
//       <View style={styles.headerContainer}>
//         <AppHeader
//           iconLeft={<SVG.BackArrow fill={'black'} />}
//           onLeftIconPress={bacKNavigationHandler}
//           title={LABELS.Payment}
//           iconRight={
//             <TouchableOpacity onPress={handleRightIconPress}>
//               <CustomImage
//                 source={IMAGES.notificationIcon}
//                 size={27}
//                 resizeMode={'contain'}
//               />
//             </TouchableOpacity>
//           }
//         />
//       </View>

//       <Space mT={20} />

//       {plan && (
//         <View style={styles.planContainer}>
//           <Text style={styles.planName}>{plan.name}</Text>
//           <View style={styles.line} />
//           <View style={styles.featureContainer}>
//             <View style={styles.featureItem}>
//               <SvgIcon />
//               <Text style={styles.feature}>Duration: {plan.duration}</Text>
//             </View>
//             <View style={styles.featureItem}>
//               <SvgIcon />
//               <Text style={styles.feature}>Messages: {plan.messages}</Text>
//             </View>
//             <View style={styles.featureItem}>
//               <SvgIcon />
//               <Text style={styles.feature}>Live Chats: {plan.liveChats}</Text>
//             </View>
//             <View style={styles.featureItem}>
//               <SvgIcon />
//               <Text style={styles.feature}>Profile Views: {plan.profileViews}</Text>
//             </View>
//           </View>
//           <View style={styles.line} />
//           <Text style={styles.price}>₹{plan.price}</Text>
//         </View>
//       )}

//       <Space mT={20} />

//       <Text style={styles.sectionTitle}>Select Payment Method</Text>

//       {paymentMethods && paymentMethods.map((item, index) => (
//         <TouchableOpacity
//           key={item.key}
//           style={styles.optionContainer}
//           onPress={() => onPayCardSelection(item)}
//           disabled={loading}
//         >
//           <View style={styles.paymentMethodContent}>
//             <Image
//               source={item.img}
//               style={styles.payIcons}
//               resizeMode="contain"
//             />
//             <Text style={styles.paymentMethodName}>{item.name}</Text>
//           </View>
//           <View style={styles.radioButton}>
//             {selectedMethod === item.key ? (
//               <View style={styles.radioButtonInner} />
//             ) : null}
//           </View>
//         </TouchableOpacity>
//       ))}

//       <TouchableOpacity
//         style={[styles.button, (loading || !selectedMethod) && styles.disabledButton]}
//         onPress={handlePayment}
//         disabled={loading || !selectedMethod}
//       >
//         <Text style={styles.buttonText}>
//           {loading ? 'Processing...' : 'Subscribe'}
//         </Text>
//       </TouchableOpacity>

//       <Space mT={20} />
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   main: {
//     flex: 1,
//     backgroundColor: '#F5F5F5',
//   },
//   headerContainer: {
//     paddingHorizontal: 16,
//     paddingTop: 16,
//   },
//   planContainer: {
//     backgroundColor: 'white',
//     borderRadius: 8,
//     padding: 16,
//     marginHorizontal: 16,
//     shadowColor: "#000",
//     shadowOffset: {
//       width: 0,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 3.84,
//     elevation: 5,
//   },
//   planName: {
//     fontSize: 18,
//     fontWeight: 'bold',
//     marginBottom: 8,
//   },
//   line: {
//     height: 1,
//     backgroundColor: '#E0E0E0',
//     marginVertical: 8,
//   },
//   featureContainer: {
//     marginVertical: 8,
//   },
//   featureItem: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 4,
//   },
//   feature: {
//     marginLeft: 8,
//     fontSize: 14,
//   },
//   price: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     marginTop: 8,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     marginLeft: 16,
//     marginBottom: 8,
//   },
//   optionContainer: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     justifyContent: 'space-between',
//     backgroundColor: 'white',
//     padding: 16,
//     marginHorizontal: 16,
//     marginBottom: 8,
//     borderRadius: 8,
//   },
//   paymentMethodContent: {
//     flexDirection: 'row',
//     alignItems: 'center',
//   },
//   payIcons: {
//     width: 40,
//     height: 40,
//     marginRight: 12,
//   },
//   paymentMethodName: {
//     fontSize: 16,
//   },
//   radioButton: {
//     width: 20,
//     height: 20,
//     borderRadius: 10,
//     borderWidth: 2,
//     borderColor: COLORS.dark.primary,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   radioButtonInner: {
//     width: 10,
//     height: 10,
//     borderRadius: 5,
//     backgroundColor: COLORS.dark.primary,
//   },
//   button: {
//     backgroundColor: COLORS.dark.primary,
//     paddingVertical: 12,
//     paddingHorizontal: 24,
//     borderRadius: 8,
//     alignItems: 'center',
//     marginHorizontal: 16,
//     marginTop: 16,
//   },
//   disabledButton: {
//     backgroundColor: '#A0A0A0',
//   },
//   buttonText: {
//     color: 'white',
//     fontSize: 16,
//     fontWeight: 'bold',
//   },
// });

// export default PaymentScreen;

import React, {useEffect, useState} from 'react';
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
import {SVG} from '../../../assets/svg';
import {IMAGES} from '../../../assets/images';
import {COLORS} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import CustomImage from '../../../components/CustomImage/CustomImage';
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import {paymentMethods} from '../../../data/appData';
import Icon from '../../../components/Icon/Icon';
import Svg, {Path, Circle} from 'react-native-svg';
import {API_URL} from '../../../../constant';
import {Toast} from '../../../utils/native';

const PaymentScreen = ({navigation, route}) => {
  const {plan} = route.params;
  const [selectedMethod, setSelectedMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [keyId, setKeyId] = useState('');
  const fetchKeyId = async () => {
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/get-keyid`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error(
          `Failed to fetch key ID: ${response.status} ${response.statusText}`,
        );
      }

      const data = await response.json();
      console.log('Key ID:', data);
      if (!data.keyId) {
        throw new Error('KeyId is not present in the response');
      }
      setKeyId(data.keyId);
    } catch (error) {
      console.error('Error fetching key ID:', error);
      Alert.alert('Error', 'Unable to initialize payment. Please try again.');
    }
  };

  useEffect(() => {
    fetchKeyId();
  }, []);

  const SvgIcon = () => (
    <Svg width={20} height={20} viewBox="0 0 24 24" fill="green">
      <Circle cx="12" cy="12" r="10" fill="green" />
      <Path
        d="M20.3 4.3a1 1 0 0 0-1.4 0L9 14.6 4.7 10.3a1 1 0 0 0-1.4 1.4l5 5a1 1 0 0 0 1.4 0l11-11a1 1 0 0 0 0-1.4z"
        fill="white"
      />
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
        throw new Error(`Failed to create order: ${response.status} ${response.statusText} - ${errorText}`);
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
      const currentUser = await AsyncStorage.getItem('theUser');
      const user = JSON.parse(currentUser);
  
      const response = await fetch(`${API_URL}/verify-payment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...paymentData,
          userId: user.user._id,
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
      const currentUser = await AsyncStorage.getItem('theUser');
      const user = JSON.parse(currentUser);
  
      const options = {
        key:keyId, // Use environment variable for key
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'MTM',
        description: 'MTM Transaction',
        image: 'https://yourimageurl.com/logo.png', // Replace with your actual logo URL
        // order_id: orderData.id,
        prefill: {
          name: user.user?.name,
          email: user.user?.email,
          contact: user.user?.phone,
        },
        theme: {
          color: '#F37254',
        },
      };
  
      RazorpayCheckout.open(options)
        .then(async (data) => {
          console.log('Payment success:', data);
          const verificationResult = await verifyPayment({
            razorpay_order_id: data.razorpay_order_id,
            razorpay_payment_id: data.razorpay_payment_id,
            razorpay_signature: data.razorpay_signature,
          });
  
          if (verificationResult.success) {
            Toast('Success', 'Payment successful!');
          } else {
            Toast('Error', 'Payment verification failed!');
          }
        })
        .catch((error) => {
          console.error('Payment failed:', error);
          if (error.code === 'PAYMENT_CANCELLED') {
            Toast('Info', 'Payment cancelled by user');
          } else {
            Toast('Error', 'Payment failed. Please try again.');
          }
        })
        .finally(() => {
          setLoading(false);
        });
    } catch (error) {
      console.error('Error handling payment:', error);
      Toast('Error', 'Error initiating payment. Please try again.');
      setLoading(false);
    }
  };

  const onPayCardSelection = item => {
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
          textColor={'black'}
          iconRight={
            <TouchableOpacity onPress={handleRightIconPress}>
              <Image
                source={IMAGES.notificationIcon}
                style={styles.Bell_Icon}
              />
            </TouchableOpacity>
          }
        />
      </View>

      <Space mT={20} />

      <View style={{paddingHorizontal: 20}}>
        {plan && (
          <View style={[styles.planCard]}>
            <Text style={[styles.planName]}>{plan.name}</Text>
            <Text style={[styles.planPrice]}>
              ₹{plan.price}{' '}
              {/* <Text style={[{color: 'black'}, {color: 'white'}]}>/mo</Text> */}
            </Text>
            <View style={styles.featuresContainer}>
              {['duration', 'messages', 'liveChats', 'profileViews'].map(
                (feature, index) => (
                  <View key={index} style={styles.featureItem}>
                    <Text style={[styles.featureIcon]}>✓</Text>
                    <Text style={[styles.featureText]}>
                      {plan[feature]}{' '}
                      {feature.charAt(0).toUpperCase() + feature.slice(1)}
                    </Text>
                  </View>
                ),
              )}
            </View>
          </View>
        )}
      </View>

      <Space mT={20} />

      <Text style={styles.sectionTitle}>Select Payment Method</Text>

      {paymentMethods &&
        paymentMethods.map((item, index) => (
          <TouchableOpacity
            key={item.key}
            style={styles.optionContainer}
            onPress={() => onPayCardSelection(item)}
            disabled={loading}>
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
        style={[
          styles.button,
          (loading || !selectedMethod) && styles.disabledButton,
        ]}
        onPress={handlePayment}
        disabled={loading || !selectedMethod}>
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
    paddingTop: 10,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
  planContainer: {
    backgroundColor: 'white',
    borderRadius: 8,
    padding: 16,
    marginHorizontal: 16,
    shadowColor: '#000',
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
    color: 'black',
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
    color: 'black',
  },
  price: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    color: 'black',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 16,
    marginBottom: 8,
    color: 'black',
  },
  optionContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: 'white',

    marginHorizontal: 16,
    paddingRight: 15,
    marginBottom: 8,
    borderRadius: 8,
  },
  paymentMethodContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  payIcons: {
    width: 130,
    height: 60,
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
  planCard: {
    backgroundColor: '#1E285F',
    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  planName: {
    fontSize: 16,
    marginBottom: 5,
    color: 'white',
  },
  planPrice: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#F97B22',
    marginTop: 10,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
  },
  featureIcon: {
    marginRight: 10,
    color: '#FFA500',
    backgroundColor: 'white',
    padding: 2,
    borderRadius: 20,
    paddingHorizontal: 5,
  },
  featureText: {
    fontSize: 14,
    color: 'white',
  },
 
});

export default PaymentScreen;
