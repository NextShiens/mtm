import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
export const styles = StyleSheet.create({
  container: {
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
  },
  itemContainer: {
    height: 50,
    width: 95,
    backgroundColor: COLORS.dark.primary,
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  selectedItemContainer: {
    height: 50,
    width: 95,
    backgroundColor: 'rgba(229, 229, 229, 0.4)',
    borderRadius: 25,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
