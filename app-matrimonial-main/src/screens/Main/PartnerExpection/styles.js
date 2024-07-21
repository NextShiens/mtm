import { StyleSheet } from 'react-native';
import { COLORS } from '../../../assets/theme';
import { Fonts } from '../../../assets/fonts';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.light.white,
  },
  headerContainer: {
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  contentContainer: {
    paddingHorizontal: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.dark.lightGray,
    borderRadius: 8,
    padding: 12,
    height: 120,
    textAlignVertical: 'top',
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 14,
    color: COLORS.dark.black,
  },
  hr: {
    height: 1,
    backgroundColor: COLORS.dark.lightGray,
    marginVertical: 16,
  },
  Bell_Icon: {
    width: 24,
    height: 24,
    resizeMode: 'contain',
  },
});