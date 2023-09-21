import {Theme} from '@app-interfaces';
import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {},
    inboxItem: {
      flexDirection: 'row',
      paddingHorizontal: 7,
      marginVertical: 5,
      borderRadius: 10,
      backgroundColor: theme.color.ligtPrimaryBackground,
      height: 78,
      /////////---shadow---///////////
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.1,
      shadowRadius: 1.65,
      elevation: 5,
    },
    avatar: {
      width: 55,
      height: 55,
      borderWidth: 0.5,
      borderColor: theme.color.surfaceBorder,
      borderRadius: 60,
      backgroundColor: colors.primaryLight,
    },
    inboxSection: {
      flex: 1,
      marginStart: 12,
      marginEnd: 6,
      justifyContent: 'space-evenly',
    },
    inboxHeader: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    title: {
      fontWeight: 'bold',
      fontSize: theme.dimensions.normalFontSize,
      color: theme.color.surfaceLight,
      marginBottom: -4,
    },
    lastMessage: {
      color: theme.color.grayWhite,
      fontSize: 13,
    },
    counterTextStyle: {
      color: 'white',
      fontSize: 12,
    },
    counterStyle: {
      paddingHorizontal: 4,
      height: 30,
      minWidth: 30,
      backgroundColor: colors.colorNoti,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 50,
    },
    timeStamp: {
      fontSize: 10,
      fontWeight: '400',
      color: theme.color.grayWhite,
      alignSelf: 'flex-start',
    },
    imageWrapper: {
      borderRadius: 100,
      alignItems: 'center',
      justifyContent: 'center',
      alignSelf: 'center',
    },
    onlineStatus: {
      position: 'absolute',
      right: -3,
      bottom: -5,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      paddingHorizontal: 3,
      paddingVertical: 2,
      height: 15,
      width: 15,
    },
    messageCountWrapper: {
      backgroundColor: theme.color.redWhite,
      alignItems: 'center',
      justifyContent: 'center',
      borderRadius: 100,
      paddingHorizontal: 3,
      paddingVertical: 2,
      minWidth: 23,
      height: 23,
      alignSelf: 'center',
      marginRight: 10,
    },
    messageCount: {
      fontSize: 12,
      color: theme.color.onRedWhite,
      fontWeight: '600',
    },
    renderItem: {
      // width: "90%",
      // height: 50,
      // backgroundColor: "red",
      // marginHorizontal: "5%",
      // marginVertical: 10,
  
    },
  });
};
