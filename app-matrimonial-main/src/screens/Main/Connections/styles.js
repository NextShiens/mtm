import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
import {Fonts} from '../../../assets/fonts';
export const styles = StyleSheet.create({
  headerContainer: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
  mapContainer: {
    height: 55,
    width: '100%',
    backgroundColor: COLORS.dark.lightblue,
    justifyContent: 'center',
    flexDirection: 'row',
  },
  itemsContainer: {
    height: 100,
    width: '100%',
    backgroundColor: 'pink',
  },
  withoutCameraContainer: {
    height: 0,
    backgroundColor: 'red',
    flexDirection: 'row',
    paddingHorizontal: HORIZON_MARGIN,
  },
  selectedBtn: {
    backgroundColor: COLORS.dark.primary,
    borderRadius: 5,
    height: 45,
    width: '33%',
  },
  unSelectedBtn: {
    backgroundColor: COLORS.dark.lightblue,
    width: '33%',
    borderRadius: 0,
  },
  selectedText: {
    color: 'white',
    fontSize: 14,
  },
  unSelectedText: {
    color: 'black',
    fontSize: 14,
  },
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
  main: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  cardContainer: {
    width: '48%', // Reduce this value to make sure two cards fit in one row
    height: 190,
    backgroundColor: COLORS.dark.white,
    borderRadius: 15,
    elevation: 5,
    marginBottom: 15,
    overflow: 'hidden',
  },
  imageContainer: {
    height: '60%',
    width: '100%',
    position: 'relative',
  },
  profileImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  newTag: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: COLORS.dark.primary,
    paddingHorizontal: 10,
    paddingVertical: 5,
    borderRadius: 15,
  },
  newText: {
    color: COLORS.dark.white,
    fontSize: 12,
    fontWeight: 'bold',
  },
  verifiedIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  gradientOverlay: {
    ...StyleSheet.absoluteFillObject,
    zIndex: 1,
  },
  infoContainer: {
    paddingHorizontal: 5,
    paddingTop: 10,
    marginRight: 10,
  },
  nameLocationContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingRight: 16,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  locationText: {
    fontSize: 10,
    marginLeft: 2,
  },
  detailsText: {
    flex: 1,
    color: COLORS.dark.black,
    marginRight: 10,
  },
  actionContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  occupationText: {
    marginLeft: -10,
    marginBottom: -17,
    width: '70%',
    paddingLeft: 10,
  },
  actionButton: {
    width: 20,
    height: 20,
    borderRadius: 20,
    backgroundColor: COLORS.dark.primary,
    justifyContent: 'center',
    marginLeft: 10,
  },
  ageHeightActionContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  test: {
    color: 'black',
    fontSize: 12,
    width:'70%'
  },
  icon: {
    width: 40,
    height: 40,
    resizeMode: 'contain',
    backgroundColor: 'red',
    marginRight: 5,
  },
  Bell_Icon: {
    width: 25,
    height: 30,
    resizeMode: 'contain',
    marginRight: '1%',
  },
});
