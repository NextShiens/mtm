import { StyleSheet } from "react-native";
import { COLORS } from "../../assets/theme";
export const styles = StyleSheet.create({
    textContainer:{
        borderTopWidth: 1,
        borderBottomWidth: 1,
        borderRightWidth: 1,
        borderColor: COLORS.dark.inputBorder,
        backgroundColor: 'transparent',
        borderTopRightRadius: 6,
        borderBottomRightRadius: 6,
        height: 50,
    }
})