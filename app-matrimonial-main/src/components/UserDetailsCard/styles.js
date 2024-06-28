import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';
export const styles = 
  StyleSheet.create({
    container: {
      backgroundColor: 'white',
      borderRadius: 5,
      width: '100%',
      paddingHorizontal: HORIZON_MARGIN,
      elevation: 5,
    },
    hr: {
      width: '100%',
      height: 1,
      backgroundColor: COLORS.dark.lightGrey,
    },
    contentContainer: {
      width: '100%',
      backgroundColor: 'white',
      height: 50,
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      paddingHorizontal: 5,
    },
    text: {
      fontFamily: Fonts.PoppinsRegular,
      textAlign: 'center',
    },
  });
