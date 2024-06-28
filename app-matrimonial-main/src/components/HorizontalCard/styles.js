import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';
export const styles = StyleSheet.create({
  parentContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  scrollContainer: {
    height: 200,
    width: '100%',
  },
  cardContainer: {
    height: 90,
    width: 200,
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.dark.text,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  },
  imgContainer: {
    width: '35%',
    borderRadius: 20,
  },
  contentContainer: {
    justifyContent: 'center',
    paddingHorizontal: 10,
  },
  professionLabel: {
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    fontSize: 13,
    fontFamily: Fonts.PoppinsRegular,
  },
  gradientOverlay: {
    zIndex: 1,
    ...StyleSheet.absoluteFillObject,
    borderRadius: 10,
  },
  textContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 15,
  },
  linkContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  horizontalScrollContainer: {
    width: '100%',
    height: 150,
  },
  img: {
    flex: 1,
    borderRadius: 10,
  },
  sendIconBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  chatIconBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.dark.primary,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  verifyIconBtn: {
    height: 25,
    width: 25,
    backgroundColor: COLORS.dark.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: COLORS.dark.lightGrey,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
