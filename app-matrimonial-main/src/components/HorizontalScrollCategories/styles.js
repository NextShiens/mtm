import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
export const styles = 
  StyleSheet.create({
    activeContainer: {
      height: 50,
      width: 95,
      backgroundColor: COLORS.dark.primary,
      borderRadius: 10,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    inActiveContainer: {
      height: 50,
      width: 95,
      backgroundColor: COLORS.dark.btnTint,
      borderRadius: 10,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    selectedItemContainer: {
      height: 50,
      width: 95,
      backgroundColor: COLORS.dark.white,
      borderRadius: 25,
      marginHorizontal: 10,
      justifyContent: 'center',
      alignItems: 'center',
    },
    subCategoryContainer: {
      height: 40,
      alignItems: 'center',
      flexDirection: 'row',
    },
  });
