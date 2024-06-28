import { StyleSheet } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { COLORS } from '../../assets/theme';

export const variant = 'filled' | 'outlined';
export const styles = variant =>
  StyleSheet.create({
    container:{
      height: 50,
      width: '100%',
      flexDirection: 'row',
      backgroundColor:
        variant == 'filled' ? COLORS.dark.primary : COLORS.dark.transparent,
      borderWidth: 1,
      borderRadius: 5,
      borderColor:
        variant == 'filled' ? COLORS.dark.transparent : COLORS.dark.primary,
      paddingHorizontal: 5,
      alignItems: 'center',
    },
    text:{
      fontFamily: Fonts.PoppinsMedium,
    },
  });
