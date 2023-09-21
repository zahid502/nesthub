import {createStyles} from './styles';
import {colors} from '@constants';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React from 'react';
import {Text, View} from 'react-native';
import _ from 'lodash';
import Button from '@components/button';
import Devider from '@components/devider';

//-------------------------
interface IFriendsHeaderProps {
  onFriendRequestPress: () => void;
  onYourFriendPress: () => void;
}

//-----------------------------------------------------------------------------
const FriendsHeader: React.FC<IFriendsHeaderProps> = ({
  onFriendRequestPress,
  onYourFriendPress,
}) => {
  const styles = useThemeAwareObject(createStyles);

  return (
    <>
      <View style={styles.friendHeaderButtonsWrapper}>
        <Button
          title={'Friend request'}
          style={styles.friendHeaderButtons}
          textStyle={styles.buttonText}
          onPress={onFriendRequestPress}
        />
        <Button
          title={'Your friends'}
          style={styles.friendHeaderButtons}
          textStyle={styles.buttonText}
          onPress={onYourFriendPress}
        />
      </View>
      <Devider style={styles.deviderLine} />
      <View>
        <Text style={styles.mayYouKnowText}>People Yau May Know</Text>
      </View>
    </>
  );
};

export default FriendsHeader;
