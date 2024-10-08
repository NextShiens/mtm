import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';
export const styles = StyleSheet.create({
  verifyIconContainer: {
    height: 25,
    width: 25,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.dark.lightGrey,
  },
  ButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
  },
  imageStyle: {
    width: 10, // Width of the image
    height: 10, // Height of the image
  },
  buttonText: {
    color: 'white', // Text color
    fontSize: 16,
  },
  professionLabel: {
    position: 'absolute',
    bottom: 10,
    zIndex: 2,
    fontFamily: Fonts.PoppinsRegular,
  },
  acceptBtn: {
    height: 38,
    marginHorizontal: '10%',
    backgroundColor: COLORS.dark.secondary,
  },
  profileIconContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  requestBtn: {
    height: 38,
    width: '70%',
    marginHorizontal: '10%',
    backgroundColor: COLORS.dark.secondary,
  },
  rejectButton: {
    height: 38,
    marginHorizontal: '10%',
    backgroundColor: COLORS.dark.primary,
  },
  chatButton: {
    height: 40,
    width: 40,

    justifyContent: 'center',
    alignItems: 'center',
  },
  acceptBtnContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  requestBtnContainer: {
    width: '100%',
    justifyContent: 'space-evenly',
    flexDirection: 'row',
  },
  btnShownContainer: isBtnShown => ({
    flexDirection: isBtnShown ? 'row' : 'column',
    justifyContent: 'space-between',
    width: '100%',
  }),
  headerContainer: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
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
  cardContainer: isBtnShown => ({
    height: isBtnShown ? 155 : 125,
    width: '100%',
    backgroundColor: 'white',
    borderWidth: 1,
    borderColor: COLORS.dark.text,
    flexDirection: 'row',
    borderRadius: 10,
    elevation: 5,
    marginTop: 10,
  }),
  imgContainer: {
    width: '35%',
    height: '100%',
    borderRadius: 20,
  },

  contentContainer: {
    justifyContent: 'center',
    width: '65%',
    maxWidth: '65%',
    paddingHorizontal: HORIZON_MARGIN,
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
  image: {
    ...StyleSheet.absoluteFillObject,
    resizeMode: 'cover',
    borderRadius: 10,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  btnContainer: {
    flexDirection: 'row',
  },
  sendInterestBtn: {
    width: '70%',
    height: 40,
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 5,
    justifyContent: 'space-evenly',
    flexDirection: 'row',
    alignItems: 'center',
  },
  chatBtn: {
    width: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: COLORS.dark.primary,
    borderRadius: 5,
  },
});
