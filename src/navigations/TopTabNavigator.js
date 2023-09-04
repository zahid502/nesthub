import React from 'react';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {CallsScreen, InboxScreen, StatusScreen} from '../screens';

const Tab = createMaterialTopTabNavigator();

const TopTabNavigator = () => {
  return (
    <Tab.Navigator
      initialRouteName="InboxScreen"
      tabBarPosition="top"
      screenOptions={{
        tabBarLabelStyle: {fontSize: 16, color: '#fff', fontWeight: 'bold'},
        tabBarItemStyle: {},
        tabBarStyle: {backgroundColor: '#3C73E9', marginBottom: 0},
        tabBarPressColor: '#3C73E9',

        swipeEnabled: true,
      }}
      style={{height: 50}}>
      <Tab.Screen
        style={{}}
        name="InboxScreen"
        component={InboxScreen}
        options={{tabBarLabel: 'Chats'}}
      />
      <Tab.Screen
        name="StatusScreen"
        component={StatusScreen}
        options={{tabBarLabel: 'Status'}}
      />
      <Tab.Screen
        name="CallsScreen"
        component={CallsScreen}
        options={{tabBarLabel: 'Calls'}}
      />
    </Tab.Navigator>
  );
};

export default TopTabNavigator;
