import {Theme} from '@app-interfaces';
import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      height: 56,
      elevation: 5,
      paddingHorizontal: theme.spacing.double,
      backgroundColor: theme.color.onPrimaryDark,
      alignItems: 'center',
      flexDirection: 'row',
      justifyContent: 'space-between',
    },
    drawerIconWrapper: {
      transform: [{ rotate: '-90deg' }]
    },
    screenText: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'center',
      color: 'white',
    },
    countWrapper: {
      backgroundColor: colors.colorNoti,
      zIndex: 2,
      borderRadius: 50,
      minWidth: 17,
      right: 0,
      height: 18,
      padding: 1,
      alignItems: 'center',
      paddingHorizontal: 3,
      position: 'absolute',
    },
    countText: {
      color: '#ffffff',
      fontSize: 12,
    },
  });
};
