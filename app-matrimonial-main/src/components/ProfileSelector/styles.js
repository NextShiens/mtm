import { StyleSheet } from 'react-native';
import { COLORS, HORIZON_MARGIN } from '../../assets/theme';
export const styles =
  StyleSheet.create({
    mapContainer: {
      height: 55,
      width: '100%',
      backgroundColor: COLORS.dark.lightblue,
      justifyContent: 'center',
      flexDirection: 'row',
    },
    itemsContainer: {
      height: 100,
      width: '100%',
      backgroundColor: 'pink',
    },
    withoutCameraContainer:{
      height: 0,
      backgroundColor:'red',
      flexDirection: 'row',
      paddingHorizontal: HORIZON_MARGIN,
    },
    profileContainer: {
      height: 100,
      flexDirection: 'row',
      paddingHorizontal: HORIZON_MARGIN,
    },
    imgContainer: {
      height: 100,
      width: '100%',
      flexDirection: 'row',
      backgroundColor: 'red',
    },
    uploadImgContainer: {
      height: 100,
      width: 85,
      backgroundColor: '#D9D9D945',
      justifyContent: 'center',
      alignItems: 'center',
      borderRadius: 10,
    },
    selectedBtn: {
      backgroundColor: COLORS.dark.primary,
      borderRadius: 5,
      height: 45,
      width: '30%',
    },
    unSelectedBtn: {
      backgroundColor: COLORS.dark.lightblue,
      width: '30%',
      borderRadius: 0,
    },
    selectedText: {
      color: 'white',
    },
    unSelectedText: {
      color: 'black',
    },
  });
