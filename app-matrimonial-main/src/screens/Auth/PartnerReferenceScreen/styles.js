import {StyleSheet} from 'react-native';
import {COLORS, HORIZON_MARGIN} from '../../../assets/theme';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  headerContainer: {
    height: 70,
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
  },
  contentContainer: {
    paddingHorizontal: HORIZON_MARGIN,
  },
  userCardContainer: {
    backgroundColor: 'white',
    borderRadius: 5,
    width: '100%',
    paddingHorizontal: HORIZON_MARGIN,
    elevation: 5,
  },
  userCardSubContainer: {
    width: '100%',
    backgroundColor: 'white',
    height: 50,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 5,
  },
  hr: {
    width: '100%',
    height: 1,
    backgroundColor: COLORS.dark.lightGrey,
  },
  TouchableContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});
