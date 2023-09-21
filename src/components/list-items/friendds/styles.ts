import {Theme} from '@app-interfaces';
import {colors} from '@constants';
import {StyleSheet} from 'react-native';

export const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    //----------------------FriendItem--------------------------
    container: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 15,
    },
    avatarWrapper: {
      height: 77,
      width: 77,
      borderWidth: 0.5,
      borderRadius: 100,
      borderColor: 'gray',
    },
    avatar: {
      height: 75,
      width: 75,
      borderRadius: 100,
      resizeMode: 'cover',
    },
    friendsSection: {
      flex: 1,
      justifyContent: 'center',
      paddingLeft: 10,
    },
    name: {
      fontWeight: '500',
      fontSize: 18,
      paddingBottom: 5,
      paddingLeft: 2,
    },
    buttonWrapper: {
      width: '90%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
    },
    addButton: {width: '48%'},
    removeButton: {
      backgroundColor: theme.color.surfaceBorder,
      width: '48%',
    },
    buttonText: {
      color: theme.color.blackWhite,
    },
    //----------------------FriendHeader--------------------------
    friendHeaderButtonsWrapper: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    friendHeaderButtons: {
      backgroundColor: theme.color.surfaceBorder,
      marginRight: 10,
      paddingVertical: 8,
      borderRadius: 20,
    },
    mayYouKnowText: {
      fontSize: 22,
      fontWeight: '700',
      paddingBottom: 20,
    },
    deviderLine: {
      marginVertical: 15,
    },
    //----------------------FriendsHeaderSearch--------------------------
    friendsSearchContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: 12,
      borderBottomWidth: 0.4,
      borderBlockColor: 'gray',
      backgroundColor: 'white',
    },
    arrowBackContainer: {flexDirection: 'row', alignItems: 'center'},
    headerTitle: {paddingLeft: 10, fontSize: 18},
    headerSearch: {
      borderRadius: 20,
    },
    //----------------------YourFriendsItem--------------------------
    yourFriendsContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      paddingBottom: 15,
    },
    nameSection: {
      flex: 1,
      justifyContent: 'space-between',
      paddingLeft: 12,
      flexDirection: 'row',
    },
    optionsSection: {
      alignItems: 'center',
      paddingRight: 5,
    },
  });
};
