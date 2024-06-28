import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
export const styles = () =>
  StyleSheet.create({
    container: () => ({
      height: 50,
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      paddingHorizontal: 15,
      borderWidth: 1,
      alignSelf: 'center',
      borderRadius: 6,
      borderColor: COLORS.dark.inputBorder,
    }),
    textInput: () => ({
      borderWidth: 0,
      borderColor: COLORS.dark.transparent,
    }),
  });
