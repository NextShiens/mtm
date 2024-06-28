import { StyleSheet } from 'react-native';

export const styles =
  StyleSheet.create({
    container: (mT = 0, mL = 0, mB = 0, mH = 0, mR = 0, mV = 0) => ({
      marginTop: mT,
      marginBottom: mB,
      marginLeft: mL,
      marginRight: mR,
      marginHorizontal: mH,
      marginVertical: mV,
    }),
  });


