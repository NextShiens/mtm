// import {
//     GoogleSignin,
//     statusCodes,
//   } from 'react-native-google-signin';
//   export const configureGoogleSignIn = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       await GoogleSignin.configure({
//         scopes: ['email'],
//         webClientId: '286024121953-bq9dama5uov1d67aa84e19in20ksfep3.apps.googleusercontent.com',
//         offlineAccess: true,
//       });
//     } catch (error) {
//       console.error('Google Sign-In configuration error:', error);
//     }


//   };

//   export const signInWithGoogle = async () => {
//     try {
//       await GoogleSignin.hasPlayServices();
//       const { accessToken, idToken } = await GoogleSignin.signIn();
//       return { accessToken, idToken };
//     } catch (error) {
//       if (error.code === statusCodes.SIGN_IN_CANCELLED) {
//         console.log('Google Sign-In cancelled.');
//       } else {
//         console.error('Google Sign-In error:', error);
//       }
//       return null;
//     }
//   };

  
// export const signOutFromGoogle = async () => {
//     try {
//       await GoogleSignin.revokeAccess();
//       await GoogleSignin.signOut();
//     } catch (error) {
//       console.error('Google Sign-Out error:', error);
//     }
//   };