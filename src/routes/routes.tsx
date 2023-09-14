import {StatusBar} from 'react-native';
import React, {useEffect} from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import AuthNav from './auth/auth.routes';
import MainDrawerNav from './main/drawer-nav.routes';
import SplashScreen from 'react-native-splash-screen';
import {useSelector} from 'react-redux';
import {RootState} from '@redux/store';
import { useTheme } from '@hooks/use-theme';

interface IProps {}

const Routes: React.FC<IProps> = () => {
  
  const {theme} = useTheme();
  const {userId, authToken} = useSelector((state: RootState) => state.auth);
  useEffect(() => {
    setTimeout(() => {
      SplashScreen.hide();
    }, 500);
  }, []);

  const themeColor = {
    ...DefaultTheme,

    colors: {
      ...DefaultTheme.colors,

      background: theme.color.primaryBackground,
    },
  }; 

  return (
    <NavigationContainer theme={themeColor}>
      <StatusBar
        backgroundColor={theme.color.onExtremePrimary}
        barStyle="light-content"
      />
      {userId && userId!=='' ? <MainDrawerNav /> : <AuthNav />}
    </NavigationContainer>
  );
};

export default Routes;
