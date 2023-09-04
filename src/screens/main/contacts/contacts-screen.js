import {
  View,
  Text,
  Image,
  TouchableOpacity,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import Feather from 'react-native-vector-icons/Feather';

import database from '@react-native-firebase/database';
import {useSelector} from 'react-redux';
import styles from './style';

const ContactsScreen = ({navigation}) => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const {userId} = useSelector(state => state.auth);

  useEffect(() => {
    setLoading(true);
    const contactsRef = database().ref('users');
    contactsRef.once('value', snapshot => {
      const data = snapshot.val();
      const contactsArray = Object.values(data);
      setContacts(contactsArray);
      setLoading(false);
    });
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backIconView}
            onPress={() => navigation.navigate('HomeScreen')}>
            <Ionicons name="arrow-back-outline" size={25} color={'white'} />
          </TouchableOpacity>

          <TouchableOpacity style={styles.usernameView}>
            <Text style={[styles.usernameText, {color: 'white'}]}>
              Select Contacts
            </Text>
            {!loading && (
              <Text style={{color: 'white'}}>
                {contacts.length - 1} Contacts
              </Text>
            )}
          </TouchableOpacity>

          <View
            style={{
              flex: 1,
              flexDirection: 'row',
              justifyContent: 'center',
              alignItems: 'center',
            }}>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Feather name="search" size={20} color={'white'} />
            </TouchableOpacity>
            <TouchableOpacity style={{flex: 1, alignItems: 'center'}}>
              <Entypo
                name="dots-three-vertical"
                size={20}
                color={'white'}
                style={{}}
              />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      <FlatList
        keyExtractor={item => item.uid}
        data={contacts}
        renderItem={({item}) => {
          return (
            <>
              {userId !== item.uid && (
                <TouchableOpacity
                  style={styles.chatContainer}
                  onPress={() =>
                    navigation.navigate('ChatScreen', {
                      uid: item.uid,
                      profileImage: item.profileImage,
                      name: item.name,
                    })
                  }>
                  <View style={styles.imgView}>
                    {item?.profileImage && (
                      <Image
                        source={{uri: item?.profileImage}}
                        style={styles.userimg}
                      />
                    )}
                  </View>

                  <View style={styles.messageView}>
                    <Text style={styles.usernameText} numberOfLines={1}>
                      {item?.name}
                    </Text>
                  </View>
                </TouchableOpacity>
              )}
            </>
          );
        }}
      />
      {loading && (
        <View
          style={styles.loader}>
          <ActivityIndicator size={'large'} color={'red'}></ActivityIndicator>
        </View>
      )}
    </View>
  );
};

export default ContactsScreen;
