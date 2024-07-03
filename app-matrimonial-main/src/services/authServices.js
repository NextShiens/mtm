import auth from '@react-native-firebase/auth';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';

const checkSignInStatus = async () => {
  try {
    const isSignedIn = await GoogleSignin.isSignedIn();
    console.log('Is user signed in:', isSignedIn);
    if (isSignedIn) {
      const currentUser = await GoogleSignin.getCurrentUser();
      console.log('Current user:', currentUser);
    }
  } catch (error) {
    console.error('Error checking sign-in status:', error);
  }
};

// Initialize GoogleSignin
GoogleSignin.configure({
  scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  webClientId: '150066722698-o9oktrse31c1t60d2ve36jcrmngudlnt.apps.googleusercontent.com', // client ID of type WEB for your server (needed to verify user ID and offline access)
  offlineAccess: true, // if you want to access Google API on behalf of the user FROM YOUR SERVER
  hostedDomain: '', // specifies a hosted domain restriction
  forceCodeForRefreshToken: true, // [Android] related to `serverAuthCode`, read the docs link below *.
  accountName: '', // [Android] specifies an account name on the device that should be used
  // [iOS] if you want to specify the client ID of type iOS (otherwise, it is taken from GoogleService-Info.plist)
  googleServicePlistPath: '', // [iOS] if you renamed your GoogleService-Info file, new name here, e.g. GoogleService-Info-Staging
  profileImageSize: 120, // [iOS] The desired height (and width) of the profile image. Defaults to 120px
});

export const signInWithGoogle = async () => {
  try {
    console.log('Checking Google Play Services...');
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    console.log('Google Play Services OK');

    console.log('Attempting Google Sign-In...');
    const { idToken } = await GoogleSignin.signIn();
    console.log('Google Sign-In successful, got idToken');

    console.log('Creating Google credential...');
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    console.log('Google credential created');

    console.log('Signing in with credential...');
    const userCredential = await auth().signInWithCredential(googleCredential);
    console.log('Sign-in successful:', userCredential.user.displayName);

    return userCredential;
  } catch (error) {
    console.error('Google Sign-In Error:', error);
    if (error.code) {
      console.error('Error code:', error.code);
      switch (error.code) {
        case statusCodes.SIGN_IN_CANCELLED:
          console.error('Sign-in was cancelled');
          break;
        case statusCodes.IN_PROGRESS:
          console.error('Sign-in is in progress already');
          break;
        case statusCodes.PLAY_SERVICES_NOT_AVAILABLE:
          console.error('Play services not available or outdated');
          break;
        default:
          console.error('Other error occurred');
      }
    }
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