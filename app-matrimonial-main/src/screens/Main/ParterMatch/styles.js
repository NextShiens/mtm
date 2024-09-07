import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
export const styles = StyleSheet.create({
  textInputCont: {
    width: '80%',
    backgroundColor: COLORS.dark.searchBox,
    borderWidth: 0,
  },
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
  cardContainer: {
    height: 155,
    width: '100%',
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
    paddingHorizontal: HORIZON_MARGIN,
  },
  gradientOverlay: {
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
    width: '55%',
    height: 40,
    backgroundColor: COLORS.dark.secondary,
    borderRadius: 5,
    justifyContent: 'center',
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
  Bell_Icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginRight: '1%',
  },
  container: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  modalContent: {
    width: '100%',
    backgroundColor: 'white',
    borderRadius: 10,
    padding: 20,
  },
  ChildContainer: {
    marginBottom: 20,
  },
  ChildContainer1: {
    marginBottom: 20,
  },
  ChildContainer2: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'black',
  },
  checkboxContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 16,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '80%',
  },
  buttonRow2: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    width: '80%',
  },
  button: {
    // Define your button styles
  },
  selectedButton: {
    // Define your selected button styles
  },
  button2: {
    // Define your button2 styles
  },
  selectedButton2: {
    // Define your selected button2 styles
  },
  sliderContainer: {
    marginVertical: 20,
    paddingHorizontal:10,
    alignItems:'center'
  },
  salaryText: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  applyButton: {
    backgroundColor: '#F97B22',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 30,
  },
  applyButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  closeButton: {
    borderColor: '#F97B22',
    padding: 15,
    borderRadius: 25,
    alignItems: 'center',
    paddingHorizontal: 30,
    borderWidth: 1,
  },
  closeButtonText: {
    color: '#F97B22',
    fontWeight: 'bold',
  },
  line: {
    width: '100%',
    alignSelf: 'center',
    height: 2,
    backgroundColor: '#E5E5E5',
    marginVertical: 10,
  },
});
