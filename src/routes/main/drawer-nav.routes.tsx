import React from 'react';
import MainNav from './main.routes';
import {createDrawerNavigator} from '@react-navigation/drawer';
import { SafeAreaView, View} from 'react-native';
import {DrawerNavParamList} from '@routes/param-list';
import {Drawer} from '@components';
import {useTheme} from '@hooks/use-theme';

//-----------------
interface IProps {}

//------------------------------------------------------------------------
const {Navigator, Screen} = createDrawerNavigator<DrawerNavParamList>();
const MainDrawerNav: React.FC<IProps> = ({}) => {
  const {theme} = useTheme();

  return (
    <>
      <SafeAreaView
        style={{backgroundColor: theme.color.onExtremePrimary}}></SafeAreaView>
      <View style={{flex: 1}}>
        <Navigator
          drawerContent={({navigation}) => <Drawer navigation={navigation} />}
          screenOptions={{
            headerShown: false,
            drawerType: 'back',
            swipeEnabled: false,
          }}>
          <Screen name={'MainHome'} component={MainNav} />
        </Navigator>
      </View>
    </>
  );
};

export default MainDrawerNav;
