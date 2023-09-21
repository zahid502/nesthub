import {createStyles} from './styles';
import {colors} from '@constants';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Search from '@components/search';

//-------------------------
interface IFriendsHeaderSearchProps {
  title: string;
  searchPlaceHolder: string;
  searchText: string;
  onSearchPress: () => void;
  onBackPress: () => void;
  searchQueryFunction: () => void;
}

//-----------------------------------------------------------------------------
const FriendsHeaderSearch: React.FC<IFriendsHeaderSearchProps> = ({
  title,
  searchText,
  searchPlaceHolder,
  onSearchPress,
  onBackPress,
  searchQueryFunction,
}) => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <>
      <View style={styles.friendsSearchContainer}>
        <View style={styles.arrowBackContainer}>
          <TouchableOpacity activeOpacity={0.5} onPress={onBackPress}>
            <AntDesign name="arrowleft" size={30} color={'black'} />
          </TouchableOpacity>
          <Text style={styles.headerTitle}>{title}</Text>
        </View>
        <TouchableOpacity onPress={onSearchPress}>
          <FontAwesome5 name="search" size={23} color={'black'} />
        </TouchableOpacity>
      </View>
      <Search
        style={styles.headerSearch}
        value={searchText}
        onChangeText={searchQueryFunction}
      />
    </>
  );
};

export default FriendsHeaderSearch;
