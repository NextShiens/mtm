import {StyleSheet} from 'react-native';
import {COLORS} from '../../../assets/theme';

export const styles = StyleSheet.create({
  countryCodeContainer: {
    borderWidth: 0,
    borderColor: 'transparent',
  },
  container: {
    flex: 1,
    position: 'relative',
    backgroundColor: '#FFFFFF',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderTopLeftRadius: 31,
    borderTopRightRadius: 31,
    bottom: 20,
  },
  formContainer: {
    flex: 1,
    paddingHorizontal: 18,
  },
  countrySelectContainer: {
    height: 50,
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 15,
    borderWidth: 1,
    alignSelf: 'center',
    borderRadius: 6,
    borderColor: COLORS.dark.inputBorder,
  },
  PasswordEyeIcon: {
    bottom: 45,
    left: 285,
  },
});
