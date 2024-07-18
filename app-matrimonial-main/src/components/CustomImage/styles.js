export const ResizeMode = 'contain' | 'cover' | 'stretch' | 'center';
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: size => ({
      height: size,
      alignSelf: 'center',
      width: size,
      borderRadius: size / 2,
      // borderradius:'50%',
    }),
  });
  