import auth from '@react-native-firebase/auth';
import {Toast} from '../utils/native';
import {useNavigation} from '@react-navigation/native';

export const RegisterUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user.uid;
  } catch (error) {
    if (error.code === 'auth/email-already-in-use') {
      return 'That email address is already in use!';
    } else if (error.code === 'auth/invalid-email') {
      return 'That email address is invalid!';
    } else {
      console.error(error);
      return 'Failed to create user account. Please try again later.';
    }
  }
};


export const SignOut = () => {
  try {
    auth()
      .signOut()
      .then(() => Toast('User signed out!'));
  } catch (err) {
    console.log(err);
  }
};

export const loginUser = async (email, password) => {
  try {
    await auth().signInWithEmailAndPassword(email, password);
    return (await auth().signInWithEmailAndPassword(email, password)).user.uid;
  } catch (error) {
    if (error.code === 'auth/user-not-found') {
      return 'User not found. Please check your email and password.';
    } else if (error.code === 'auth/wrong-password') {
      return 'Invalid password. Please try again.';
    } else if (error.code === 'auth/invalid-email') {
      return 'Invalid email address. Please enter a valid email.';
    } else {
      console.log(error);
      return 'Failed to log in. Please try again later.';
    }
  }
};
export const getCurrentUser = () => {
  const user = auth().currentUser;
  if (user) {

    return user;
  } else {
    return null;
  }
};
export const getCurrentUserWithToken = async () => {
  const user = auth().currentUser;
  if (user) {
    try {
      const token = await user.getIdToken(); 
      return token;
    } catch (error) {
      console.error("Error getting user token:", error);
      return { user, error };
    }
  } else {
    // No user is signed in.
    return null;
  }
};