import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
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
  hrContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  hr: {
    height: 1,
    width: '30%',
    backgroundColor: 'black',
  },
});
