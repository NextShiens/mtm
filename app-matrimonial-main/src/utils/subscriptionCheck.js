import AsyncStorage from '@react-native-async-storage/async-storage';

async function subscriptionCheck(user) {
  try {
    const subscriptionsData = await AsyncStorage.getItem('subscriptions');
    const subscriptions = JSON.parse(subscriptionsData);

    if (!subscriptions || !Array.isArray(subscriptions) || subscriptions.length === 0) {
      return false;
    }

    const userSubscription = subscriptions.find(sub => sub._id === user.membership);

    if (!userSubscription) {
      return false;
    }

    const profileViewCount = user.recentlyViewed.length;

    if (profileViewCount >= userSubscription.profileViews) {
      return false;
    }

    const currentDate = new Date();
    const expiryDate = new Date(user.membershipExpiry);
    if (currentDate > expiryDate) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in subscriptionCheck:', error);
    return false;
  }
}

async function checkLiveChatAvailability(user) {
  try {
    const subscriptionsData = await AsyncStorage.getItem('subscriptions');
    const subscriptions = JSON.parse(subscriptionsData);
    console.log(subscriptions, 'subscriptions');

    if (!subscriptions || !Array.isArray(subscriptions) || subscriptions.length === 0) {
      return false;
    }

    const userSubscription = subscriptions.find(sub => sub._id === user.membership);

    if (!userSubscription) {
      return false;
    }

    const currentDate = new Date();
    const expiryDate = new Date(user.membershipExpiry);
    if (currentDate > expiryDate) {
      return false;
    }

    return userSubscription.liveChats === 'YES';
  } catch (error) {
    console.error('Error in checkLiveChatAvailability:', error);
    return false;
  }
}

export { subscriptionCheck, checkLiveChatAvailability };