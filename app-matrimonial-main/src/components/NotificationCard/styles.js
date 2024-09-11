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
      backgroundColor: 'black',
    },
    contentContainer: {
      width: '100%',
      height: 70,
      // borderBottomWidth: 1,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      // backgroundColor: COLORS.dark.background,
    },
    profileContainer: {
      width: '15%',
      justifyContent: 'start',
      alignItems: 'center',
      left:-10,
    },
    messageContainer: {
      justifyContent: 'left',
      width: '75%',
      maxWidth: '75%',
      flexDirection: 'row',
      paddingLeft: 9,
      marginBottom:20
    },
    timeStampContainer: {
      left: 75,
      bottom: 10,
    },
  });
