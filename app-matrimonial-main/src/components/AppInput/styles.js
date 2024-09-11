import { StyleSheet } from 'react-native';
import { COLORS, HORIZON_MARGIN } from '../../assets/theme';
import { Fonts } from '../../assets/fonts';

export const styles = StyleSheet.create({
  textInputCont: {
    width: '100%',
    borderWidth: 1,
    display: 'flex',
    flexDirection: 'row',
    borderColor: COLORS.dark.inputBorder,
    height: 55,
    alignItems: 'center',
    borderRadius: 16,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.PoppinsRegular,
    color: '#949494', // Set text color
    textAlignVertical: 'center',
    height: 55,
    paddingHorizontal: 14,
    alignItems: 'center',
    borderRadius: 16,
  },
});