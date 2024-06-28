import {StyleSheet} from 'react-native';
import {COLORS} from '../../assets/theme';
import {windowWidth} from '../InboxCard/style';

export const styles = StyleSheet.create({
  newTextContainer: {
    width: '80%',
    maxWidth: '80%',
    justifyContent: 'center',
  },
  unreadCardContainer: {
    width: '100%',
    backgroundColor: '#F3F5FE',
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 85,
  },
  readCardContainer: {
    width: '100%',
    borderBottomWidth: 1,
    borderBottomColor: COLORS.dark.lightGrey,
    flexDirection: 'row',
    paddingHorizontal: 10,
    height: 85,
  },
  profileContainer: {
    width: windowWidth * 0.15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textContainer: {
    width: '75%',
    backgroundColor: 'yellow',
    maxWidth: '75%',
    justifyContent: 'center',
  },
  timeContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'red',
  },
  messageCountContainer: {
    justifyContent: 'center',

    alignItems: 'center',
    height: 22,
    width: 22,
    backgroundColor: COLORS.dark.primary,
    borderRadius: 11,
  },
  nullContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 22,
    width: 22,
    borderRadius: 11,
  },
});
