import {createStyles} from './styles';
import {colors} from '@constants';
import {useThemeAwareObject} from '@hooks/use-theme-aware-object';
import React, {useEffect, useRef} from 'react';
import {Text, View, Animated} from 'react-native';
import Avatar from '@components/avatar';
import {DateUtil} from '@app-utils/date-util';
import RippleEffect from '@components/ripple';
import {useTheme} from '@hooks/use-theme';
import _ from 'lodash';

const user = require('../../assets/images/profile.png');

//-------------------------
interface IInboxItemProps {
  firstRender: boolean;
  index: number;
  newMsgIndex: number;
  inbox: any;
  onItemPress?: (inbox: any) => void;
}

//-----------------------------------------------------------------------------
const InboxItem: React.FC<IInboxItemProps> = ({
  firstRender,
  index,
  newMsgIndex,
  inbox,
  onItemPress,
}) => {
  const styles = useThemeAwareObject(createStyles);
  const {theme} = useTheme();

  const message = inbox?.lastMessage
    ? inbox?.lastMessage?.replace(/<br\/>/g, '')?.replace(/<br \/>/g, '')
    : 'No messages yet';
  const date = inbox?.lastMsgDateTime?.split(' ');
  const lastMessageDate = DateUtil.getInstance().getChatDate(
    date ? date[0] : '',
  );
  const lastMessageDateTime =
    lastMessageDate == 'Today' ? `${date[1]} ${date[2]}` : `${lastMessageDate}`;

  const fadeAnim = useRef(new Animated.Value(0)).current;
  const itemsDown = useRef(new Animated.Value(0)).current;
  const animatedPosition = newMsgIndex;
  const duration = 1000;

  const onPressChange = () => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: animatedPosition * 88,
        duration: duration,
        useNativeDriver: false,
      }),
      Animated.timing(itemsDown, {
        toValue: index < animatedPosition ? 90 : 0,
        duration: duration,
        useNativeDriver: false,
      }),
    ]).start();
  };

  useEffect(() => {
    if (!firstRender) {
      onPressChange();
    }
  }, [newMsgIndex]);

  return (
    <Animated.View
      style={[
        styles.renderItem,
        {
          backgroundColor: index == animatedPosition ? 'blue' : 'red',
          bottom: index == animatedPosition ? fadeAnim : undefined,
          top: index < animatedPosition ? itemsDown : undefined,
        },
      ]}>
      <RippleEffect
        rippleColor={theme.color.surface}
        style={styles.inboxItem}
        onPress={() => {
          onItemPress && onItemPress(inbox);
        }}>
        <>
          <View style={styles.imageWrapper}>
            {false && (
              <View
                style={[
                  styles.onlineStatus,
                  {
                    backgroundColor:
                      inbox?.MobileOnline || inbox?.Online
                        ? colors.green
                        : colors.red,
                  },
                ]}></View>
            )}
            <Avatar uri={inbox?.image ? inbox?.image : user} />
          </View>
          <View style={styles.inboxSection}>
            <View style={styles.inboxHeader}>
              <Text numberOfLines={1} style={styles.title}>
                {inbox?.name}
              </Text>
            </View>
            <View style={styles.inboxHeader}>
              <Text
                numberOfLines={1}
                style={[
                  styles.lastMessage,
                  {
                    fontWeight:
                      inbox?.unread && inbox?.unread > 0 ? 'bold' : 'normal',
                    fontSize: inbox?.unread && inbox?.unread > 0 ? 11.5 : 12,
                  },
                ]}>
                {message}
              </Text>
              {inbox?.unread > 0 && false && (
                <View style={styles.counterStyle}>
                  <Text style={styles.counterTextStyle}>{inbox?.unread}</Text>
                </View>
              )}
            </View>
            <Text style={styles.timeStamp}>{lastMessageDateTime}</Text>
          </View>
          {inbox?.unread > 0 && (
            <View style={styles.messageCountWrapper}>
              <Text style={styles.messageCount}>{inbox?.unread}</Text>
            </View>
          )}
        </>
      </RippleEffect>
    </Animated.View>
  );
};

export default InboxItem;
