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
    borderColor: '#E5E5E5',
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
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: '#fff',
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    // marginBottom: 10,
  },
  stepText: {
    fontSize: 16,
    // marginBottom: 10,
    color: '#333',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  centerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 16,
    color: '#333',
  },
  dropdown: {
    marginVertical: 10,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  textInput: {
    marginBottom: 10,
    height: 56,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 16,
    paddingHorizontal: 8,
  },
  saveButton: {
    height: 56,

    backgroundColor: '#ff9900',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 16,
    marginTop: 20,
    marginBottom: 50,
  },
  saveText: {
    color: '#fff',
    fontWeight: 'bold',
  },
  inputSearchStyle: {
    color: '#333',
  },
  selectedTextStyle: {
    fontSize: 14,
    color: '#333',
  },
  flexrow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 20,
    marginBottom: 10,
  },
  heading: {
    color: '#1A1A1A',
    textAlign: 'center',
    fontFamily: Fonts.PoppinsRegular,
    fontSize: 21,
    fontStyle: 'normal',
    fontWeight: '700',
    lineHeight: 26,
    textTransform: 'capitalize',
    width: '85%',
  },
  back: {
    width: 30,
    height: 30,
    borderRadius: 15,
    backgroundColor: '#F5F5F5',
    justifyContent: 'center',
    alignItems: 'center',
  },
});