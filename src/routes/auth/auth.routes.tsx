import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {AuthNavParamList} from '../param-list';

import {LoginScreen, OtpVerificationScreen, SignupScreen} from '@screens';

interface IProps {}

const {Navigator, Screen} = createStackNavigator<AuthNavParamList>();
const AuthNav: React.FC<IProps> = () => (
  <Navigator initialRouteName={'Login'} screenOptions={{headerShown: false}}>
    <Screen name={'Login'} component={LoginScreen} />
    <Screen name={'Signup'} component={SignupScreen} />
    <Screen name={'OtpVerification'} component={OtpVerificationScreen} />
  </Navigator>
);

export default AuthNav;
