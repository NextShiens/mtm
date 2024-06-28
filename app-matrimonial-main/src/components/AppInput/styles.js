import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';
export const styles = StyleSheet.create({
  textInputCont: {
    height: 50,
    width: '100%',
    borderWidth: 1,
    borderRadius: 6,
    flexDirection: 'row',
    borderColor: COLORS.dark.inputBorder,
    paddingHorizontal: HORIZON_MARGIN,
  },
  textInput: {
    flex: 1,
    fontFamily: Fonts.PoppinsRegular,
    flexDirection: 'row',
    color:'black',
    paddingBottom: 5,
    textAlignVertical: 'center',
  },
});
