import {StyleSheet} from 'react-native';
import { COLORS, HORIZON_MARGIN, WIDTH } from '../../assets/theme';
export const styles =
  StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    slide: {
      width:WIDTH,
      height: 250,
    },
    image: {
      ...StyleSheet.absoluteFillObject,
      resizeMode: 'cover',
      borderRadius: 10,
    },
    gradient: {
      ...StyleSheet.absoluteFillObject,
      borderRadius: 10,
    },
    paginationContainer: {
      position: 'absolute',
      bottom: 1,
      alignSelf: 'center',
    },
    paginationDot: {
      width: 12,
      height: 4,
      borderRadius: 4,
      marginHorizontal: 8,
      backgroundColor: COLORS.dark.primary,
    },
    flexContainer: {
      width: '100%',
      paddingHorizontal: HORIZON_MARGIN,
    },
    userStatusBtn: {
      height: 25,
      width: '25%',
  
      backgroundColor: COLORS.dark.primary,
    },
  });
