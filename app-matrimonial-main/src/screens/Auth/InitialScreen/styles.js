import {StyleSheet} from 'react-native';
import {Fonts} from '../../../assets/fonts';
export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  image: {
    flex: 1,
    justifyContent: 'flex-end',
  },
  contentContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    paddingHorizontal: 15,
  },
  textPara: {
    fontFamily: Fonts.PoppinsRegular,
    bottom: 30,
    lineHeight: 21,
  },
});
