import {createStyles} from './styles';
import {colors} from '@constants';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import {Image, Text, TouchableOpacity, View} from 'react-native';
import _ from 'lodash';

const user = require('../../../assets/images/profile1.png');

//-------------------------
interface IYourFriendsItemProps {
  friend: any;
  onOptionPress: (friend: any) => void;
}

//-----------------------------------------------------------------------------
const YourFriendsItem: React.FC<IYourFriendsItemProps> = ({
  friend,
  onOptionPress,
}) => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.yourFriendsContainer}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={user} />
      </View>
      <View style={styles.nameSection}>
        <Text style={styles.name}>{friend?.name}</Text>
        <TouchableOpacity
          style={styles.optionsSection}
          onPress={() => onOptionPress(friend)}>
          <SimpleLineIcons name="options" size={18} color={'gray'} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default YourFriendsItem;
