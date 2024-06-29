import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
export const styles =
  StyleSheet.create({
    container: {
      height: 50,
      width: '100%',
      flexDirection: 'row',
      justifyContent: 'center',
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
  });
