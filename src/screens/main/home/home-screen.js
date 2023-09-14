/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import {View} from 'react-native';

import {CommonActions} from '@react-navigation/native';
import {useDispatch} from 'react-redux';
import CustomHeader from '../../../components/CustomHeader';
import {setUserData} from '../../../redux/slices/auth/auth-slice';
const HomeScreen = ({navigation}) => {
  const dispatch = useDispatch();
  const gotoLogout = () => {
    dispatch(setUserData(''));
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [{name: 'Login'}],
      }),
    );
  };

  return (
    <View style={{flex: 1}}>
      <CustomHeader onPressDots={gotoLogout} />
    </View>
  );
};

export default HomeScreen;
