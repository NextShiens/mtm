import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
import {Fonts} from '../../../assets/fonts';
export const styles = StyleSheet.create({
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  chatBtn: {
    height: 45,
    width: '40%',
    backgroundColor: COLORS.dark.primary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
  textContainer: {
    width: '40%',
    backgroundColor: COLORS.dark.primary,
    borderRadius: 10,
    justifyContent: 'center',
    flexDirection: 'row',
    alignItems: 'center',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  headerContainer: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
  contentContainer: {},
  searchBoxContainer: {
    width: '100%',
    paddingHorizontal: HORIZON_MARGIN,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  searchBox: {
    height: 50,
    width: '75%',
    backgroundColor: COLORS.dark.lightGrey,
  },
  filterBtn: {
    height: 50,
    width: '15%',
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  interestSendBtn: {
    width: '100%',
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 10,
  },
  btnLabel: {
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 13,
  },
  btnContainer: {
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-evenly',
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  searchInputCont: {
    width: '82%',
    backgroundColor: '#FBFCFF',
    borderWidth: 1,
    borderRadius: 10,
    borderColor: COLORS.dark.lightGrey,
  },
  btnOptionsCont: {
    height: 45,
    width: '40%',
    backgroundColor: COLORS.dark.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
  },
});
