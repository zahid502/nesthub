import {View, Text, FlatList, Image, TouchableOpacity} from 'react-native';
import React, {useEffect} from 'react';
import _ from 'lodash';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {DrawerToolbar} from '@components';
import {setAuthToken, setUserData} from '@redux/slices/auth/auth-slice';
import {
  setInbox,
  setNewInbox,
  setInboxPagination,
} from '@redux/slices/inbox/inbox-slice';
import {DateUtil} from '@app-utils/date-util';
import CustomFloatingActionbutton from '@components/CustomFloatingActionbutton';
import styles from './style';

const InboxScreen = ({navigation}) => {
  const {userId} = useSelector(state => state.auth);
  const {inboxes} = useSelector(state => state.inbox);
  const dispatch = useDispatch();

  const fetchInboxData = () => {
    database()
      .ref()
      .child('users/' + userId + '/connection')
      .orderByChild('lastMsgDateTime')
      .limitToFirst(10)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          let arr = [];
          snapshot?.forEach(snap => {
            arr.push({
              name: snap.child('name').val(),
              profileImage: snap.child('profileImage').val(),
              uid: snap.child('uid').val(),
              lastMsgDateTime: snap.child('lastMsgDateTime').val(),
              lastMsg: snap.child('lastMsg').val(),
              id: snap?.key,
            });
          });
          dispatch(setInbox(arr));
          fetchInboxDataListener();
        } else {
          fetchInboxDataListener();
        }
      });
  };

  const fetchInboxDataListener = () => {
    database()
      .ref('users/' + userId + '/connection')
      .limitToFirst(1)
      .on('child_changed', snap => {
        const newObj = {
          name: snap.child('name').val(),
          profileImage: snap.child('profileImage').val(),
          uid: snap.child('uid').val(),
          lastMsgDateTime: snap.child('lastMsgDateTime').val(),
          lastMsg: snap.child('lastMsg').val(),
          id: snap?.key,
        };
        dispatch(setNewInbox(newObj));
      });
    database()
      .ref('users/' + userId + '/connection')
      .limitToLast(1)
      .on('child_added', snap => {
        const newObj = {
          name: snap.child('name').val(),
          profileImage: snap.child('profileImage').val(),
          uid: snap.child('uid').val(),
          lastMsgDateTime: snap.child('lastMsgDateTime').val(),
          lastMsg: snap.child('lastMsg').val(),
          id: snap?.key,
        };
        dispatch(setNewInbox(newObj));
      });
  };

  const loadMoreInboxes = () => {
    const lastMesgId = inboxes[inboxes.length - 1]?.lastMsgDateTime;
    console.log('lastMesgId...', lastMesgId);
    if (lastMesgId) {
      database()
        .ref()
        .child('users/' + userId + '/connection')
        .orderByChild('lastMsgDateTime')
        .startAt(lastMesgId)
        .limitToFirst(10)
        .once('value', snapshot => {
          let arr = [];
          if (snapshot.exists()) {
            snapshot.forEach(snap => {
              arr.push({
                name: snap.child('name').val(),
                profileImage: snap.child('profileImage').val(),
                uid: snap.child('uid').val(),
                lastMsgDateTime: snap.child('lastMsgDateTime').val(),
                lastMsg: snap.child('lastMsg').val(),
                id: snap?.key,
              });
            });
            console.log('arrrr ===', arr);
            dispatch(setInboxPagination(arr));
          }
        });
    }
  };

  useEffect(() => {
    fetchInboxData();
    return () => {
      database()
        .ref('users/' + userId + '/connection')
        .off();
    };
  }, []);

  const onContactPress = () => {
    navigation.navigate('Contacts');
  };

  const logout = () => {
    console.log('Logout successfully');
    dispatch(setUserData(''));
    dispatch(setAuthToken(''));
    navigation.closeDrawer();
  };

  return (
    <>
      <DrawerToolbar name={'Inbox'} onPress={logout} />
      <View style={styles.container}>
        <FlatList
          data={inboxes}
          keyExtractor={item => item?.id ?? ''}
          onEndReachedThreshold={0}
          initialNumToRender={10}
          removeClippedSubviews={true}
          updateCellsBatchingPeriod={100}
          onEndReached={() => {
            if (inboxes.length >= 10) loadMoreInboxes();
          }}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              style={styles.chatContainer}
              onPress={() => {
                navigation.navigate('Chat', {
                  uid: item.uid,
                  profileImage: item.profileImage,
                  name: item.name,
                });
              }}>
              <View style={styles.imgView}>
                <Image
                  source={{uri: item.profileImage}}
                  style={styles.userimg}
                />
              </View>

              <View style={styles.messageView}>
                <Text style={styles.usernameText} numberOfLines={1}>
                  {item.name}
                </Text>
                <Text style={styles.msgText} numberOfLines={1}>
                  {item.lastMsg}
                </Text>
              </View>
              <View style={styles.timeView}>
                <Text style={styles.timeText}>
                  {DateUtil.getInstance().formatApiDateToAppDateTime(
                    item.lastMsgDateTime,
                  )}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        <CustomFloatingActionbutton onPress={onContactPress} />
      </View>
    </>
  );
};

export default InboxScreen;
