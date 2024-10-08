import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
import {Fonts} from '../../assets/fonts';

export const styles = StyleSheet.create({
  upgradeCard: {
    width: '80%',
    height: 130,
    position: 'relative',
    top:70,
    alignSelf: 'center',
    borderRadius: 10,
    backgroundColor: COLORS.dark.white,
    elevation: 2,
    marginBottom:60,
    },
  drawerItemDescription: {
    fontFamily: Fonts.PoppinsRegular,
  },
  container: {
    flex: 1,
    width: '100%',
    backgroundColor: COLORS.dark.white,
    alignSelf: 'center',
  },
  contentContainer: {
    height: 'auto',
    paddingHorizontal: 15,
    flexDirection: 'row',
    paddingVertical: 15,
    justifyContent: 'space-between',
    alignItems: 'center',
    
  },
  avatarContainer: {
    position: 'relative',
    marginLeft: 10,
    width: 50,
    height: 50,
    borderRadius: 32,
    backgroundColor: '#007bff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#3EB115',
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  nameHolder: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  activeDrawerItem: {
    flexDirection: 'row',
    backgroundColor: '#F97B220D',
    color: "red",
    borderRadius: 6,
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },

  inactiveDrawerItem: {
    marginVertical: 4,
    flexDirection: 'row',
    borderRadius: 6,
    height: 40,
    alignItems: 'center',
    marginHorizontal: 20,
    paddingHorizontal: 10,
  },
  drawerItemText: {
    fontSize: 15,
    fontFamily: Fonts.PoppinsMedium,
  },
  drawerContentContainer: {},
});
