import {StyleSheet, Dimensions} from 'react-native';
import {COLORS} from '../../assets/theme';
import { Fonts } from '../../assets/fonts';
const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  chatBtn: {
    height: 40,
    width: '15%',
    backgroundColor: COLORS.dark.primary,
    // flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 45,
    zIndex: 1000,
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
    justifyContent: 'space-around',
    paddingHorizontal: 15,
    alignSelf: 'center',
  },
  btnOptionsCont: {
    height: 45,
    width: '15%',
    backgroundColor: COLORS.dark.secondary,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 40,
    zIndex: 1000,
  },
  buttonTouchArea: {
    padding: 10, // Increase this value to expand the touch area
    margin: -10, // Negative margin to compensate for the padding
  },
  locationIcon: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  locationCont: {
    justifyContent: 'space-between',
    top: 42,
    height: '10%',
    alignItems: 'center',
    flexDirection: 'row',
    width: '100%',
  },
  nameContainer: {
    width: '100%',
    top: 50,
  },
  verifyBtn: {
    height: 26,
    width: 26,
    borderRadius: 13,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
  },
  headerBtn1: {
    height: 28,
    width: '20%',
    justifyContent: 'center',
    backgroundColor: COLORS.dark.primary,
    borderRadius: 15,
    alignItems: 'center',
  },
  headerContainer: {
    justifyContent: 'space-between',
    height: '10%',
    position: 'absolute',
    top: 20,
    flexDirection: 'row',
    width: '100%',
  },
  container: {
    flex: 1,
    alignItems: 'center',
  },
  slideContainer: {
    width: screenWidth - 40,
    height: 280,
    alignSelf: 'center',
    justifyContent: 'center',
    borderRadius: 10,
    borderBottomRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
    borderRadius: 10,
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal: 15,
    justifyContent: 'center',
    borderRadius: 10,
    alignItems: 'center',
  },
  slideText: {
    fontSize: 24,
    color: 'white',
    marginBottom: 20,
  },
  button: {
    backgroundColor: 'white',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'black',
  },
  paginationContainer: {
    position: 'absolute',
    bottom: -10,
  },
  dotStyle: {
    width: 12,
    marginHorizontal: -5,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.dark.primary,
  },
  inactiveDotStyle: {
    width: 12,
    height: 5,
    borderRadius: 5,
    backgroundColor: COLORS.dark.white,
  },
});
