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
    // color: COLORS.dark.inputBorder,
    color: '#000000',
  },
  dropdownStyles: {
    borderColor: COLORS.dark.inputBorder,
    height: 130, 
    zIndex: 9999, 
    position: 'absolute', 
    top: -10, 
    width: '100%',
    backgroundColor: COLORS.dark.white,
    color: '#000000',
  },
  dropdownTextStyles: {
    fontFamily: Fonts.PoppinsRegular,
    // color: COLORS.dark.inputBorder,
    color: '#000000',
  },
  container: {
    position: 'relative',
    color: '#000000',
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    color: '#000000',
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#000000',
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
    color: '#000000',
  },
  searchInput: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    fontSize: 16,
    color: '#000000',
  },
  item: {
    padding: 10,
    borderBottomWidth: 1,
    color: '#000000',
    borderBottomColor: '#eee',
  },
  itemText: {
    fontSize: 16,
    color: '#000000',
  },
});
