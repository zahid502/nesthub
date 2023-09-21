import {Theme} from '@app-interfaces';
import {colors} from '@constants';
import {useTheme} from '@hooks/use-theme';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import {useNavigation} from '@react-navigation/native';
import {MainNavigationProp} from '@routes/param-list';
import React from 'react';
import {
  Platform,
  StyleProp,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  ViewStyle,
} from 'react-native';
import Octicons from 'react-native-vector-icons/Octicons';

//----------------------
interface ISearchProps {
  value?: string;
  placeholder?: string;
  screenName?: string;
  style?: StyleProp<ViewStyle>;
  onChangeText?: (text: string) => void;
}

//---------------------------------------
const Search: React.FC<ISearchProps> = ({
  style,
  value = '',
  onChangeText,
  placeholder = 'Search',
  screenName,
}) => {
  const {theme} = useTheme();
  const styles = useThemeAwareObject(createStyles);
  const navigation = useNavigation<MainNavigationProp<'Home'>>();
  return (
    <TouchableOpacity
      activeOpacity={1}
      onPress={() => {}}
      style={[styles.container, style]}>
      <Octicons
        name={'search'}
        size={theme.dimensions.normalIconSize}
        color={colors.lightGray}
      />
      <TextInput
        defaultValue={value}
        autoFocus={screenName === 'Search' ? true : false}
        style={styles.input}
        placeholder={placeholder}
        onChangeText={onChangeText}
        placeholderTextColor={theme.color.onSurfaceLight}
      />
    </TouchableOpacity>
  );
};

export default Search;

//--------------------------------------
const createStyles = (theme: Theme) => {
  return StyleSheet.create({
    container: {
      margin: 10,
      borderRadius: 10,
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: Platform.OS === 'ios' ? 10 : 0,
      paddingHorizontal: 12,
      backgroundColor: theme.color.ligtPrimaryBackground,
      zIndex: 1,

      ////////Shadow//////////
      shadowColor: colors.primary,
      shadowOffset: {
        width: 0,
        height: 1,
      },
      shadowOpacity: 0.23,
      shadowRadius: 2.62,
      elevation: 2,
    },
    input: {
      flex: 1,
      fontSize: 16,
      marginStart: 12,
      color: theme.color.onBackground,
    },
    searchText: {
      flex: 1,
      fontSize: 16,
      marginStart: Platform.OS == 'android' ? 16 : 12,
      paddingVertical: Platform.OS == 'android' ? 11.8 : 0,
      color: theme.color.onSurfaceLight,
    },
  });
};
