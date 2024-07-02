import auth from '@react-native-firebase/auth';
import { GoogleSignin } from '@react-native-google-signin/google-signin';

// Initialize GoogleSignin
GoogleSignin.configure({
  webClientId: process.env.GOOGLE_WEB_CLIENT_ID || '150066722698-o9oktrse31c1t60d2ve36jcrmngudlnt.apps.googleusercontent.com', // Get this from your Google Cloud Console
});

export const signInWithGoogle = async () => {
  try {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();

    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    throw error;
  }
};

export const signOut = async () => {
  try {
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
    return auth().signOut();
  } catch (error) {
    console.error('Sign-Out Error:', error);
    throw error;
  }
};