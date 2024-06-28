import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';
export const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    width: '100%',
    alignSelf: 'center',
    marginVertical: 20,
    height: 380,
    borderRadius: 10,
    backgroundColor: 'white',
    paddingHorizontal: HORIZON_MARGIN,
  },
  textInpuCont: {
    borderWidth: 1,
    borderColor: COLORS.dark.lightGrey,
    borderRadius: 5,
    backgroundColor: COLORS.dark.lightwhite,
    paddingHorizontal: HORIZON_MARGIN,
    fontFamily: Fonts.PoppinsRegular,
  },
  dropdownCont: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  dropDown: {
    width: '30%',
    borderWidth: 1,
    borderColor: COLORS.dark.lightGrey,
    borderRadius: 5,
    backgroundColor: COLORS.dark.lightwhite,
    paddingHorizontal: HORIZON_MARGIN,
    fontFamily: Fonts.PoppinsRegular,
  },
  backBtn: {
    borderColor: COLORS.dark.lightGrey,
  },
  backBtnText: {
    color: COLORS.dark.lightGrey,
  },
});
