import {
  View,
  Text,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect} from 'react';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import CustomFloatingActionbutton from '../../../components/CustomFloatingActionbutton';
import {setInbox, setNewInbox} from '../../../redux/slices/chat/inbox-slice';
import styles from './style';
import { DateUtil } from '../../../utils/date-util';

const InboxScreen = ({navigation}) => {
  const {userId} = useSelector(state => state.auth);
  const {inboxes} = useSelector(state => state.inbox);
  const dispatch = useDispatch();

  const fetchInboxData = () => {
    database()
      .ref('users/' + userId + '/connection')
      .once('value', snapshot => {
        let arr = [];
        snapshot.forEach(snap => {
          arr.push({
            name: snap.child('name').val(),
            profileImage: snap.child('profileImage').val(),
            uid: snap.child('uid').val(),
            lastMsgDateTime: snap.child('lastMsgDateTime').val(),
            lastMsg: snap.child('lastMsg').val(),
          });
        });
        dispatch(setInbox(arr));
        fetchInboxDataListener();
      });
  }; 

  const fetchInboxDataListener = () => {
    database()
      .ref('users/' + userId + '/connection')
      .on('child_changed', snap => {
        const newObj = {
          name: snap.child('name').val(),
          profileImage: snap.child('profileImage').val(),
          uid: snap.child('uid').val(),
          lastMsgDateTime: snap.child('lastMsgDateTime').val(),
          lastMsg: snap.child('lastMsg').val(),
        };
        dispatch(setNewInbox(newObj));
      });
    database()
      .ref('users/' + userId + '/connection')
      .on('child_added', snap => {
        const newObj = {
          name: snap.child('name').val(),
          profileImage: snap.child('profileImage').val(),
          uid: snap.child('uid').val(),
          lastMsgDateTime: snap.child('lastMsgDateTime').val(),
          lastMsg: snap.child('lastMsg').val(),
        };
        dispatch(setNewInbox(newObj));
      });
  };

  useEffect(() => {
    fetchInboxData();

    return () => {
      database()
        .ref('users/' + userId + '/connection')
        .off();
    };
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        keyExtractor={item => item.uid}
        data={inboxes}
        renderItem={({item, index}) => (
          <TouchableOpacity
            key={index}
            style={styles.chatContainer}
            onPress={() => {
              navigation.navigate('ChatScreen', {
                uid: item.uid,
                profileImage: item.profileImage,
                name: item.name,
              });
            }}>
            <View style={styles.imgView}>
              <Image source={{uri: item.profileImage}} style={styles.userimg} />
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
              <Text style={styles.timeText}>{DateUtil.getInstance().formatApiDateToAppDateTime(item.lastMsgDateTime)}</Text>
            </View>
          </TouchableOpacity>
        )}
      />
      <CustomFloatingActionbutton
        onPress={() => navigation.navigate('ContactsScreen')}
      />
    </View>
  );
};

export default InboxScreen;
