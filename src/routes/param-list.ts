import {StackNavigationProp} from '@react-navigation/stack';

export type DrawerNavParamList = {
  Drawer: undefined;
  MainHome: undefined;
};
//----------------------------------------------------------------
export type AuthNavParamList = {
  Login: undefined;
  Signup: undefined;
  OtpVerification: undefined;
};
//----------------------------------------------------------------
export type BottomTabsNavParamList = {
  Inbox: undefined;
  Friends: undefined;
  Status: undefined;
  Posts: undefined;
};
//----------------------------------------------------------------
export type MainNavParamList = {
  Home: undefined;
  Inbox: undefined;
  Chat: undefined;
  Contacts: undefined;
  Posts: undefined;
  CreatePost: undefined;
  Friends: undefined;
  FriendRequest: undefined;
  YourFriends: undefined;
  Status: undefined;
  SeenStatus: undefined;
  Search: undefined;
};
//----------------------------------------------------------------
export type MainNavigationProp<T extends keyof MainNavParamList> =
  StackNavigationProp<MainNavParamList, T>;
