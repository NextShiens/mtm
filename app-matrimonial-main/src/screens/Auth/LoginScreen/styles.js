import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets/theme';

export const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
    },
    inputContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      backgroundColor: '#FFFFFF',
      borderColor: '#E5E5E5',
      borderWidth: 1,
      borderRadius: 17,
      paddingHorizontal: 10,
      height: 58,
    },
    input: {
      flex: 1,
      color: '#000000',
      height: 40,
    },
    iconContainer: {
      padding: 5,
    },
    loginbtn: {
      alignItems: 'center',
      borderWidth: 1,
      borderRadius: 17,
      paddingHorizontal: 10,
      height: 58,
    },
    contentContainer: {
      flex: 1,
      backgroundColor: '#FFFFFF',
      borderTopLeftRadius: 31,
      borderTopRightRadius: 31,
      bottom: 20,
    },
    formContainer: {
      flex: 1,
      paddingHorizontal: 18,
    },
    hrContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    hr: {
      height: 1,
      width: '30%',
      backgroundColor: 'black',
    },
    countrySelectContainer: {
      height: 50,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderWidth: 1,
      alignSelf: 'center',
      borderRadius: 6,
      borderColor: COLORS.dark.inputBorder,
    },
    PasswordEyeIcon: {
      bottom: 37,
      left: 285,
    },
  });
