import { StyleSheet } from 'react-native';
import { COLORS, HORIZON_MARGIN } from '../../assets/theme';

export const styles =
  StyleSheet.create({
    cardContainer: {
      paddingHorizontal: HORIZON_MARGIN,
    },
    boxContainer: {
      height: 100,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: 'red',
    },
    contentContainer: {
      width: '100%',
      height: 70,
      borderBottomWidth: 1,
      borderBottomColor: COLORS.dark.inputBorder,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
    },
    profileContainer: {
      width: '15%',
      justifyContent: 'center',
      alignItems: 'center',
    },
    messageContainer: {
      justifyContent: 'center',
      width: '75%',
      maxWidth: '75%',
      flexDirection: 'row',
    },
    timeStampContainer: {
      width: '10%',
    },
  });
