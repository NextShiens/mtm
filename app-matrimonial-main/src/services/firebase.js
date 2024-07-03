import auth from '@react-native-firebase/auth';
import {Toast} from '../utils/native';

export const RegisterUser = async (email, password) => {
  try {
    const userCredential = await auth().createUserWithEmailAndPassword(email, password);
    return userCredential.user.uid;
  } catch (error) {
    let errorMessage = 'Failed to create user account. Please try again later.';

    switch (error.code) {
      case 'auth/email-already-in-use':
        errorMessage = 'This email is already registered. Please use a different email or try logging in.';
        break;
      case 'auth/invalid-email':
        errorMessage = 'The email address is invalid. Please enter a valid email.';
        break;
      case 'auth/weak-password':
        errorMessage = 'The password is too weak. Please choose a stronger password.';
        break;
      case 'auth/network-request-failed':
        errorMessage = 'Network error. Please check your internet connection and try again.';
        break;
    }

    Toast(errorMessage);
    console.error('Registration error:', error);
    return null;
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