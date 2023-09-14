import React from 'react';
import {BottomTabsNavParamList} from '@routes/param-list';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {useTheme} from '@hooks/use-theme';
import {colors} from '@constants';
import {Image, Platform, View} from 'react-native';
import {FriendsScreen, InboxScreen, PostScreen, StatusScreen} from '@screens';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import {BlurView} from '@react-native-community/blur';

const inbox = require('../../assets/icons/inbox.png');

const {Navigator, Screen} = createBottomTabNavigator<BottomTabsNavParamList>();
const MainBottomNav = () => {
  const {theme, isDarkTheme} = useTheme();
  const {mainRoute} = useSelector((state: RootState) => state.bottom);

  return (
    <Navigator
      initialRouteName={mainRoute}
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarActiveTintColor: theme.color.surfaceLight,
        tabBarInactiveTintColor: colors.gray,
        tabBarStyle: {
          position: 'absolute',
          borderTopWidth: 0.2,
          borderTopColor: theme.color.surfaceBorder,
          height: Platform.OS === 'ios' ? 90 : 75,
        },
        tabBarIconStyle: {
          marginTop: Platform.OS === 'ios' ? 0 : 5,
        },
        tabBarLabelStyle: {
          marginBottom: Platform.OS === 'ios' ? -10 : 10,
          marginTop: Platform.OS === 'ios' ? 0 : 0,
        },
        tabBarBackground: () => (
          <BlurView
            style={{
              justifyContent: 'center',
              alignContent: 'center',
              position: 'absolute',
              bottom: 0,
              top: 0,
              left: 0,
              right: 0,
            }}
            blurType={isDarkTheme ? 'dark' : 'light'}
            overlayColor="transparent"
            blurAmount={10}
            blurRadius={20}></BlurView>
        ),
        tabBarIcon: ({
          focused,
          color,
          size = theme.dimensions.normalIconSize,
        }) => {
          switch (route.name) {
            case 'Friends': {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.colorNoti
                      : colors.primaryLight,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                  }}>
                  <Image
                    source={inbox}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: 'contain',
                    }}></Image>
                </View>
              );
            }
            case 'Inbox': {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.colorNoti
                      : colors.primaryLight,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                  }}>
                  <Image
                    source={inbox}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: 'contain',
                    }}></Image>
                </View>
              );
            }

            case 'Posts': {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.colorNoti
                      : colors.primaryLight,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                  }}>
                  <Image
                    source={inbox}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: 'contain',
                    }}></Image>
                </View>
              );
            }

            case 'Status': {
              return (
                <View
                  style={{
                    backgroundColor: focused
                      ? colors.colorNoti
                      : colors.primaryLight,
                    borderRadius: 10,
                    paddingVertical: 8,
                    paddingHorizontal: 8,
                  }}>
                  <Image
                    source={inbox}
                    style={{
                      height: size,
                      width: size,
                      resizeMode: 'contain',
                    }}></Image>
                </View>
              );
            }
          }
        },
      })}>
      <Screen
        name={'Inbox'}
        component={InboxScreen}
        options={{title: 'Inbox'}}
      />
      <Screen
        name={'Posts'}
        component={PostScreen}
        options={{title: 'Posts'}}
      />
      <Screen
        name={'Friends'}
        component={FriendsScreen}
        options={{title: 'Friends'}}
      />
      <Screen
        name={'Status'}
        component={StatusScreen}
        options={{title: 'Status'}}
      />
    </Navigator>
  );
};

export default MainBottomNav;
