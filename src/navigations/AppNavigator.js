import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {SafeAreaView} from 'react-native';
import {useSelector} from 'react-redux';
import {
  ChatScreen,
  ContactsScreen,
  HomeScreen,
  LoginScreen,
  SignupScreen,
  SplashScreen,
} from '../screens';

const Stack = createNativeStackNavigator();

const AppNavigator = () => {
  const {userId} = useSelector(state => state.auth);

  return (
    <NavigationContainer>
      <SafeAreaView backgroundColor={'#3C73E9'} style={{flex: 0}} />
      <SafeAreaView backgroundColor={'white'} style={{flex: 1}}>
        <Stack.Navigator
          initialRouteName={
            userId && userId !== '' ? 'HomeScreen' : 'LoginScreen'
          }
          screenOptions={{headerShown: false}}>
          <Stack.Screen name="LoginScreen" component={LoginScreen} />
          <Stack.Screen name="SignupScreen" component={SignupScreen} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="HomeScreen" component={HomeScreen} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ContactsScreen" component={ContactsScreen} />
        </Stack.Navigator>
      </SafeAreaView>
    </NavigationContainer>
  );
};

export default AppNavigator;
