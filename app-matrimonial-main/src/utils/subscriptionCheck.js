import AsyncStorage from '@react-native-async-storage/async-storage';
async function subscriptionCheck() {
  try {
    const subscriptionsData = await AsyncStorage.getItem('subscriptions');
    const subscriptions = JSON.parse(subscriptionsData);
    const user = JSON.parse(await AsyncStorage.getItem('theUser'));


    if (!user.user.membership) {
      const profileViewCount = user.user.recentlyViewed.length;
      return profileViewCount < 3;
      return false
    }

    const userSubscription = subscriptions.subscriptions.find(sub => sub._id === user.user.membership);

    if (!userSubscription) {
      return false;
    }

    const profileViewCount = user.user.recentlyViewed.length;

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
async function checkIsPaidUser() {
  try {
    const subscriptionsData = await AsyncStorage.getItem('subscriptions');
    const subscriptions = JSON.parse(subscriptionsData);
    const user = JSON.parse(await AsyncStorage.getItem('theUser'));

    if (!user.user.membership) {
      return false;
    }

    const userSubscription = subscriptions.subscriptions.find(sub => sub._id === user.user.membership);

    if (!userSubscription) {
      return false;
    }

    const currentDate = new Date();
    const expiryDate = new Date(user.membershipExpiry);
    if (currentDate > expiryDate) {
      return false;
    }

    return true;
  } catch (error) {
    console.error('Error in checkIsPaidUser:', error);
    return false;
  }
}

async function checkLiveChatAvailability() {
  try {
    const subscriptionsData = await AsyncStorage.getItem('subscriptions');
    const subscriptions = JSON.parse(subscriptionsData);
    const user = JSON.parse(await AsyncStorage.getItem('theUser'));


    const userSubscription = subscriptions.subscriptions.find(sub => sub._id === user.user.membership);

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

export { subscriptionCheck, checkLiveChatAvailability , checkIsPaidUser};