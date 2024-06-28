import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
export const styles = 
  StyleSheet.create({
    textInputCont: {
      width: '100%',
      borderColor: COLORS.dark.inputBorder,
      backgroundColor: '#FBFCFF',
      borderWidth: 1,
      borderRadius: 10,
    },
    headerContainer: {
      height: 70,
      width: '100%',
      borderBottomWidth: 1,
      borderBottomColor: COLORS.dark.lightGrey,
    },
    searchBoxContainer: {
      width: '100%',
      paddingHorizontal: HORIZON_MARGIN,
    },
    searchBox: {
      height: 50,
      width: '75%',
      backgroundColor: COLORS.dark.lightGrey,
    },
  });
