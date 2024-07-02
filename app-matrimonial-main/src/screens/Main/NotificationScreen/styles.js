import {StyleSheet} from 'react-native';
import { COLORS } from '../../../assets/theme';
export const styles = StyleSheet.create({
    headerContainer: {
        height: 70,
        width: '100%',
        borderBottomWidth: 1,
        borderBottomColor: COLORS.dark.lightGrey,
      },

      loadingContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      },
      container: {
        flex: 1,
      },
});
