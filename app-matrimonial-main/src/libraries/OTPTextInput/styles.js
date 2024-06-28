import {StyleSheet} from 'react-native';
import { COLORS } from '../../assets/theme';
export const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
      },
      input: {
        width: 65,
        height: 55,
        borderWidth: 1,
        borderColor: 'transparent',
        backgroundColor: COLORS.light.OTPInput,
        borderRadius: 10,
        textAlign: 'center',
        fontSize: 18,
        marginHorizontal: 5,
        color: COLORS.dark.black,
      },
      focusedInput: {
        borderColor: COLORS.dark.primary, 
      }
});