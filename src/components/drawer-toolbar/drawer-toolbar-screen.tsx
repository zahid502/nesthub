import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {useTheme} from '@hooks/use-theme';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import {createStyles} from './styles';
import {
  DrawerActions,
  getFocusedRouteNameFromRoute,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import {MainNavigationProp} from '@routes/param-list';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {ScreenEnum} from '@app-types/screen-names';

type DToolbarProps = {name: ScreenEnum,
  onPress?: () => void};

const DrawerToolbar = ({name,   onPress = () => {}}: DToolbarProps) => {
  const navigation = useNavigation<MainNavigationProp<'Home'>>();
  const route = getFocusedRouteNameFromRoute(useRoute());

  const {theme} = useTheme();
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={() => navigation?.dispatch(DrawerActions.openDrawer())}>
        <Ionicons
          name={'menu-sharp'}
          size={theme.dimensions.normalIconSize}
          color={'white'}
        />
      </TouchableOpacity>
      <View>
        <Text numberOfLines={1} style={styles.screenText}>
          {route ?? name}
        </Text>
      </View>
      <TouchableOpacity style={styles.drawerIconWrapper} onPress={() => onPress && onPress()}>
        <AntDesign
          name={'plus'}
          size={theme.dimensions.normalIconSize}
          color={'white'}
        />
      </TouchableOpacity>
    </View>
  );
};

export default DrawerToolbar;
