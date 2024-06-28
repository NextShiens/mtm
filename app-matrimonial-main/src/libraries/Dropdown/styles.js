import { StyleSheet } from 'react-native';
import { COLORS } from '../../assets/theme';
import { Fonts } from '../../assets/fonts';

export const styles = StyleSheet.create({
  boxStyles: {
    height: 50,
    width: '100%',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderColor: COLORS.dark.inputBorder,
    borderRadius: 6,
  },
  inputStyles: {
    fontFamily: Fonts.PoppinsRegular,
    color: COLORS.dark.inputBorder,
  },
  dropdownStyles: {
    borderColor: COLORS.dark.inputBorder,
    height: 130, 
    zIndex: 9999, 
    position: 'absolute', 
    top: -10, 
    width: '100%',
    backgroundColor: COLORS.dark.white,
  },
  dropdownTextStyles: {
    fontFamily: Fonts.PoppinsRegular,
    color: COLORS.dark.inputBorder,
  },
  container: {
    position: 'relative',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  dropdownButtonText: {
    fontSize: 16,
  },
  dropdown: {
    position: 'absolute',
    top: '100%',
    left: 0,
    right: 0,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    backgroundColor: COLORS.dark.white,
    zIndex: 9999, 
    maxHeight: 200,
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
  },
});
