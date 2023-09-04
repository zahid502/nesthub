import {
  View,
  Text,
  KeyboardAvoidingView,
  FlatList,
  TouchableOpacity,
  TextInput,
  ImageBackground,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import database from '@react-native-firebase/database';
import {useDispatch, useSelector} from 'react-redux';
import {
  setMessageNew,
  setMessages,
} from '../../../redux/slices/chat/chat-slice';
import styles from './style';
import ChatHeader from '../../../components/ChatHeader';
import { DateUtil } from '../../../utils/date-util';

const img = {
  uri: 'https://user-images.githubusercontent.com/15075759/28719144-86dc0f70-73b1-11e7-911d-60d70fcded21.png',
};

const ChatScreen = ({route, navigation}) => {
  let name = route?.params?.name;
  let uid = route?.params?.uid;
  let profileImage = route?.params?.profileImage;
  let dateTime = new Date().getTime();

  const dispatch = useDispatch();
  const {userId, userName, userProfile} = useSelector(state => state.auth);
  const {messages} = useSelector(state => state.chat);
  const [newMessage, setNewMessage] = useState('');
  const [textInputHeight, setTextInputHeight] = useState(70);

  const sendMessage = () => {
    if (newMessage.trim() === '') return;
    const newMessageObj = {
      body: newMessage,
      senderId: userId,
      sender: name,
      type: 'text',
      dateTime: dateTime,
    };
    setNewMessage('');

    const messageNode = `${userId}-${uid}`;
    const messageNode1 = `${uid}-${userId}`;
    database()
      .ref('messages')
      .child(messageNode)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          const usersRef = database().ref(`messages/${messageNode}`).push();
          usersRef.set(newMessageObj);
        } else {
          const usersRef = database().ref(`messages/${messageNode1}`).push();
          usersRef.set(newMessageObj);
        }
      });
  };

  useEffect(() => {
    getData();
    return () => {
      dispatch(setMessages([]));
      const messageNode = `${userId}-${uid}`;
      const messageNode1 = `${uid}-${userId}`;
      database()
        .ref('messages/' + messageNode)
        .off();
      database()
        .ref('messages/' + messageNode1)
        .off();
    };
  }, []);

  const getData = async () => {
    const messageNode = `${userId}-${uid}`;
    const messageNode1 = `${uid}-${userId}`;
    const usersRef = database().ref('messages/' + messageNode);
    usersRef.once('value', snapshot => {
      if (snapshot.exists()) {
        refGetData(usersRef);
        refGetDataListener(usersRef);
      } else {
        const usersRef1 = database().ref('messages/' + messageNode1);
        refGetData(usersRef1);
        refGetDataListener(usersRef1);
      }
    });
  };

  const refGetData = usersRef => {
    usersRef
      .orderByChild('dateTime')
      .limitToLast(10)
      .once('value', snapshot => {
        if (snapshot.exists()) {
          let msgArr = [];
          snapshot.forEach(snap => {
            msgArr.unshift({
              body: snap?.child('body').val(),
              dateTime: snap?.child('dateTime').val(),
              senderId: snap?.child('senderId').val(),
              sender: snap?.child('sender').val(),
              type: snap?.child('type').val(),
            });
          });
          dispatch(setMessages(msgArr));
        }
      });
  };

  const refGetDataListener = usersRef => {
    usersRef.limitToLast(1).on('child_added', snapshot => {
      if (snapshot.exists()) {
        const msgObj = {
          body: snapshot.child('body').val(),
          dateTime: snapshot.child('dateTime').val(),
          senderId: snapshot.child('senderId').val(),
          sender: snapshot.child('sender').val(),
          type: snapshot.child('type').val(),
        };
        dispatch(setMessageNew(msgObj));
      }
    });
  };

  return (
    <KeyboardAvoidingView style={styles.container}>
      <ChatHeader
        username={name}
        userImage={profileImage}
        navigation={() => navigation.navigate('InboxScreen')}
      />

      <ImageBackground source={img} resizeMode="cover" style={{flex: 1}}>
        <FlatList
          style={styles.chatSection}
          data={messages}
          inverted
          renderItem={({item, index}) => {
            return (
              <View
                key={item.id}
                style={
                  userId === item.senderId
                    ? [styles.messageContainer, styles.sent]
                    : [styles.messageContainer, styles.received]
                }>
                <Text
                  style={[
                    styles.messageText,
                    {color: userId === item.senderId ? 'white' : 'black'},
                  ]}>
                  {item.body}
                </Text>
                <Text style={{ fontSize:12, color: userId === item.senderId ? 'white' : 'black'}}>{DateUtil.getInstance().formatApiDateToAppOnlyTimeFirebase(item.dateTime)}</Text>
              </View>
            );
          }}></FlatList>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <View
            style={[
              styles.writeMessageMainview,
              {minHeight: 55},
              textInputHeight,
            ]}>
            <TouchableOpacity style={styles.iconContainer}>
              <Fontisto name="smiley" size={20} />
            </TouchableOpacity>

            <View style={styles.inputContainer}>
              <TextInput
                multiline
                value={newMessage}
                onChangeText={setNewMessage}
                onContentSizeChange={e =>
                  setTextInputHeight(e.nativeEvent.contentSize.height)
                }
                placeholder="Write your message"
                style={styles.input}
              />
            </View>

            <View style={styles.fileAndCameraIconContainer}>
              <TouchableOpacity style={styles.attachFileIcon}>
                <Entypo name="attachment" size={20} />
              </TouchableOpacity>
              <TouchableOpacity style={styles.camerIcon}>
                <Entypo name="camera" size={20} />
              </TouchableOpacity>
            </View>
          </View>
          <View
            style={{
              backgroundColor: '#3C73E9',
              marginRight: 5,
              height: 50,
              width: 50,
              justifyContent: 'center',
              borderRadius: 25,
            }}>
            <TouchableOpacity
              style={{alignItems: 'center'}}
              onPress={sendMessage}>
              <Ionicons name="send" size={25} color={'#fff'} />
            </TouchableOpacity>
          </View>
        </View>
      </ImageBackground>
    </KeyboardAvoidingView>
  );
};

export default ChatScreen;
