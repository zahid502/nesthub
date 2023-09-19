import React from 'react';
import {SafeAreaView} from 'react-native';
import {createStyles} from './styles';
import {colors} from '@constants';

import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import {DrawerItem} from '@react-navigation/drawer';
import {DrawerNavigationHelpers} from '@react-navigation/drawer/lib/typescript/src/types';
import {Text, TouchableOpacity, View} from 'react-native';
import {useTheme} from '@hooks/use-theme';
import {
  setApiUserId,
  setAuthToken,
  setUserData,
} from '@redux/slices/auth/auth-slice';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useDispatch} from 'react-redux';
import {DrawerActions} from '@react-navigation/native';

//-----------------------------
interface IDrawerContentProps {
  navigation: DrawerNavigationHelpers;
  isfacility?: boolean;
}

//-----------------------------------------------------------------
const Drawer: React.FC<IDrawerContentProps> = ({
  navigation,
  isfacility = false,
}) => {
  const {isDarkTheme, theme, toggleTheme} = useTheme();

  const styles = useThemeAwareObject(createStyles);

  const dispatch = useDispatch();

  const logout = () => {
    navigation?.dispatch(DrawerActions.closeDrawer());
    console.log('Logout successfully');
    dispatch(setUserData(''));
    dispatch(setAuthToken(''));
    dispatch(setApiUserId(''));
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.container}>
        <DrawerItem
          inactiveTintColor={theme.color.onPrimaryDark}
          label={({focused, color}) => {
            return (
              <View style={styles.drawerItemContainer}>
                <Text style={styles.itemText}>Contacts</Text>
                {false && <View style={styles.countContainer}></View>}
              </View>
            );
          }}
          icon={({color, size}) => (
            <AntDesign name="setting" color={colors.white} size={size} />
          )}
          onPress={() => {
            navigation.navigate('Contacts');
          }}
        />
        <DrawerItem
          inactiveTintColor={theme.color.onPrimaryDark}
          label={({focused, color}) => {
            return (
              <View style={styles.drawerItemContainer}>
                <Text style={styles.itemText}>Logout</Text>
              </View>
            );
          }}
          icon={({color, size}) => (
            <TouchableOpacity onPress={logout}>
              <MaterialCommunityIcons
                name="logout"
                color={colors.white}
                size={size}
              />
            </TouchableOpacity>
          )}
          onPress={logout}
        />
      </View>
      <View style={styles.themeChangeMainWrapper}>
        <TouchableOpacity
          activeOpacity={0.5}
          onPress={toggleTheme}
          style={styles.themeChangeWrapper}>
          <MaterialCommunityIcons
            name={isDarkTheme ? 'toggle-switch' : 'toggle-switch-off'}
            color={isDarkTheme ? colors.middlePrimary : colors.white}
            size={60}
          />
          <Text style={[styles.itemText, {paddingLeft: 10}]}>
            {isDarkTheme ? 'Dark Mode' : 'Light Mode'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Drawer;
