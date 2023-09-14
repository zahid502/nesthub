import {Theme} from '@app-interfaces';
import {colors} from '@constants';
import {Dimensions, StyleSheet} from 'react-native';

const {height} = Dimensions.get('window');
export const createStyles = (theme: Theme) =>
  StyleSheet.create({
    safeArea: {flex: 1, backgroundColor: theme.color.onExtremePrimary},
    container: {
      flex: 1,
      paddingTop: height * 0.1,
      paddingStart: theme.spacing.double,
      backgroundColor: theme.color.onPrimaryDark,
    },
    userInfoSection: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    avatarWrapper: {
      backgroundColor: colors.white,
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      width: 50,
      height: 50,
    },
    avatar: {
      width: 40,
      height: 40,
      borderRadius: 60,
    },
    userInfo: {
      marginStart: 16,
      flexDirection: 'column',
      justifyContent: 'space-evenly',
      maxWidth: 180,
    },
    title: {
      fontSize: 16,
      color: colors.white,
      fontWeight: 'bold',
      width: '80%',
    },
    caption: {
      fontSize: 12,
      color: colors.white,
      fontWeight: 'bold',
    },
    divider: {
      height: 0.1,
      marginVertical: 14,
      backgroundColor: theme.color.onBackground,
    },
    drawerItemContainer: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    itemText: {
      color: 'white',
      fontSize: 14,
      width: 110,
    },
    countContainer: {
      paddingHorizontal: 4,
      height: 30,
      minWidth: 30,
      backgroundColor: colors.colorNoti,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    },
    themeChangeMainWrapper: {
      flex: 1,
      paddingStart: theme.spacing.double,
      backgroundColor: theme.color.onPrimaryDark,
      justifyContent: 'flex-end',
      paddingBottom: 2,
    },
    themeChangeWrapper: {flexDirection: 'row', alignItems: 'center'},
  });
