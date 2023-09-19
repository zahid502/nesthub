import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DrawerToolbar} from '@components';
import {addFriendRequest, fetchAllUsers} from '@services/api-services';
import {useDispatch, useSelector} from 'react-redux';
import {
  removeSuggestedFriends,
  setSuggestedFriends,
} from '@redux/slices/friends/friends-slice';
import Devider from '@components/devider';

const FriendsScreen = ({navigation}) => {
  const {apiUserId, authToken} = useSelector(state => state.auth);
  const {suggestedFriends} = useSelector(state => state.friends);
  const dispatch = useDispatch();

  let profile2 = require('../../../assets/images/profile2.png');

  useEffect(() => {
    fetchfriends();
  }, []);

  const fetchfriends = async () => {
    let data = await fetchAllUsers(authToken, apiUserId);
    if (data?.length > 0) {
      dispatch(setSuggestedFriends(data));
    }
  };

  const addFriend = async item => {
    dispatch(removeSuggestedFriends(item));
    let data = await addFriendRequest(authToken, apiUserId, item?._id);
    if (data?.length > 0) {
      // console.log('data...', data);
    }
  };

  const removeFriend = async item => {
    dispatch(removeSuggestedFriends(item));
  };

  const yourFriends = () => {
    navigation.navigate('YourFriends');
  };

  const friendsRequest = () => {
    navigation.navigate('FriendRequest');
  };

  const onSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderSuggestedFriendsHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={friendsRequest}
            style={{
              padding: 10,
              backgroundColor: '#d6d6d6',
              borderRadius: 18,
              marginRight: 10,
            }}>
            <Text style={{fontWeight: '500'}}>Friend requests</Text>
          </TouchableOpacity>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={yourFriends}
            style={{padding: 10, backgroundColor: '#d6d6d6', borderRadius: 18}}>
            <Text style={{fontWeight: '500'}}>Your friends</Text>
          </TouchableOpacity>
        </View>
        <Devider
          style={{
            marginVertical: 15,
          }}
        />
        <View>
          <Text style={{fontSize: 22, fontWeight: '700', paddingBottom: 20}}>
            People Yau May Know
          </Text>
        </View>
      </>
    );
  };

  const renderSuggestedFriendsItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 15,
        }}>
        <View
          style={{
            height: 77,
            width: 77,
            borderWidth: 0.5,
            borderRadius: 100,
            borderColor: 'gray',
          }}>
          <Image
            style={{
              height: 75,
              width: 75,
              borderRadius: 100,
              resizeMode: 'cover',
            }}
            source={profile2}
          />
        </View>
        <View style={{flex: 1, justifyContent: 'center', paddingLeft: 10}}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 18,
              paddingBottom: 5,
              paddingLeft: 2,
            }}>
            {item.name}
          </Text>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                backgroundColor: '#024fde',
                alignItems: 'center',
                borderRadius: 10,
                width: '47%',
                marginRight: 10,
              }}
              onPress={() => addFriend(item)}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                Add Friend
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={{
                paddingVertical: 10,
                backgroundColor: '#d6d6d6',
                alignItems: 'center',
                borderRadius: 10,
                width: '47%',
              }}
              onPress={() => removeFriend(item)}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>Remove</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <DrawerToolbar name={'Friends'} />
      <View style={{flex: 1, backgroundColor: 'white', padding: 10}}>
        <View
          style={{
            justifyContent: 'space-between',
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 10,
          }}>
          <Text style={{fontSize: 32}}>Friends</Text>
          <TouchableOpacity
            activeOpacity={0.5}
            style={{
              padding: 5,
              backgroundColor: '#d6d6d6',
              borderRadius: 100,
            }}
            onPress={onSearchPress}>
            <FontAwesome5 name="search" size={20} color={'black'} />
          </TouchableOpacity>
        </View>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={suggestedFriends}
          contentContainerStyle={{
            overflow: 'hidden',
            paddingBottom: 90,
          }}
          onEndReached={() => {}}
          keyboardDismissMode={'on-drag'}
          ListHeaderComponent={renderSuggestedFriendsHeader}
          renderItem={renderSuggestedFriendsItem}
          onEndReachedThreshold={0}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
        />
      </View>
    </>
  );
};

export default FriendsScreen;
