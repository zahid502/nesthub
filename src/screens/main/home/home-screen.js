import React from 'react';
import {View} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CustomHeader from '../../../components/CustomHeader';
import CustomStatusBar from '../../../components/CustomStatusBar';
import TopTabNavigator from '../../../navigations/TopTabNavigator';
import {setUserData} from '../../../redux/slices/auth/auth-slice';

const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const gotoLogout = () => {
    dispatch(setUserData(''));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'LoginScreen'}],
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomStatusBar />
      <CustomHeader onPressDots={gotoLogout} />
      <TopTabNavigator />
    </View>
  );
};

export default HomeScreen;
