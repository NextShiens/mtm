import { StyleSheet } from 'react-native';
import { Fonts } from '../../assets/fonts';
import { COLORS } from '../../assets/theme';

export const variant = 'filled' | 'outlined';
export const styles = variant =>
  StyleSheet.create({
    container: {
      height: 55,
      width: '100%',
      backgroundColor:
        variant == 'filled' ? COLORS.dark.primary : COLORS.dark.transparent,
      borderWidth: 1,
      borderRadius: 16,
      borderColor:
        variant == 'filled' ? COLORS.dark.transparent : COLORS.dark.primary,
      justifyContent: 'center',
      alignItems: 'center',
    },
    text: {
      fontFamily: Fonts.PoppinsMedium,
    },
  });
