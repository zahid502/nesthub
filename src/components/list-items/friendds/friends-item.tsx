import {createStyles} from './styles';
import {colors} from '@constants';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React from 'react';
import {Text, View, Image} from 'react-native';
import _ from 'lodash';
import Button from '@components/button';

const user = require('../../../assets/images/profile1.png');

//-------------------------
interface IFriendsItemProps {
  index: number;
  friend: any;
  addButtonTitle: string;
  removeButtonTitle: string;
  onAddFriendPress: (friend: any) => void;
  onRemoveFriendPress: (friend: any) => void;
}

//-----------------------------------------------------------------------------
const FriendsItem: React.FC<IFriendsItemProps> = ({
  index,
  addButtonTitle,
  removeButtonTitle,
  friend,
  onAddFriendPress,
  onRemoveFriendPress,
}) => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <View style={styles.container}>
      <View style={styles.avatarWrapper}>
        <Image style={styles.avatar} source={user} />
      </View>
      <View style={styles.friendsSection}>
        <Text style={styles.name}>
          {friend?.name ? friend?.name : 'Muhammad Zahid'}
        </Text>
        <View style={styles.buttonWrapper}>
          <Button
            title={addButtonTitle}
            style={styles.addButton}
            onPress={() => onAddFriendPress(friend)}
          />
          <Button
            title={removeButtonTitle}
            style={styles.removeButton}
            textStyle={styles.buttonText}
            onPress={() => onRemoveFriendPress(friend)}
          />
        </View>
      </View>
    </View>
  );
};

export default FriendsItem;
