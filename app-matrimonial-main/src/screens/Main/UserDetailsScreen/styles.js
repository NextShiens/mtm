import {StyleSheet, Dimensions} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
const screenWidth = Dimensions.get('window').width;
export const styles = StyleSheet.create({
  hr: {
    height: 1,
    backgroundColor: 'black',
    width: '100%',
  },
  container: {
    flex: 1,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
  },
  rightIconContainer: {
    height: 40,
    width: 40,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    backgroundColor: COLORS.dark.primary,
    borderRadius: 10,
  },

  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.dark.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.dark.white,
    bottom: 10,
  },
  basicDetailsContainer: {
    width: '100%',
    paddingHorizontal: HORIZON_MARGIN,
    justifyContent: 'center',
  },
  basicInfoContainer: {
    paddingHorizontal: 10,
    width: '100%',
    flexDirection: 'row',
  },
  infoCont1: {
    width: '60%',
  },
  infoCont2: {
    width: '40%',
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
    width: screenWidth,
    height: 280,
    borderRadius: 10,
    borderBottomRadius: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  gradient: {
    ...StyleSheet.absoluteFillObject,
    paddingHorizontal:5
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
    width: 10,
    marginHorizontal: -5,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.dark.primary,
  },
  inactiveDotStyle: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: COLORS.dark.white,
  },
});
