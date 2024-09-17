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
    top: 70,
  },
  carouselContainer: {
    flex: 1,
    alignItems: 'center',
    top: 70,
    borderRadius: 20, // Adjust this value to control the roundness
    overflow: 'hidden',
  },
  rightIconContainer: {
    height: 50,
    width:50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 0,
    // backgroundColor: 'yellow',
  },

  contentContainer: {
    flex: 1,
    backgroundColor: COLORS.dark.white,
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
    paddingHorizontal: 10,
    backgroundColor: COLORS.dark.white,
    bottom: 70,
    top: 70,
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    width: '100%',
    height: 280,
    borderRadius: 20,
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
    backgroundColor: 'rgba(0,0,0,0.3)',
    width: '83%',
    borderRadius: 10,
  },
  dotStyle: {
    width: 20,
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
  test: {
    color: 'black',
    fontSize: 16,
  },
  
















  box: {
    backgroundColor: '#100B271A',
    borderWidth: 1,
    borderColor: '#FDBA74',
    borderRadius: 8,
    paddingVertical:30,
    paddingHorizontal:20,
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'space-between',
    // maxWidth: 300,
    alignSelf: 'center',
    // marginVertical: 10,
  },
  contentbox: {
    flexDirection: 'row',
    alignItems: 'flex-start',
  },
  iconbox: {
    backgroundColor: '#FED7AA',
    borderRadius: 12,
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  textbox: {
    flex: 1,
  },
  titlebox: {
    fontWeight: 'bold',
    color: '#1F2937',
    fontSize: 16,
  },
  messagebox: {
    color: '#4B5563',
    fontSize: 14,
  },
  closeButton: {
    padding: 4,
  },
  closeButtonText:{
    fontSize: 16,
    position: 'absolute',
    right: 5,
    top: -10,
  }
});
