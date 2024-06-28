import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
export const styles =
  StyleSheet.create({
    container: {
      height: 50,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    googleIconContainer: {
      height: 50,
      width: '30%',
      backgroundColor: COLORS.dark.googleIconCont,
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    facebookIconContainer: {
      height: 50,
      width: '30%',
      backgroundColor: COLORS.dark.facebookIconCont,
      borderRadius: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    appleIconContainer: {
      height: 50,
      width: '30%',
      backgroundColor: COLORS.dark.appleIconCont,
      borderRadius: 10,
      alignItems: 'center',
      justifyContent: 'center',
    },
  });
