import React, {useState, useEffect} from 'react';
import {ScrollView, TouchableOpacity, View, Text, Image} from 'react-native';
import {Fonts} from '../../../assets/fonts';
import {API_URL} from '../../../../constant';
import {COLORS, HORIZON_MARGIN, STYLES} from '../../../assets/theme';
import AppHeader from '../../../components/AppHeader/AppHeader';
import AppText from '../../../components/AppText/AppText';
import Space from '../../../components/Space/Space';
import {LABELS} from '../../../labels';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {color} from 'react-native-elements/dist/helpers';
import { styles } from './styles';

const MembershipPlan = ({navigation}) => {
  const [subscription, setSubscription] = useState([]);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    getSubscriptions();
  }, []);

  const getSubscriptions = async () => {
    setIsLoading(true);
    try {
      const token = await AsyncStorage.getItem('AccessToken');
      const response = await fetch(`${API_URL}/user/getSubscription`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          authorization: `Bearer ${token}`,
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

  const handlePlanSelection = plan => {
    setSelectedPlan(plan);
  };

  const handleContinue = () => {
    if (selectedPlan) {
      navigation.navigate('PaymentScreen', {plan: selectedPlan});
    }
  };

  const PlanCard = ({plan, isSelected}) => (
    <TouchableOpacity
      style={[styles.planCard, isSelected && styles.selectedPlanCard]}
      onPress={() => handlePlanSelection(plan)}>
      <Text style={[styles.planName, isSelected && styles.selectedText]}>
        {plan.name}
      </Text>
      <Text
        style={[
          styles.planPrice,
          isSelected && styles.selectedText,
          {color: '#F97B22'},
        ]}>
        ₹{plan.price}{' '}
        {/* <Text style={[{color: 'black'}, isSelected && {color: 'white'}]}>
          /mo
        </Text> */}
      </Text>
      <View style={styles.featuresContainer}>
        {['duration', 'messages', 'liveChats', 'profileViews'].map(
          (feature, index) => (
            <View key={index} style={styles.featureItem}>
              <Text
                style={[
                  styles.featureIcon,
                  isSelected && {backgroundColor: 'white'},
                ]}>
                ✓
              </Text>
              <Text
                style={[styles.featureText, isSelected && styles.selectedText]}>
                {plan[feature]}{' '}
                {feature.charAt(0).toUpperCase() + feature.slice(1)}
              </Text>
            </View>
          ),
        )}
      </View>
      <TouchableOpacity
        style={[styles.selectButton, isSelected && styles.selectedButton]}
        onPress={() => handlePlanSelection(plan)}>
        <Text
          style={[
            styles.selectButtonText,
            
          ]}>
          Select Plan
        </Text>
      </TouchableOpacity>
    {isSelected &&  <View style={{position: 'absolute',right: 0,top:10}}>
        <Text
          style={[
            styles.featureIcon,
            isSelected && {backgroundColor: '#F97B22',color:'white'},
          ]}>
          ✓
        </Text>
      </View>}
    </TouchableOpacity>
  );

  if (isLoading) {
    return (
      <View style={styles.container}>
        <Text>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          marginTop: 20,
          alignSelf: 'center',
          marginBottom:10
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image source={require('../../../assets/images/leftarrow.png')} />
        </TouchableOpacity>
        <Text style={styles.heading}>Subscription Plan</Text>
      </View>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <Space mT={20} />
        {subscription.map(plan => (
          <PlanCard
            key={plan._id}
            plan={plan}
            isSelected={selectedPlan && selectedPlan._id === plan._id}
          />
        ))}
      </ScrollView>
      <TouchableOpacity style={styles.continueButton} onPress={handleContinue}>
        <Text style={styles.continueButtonText}>Continue</Text>
      </TouchableOpacity>
    </View>
  );
};



export default MembershipPlan;
