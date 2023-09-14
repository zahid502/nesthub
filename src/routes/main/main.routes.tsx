import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {MainNavParamList} from '@routes/param-list';
import MainBottomNav from './bottom.tabs.routes';
import {
  ChatScreen,
  ContactsScreen,
  InboxScreen,
  StatusScreen,
  PostScreen,
  FriendsScreen,
  CreatePostScreen,
  FriendRequestScreen,
  YourFriendsScreen,
} from '@screens';

//-----------------
interface IProps {}
const {Navigator, Screen} = createStackNavigator<MainNavParamList>();

const MainNav: React.FC<IProps> = () => {
  return (
    <Navigator
      screenOptions={{
        headerShown: false,
      }}>
      <Screen name={'Home'} component={MainBottomNav} />
      <Screen name={'Inbox'} component={InboxScreen} />
      <Screen name="Contacts" component={ContactsScreen} />
      <Screen name="Chat" component={ChatScreen} />
      <Screen name={'Posts'} component={PostScreen} />
      <Screen name="CreatePost" component={CreatePostScreen} />
      <Screen name={'Friends'} component={FriendsScreen} />
      <Screen name={'FriendRequest'} component={FriendRequestScreen} />
      <Screen name={'YourFriends'} component={YourFriendsScreen} />
      <Screen name={'Status'} component={StatusScreen} />
    </Navigator>
  );
};

export default MainNav;
