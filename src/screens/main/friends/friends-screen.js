import {View, Text, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DrawerToolbar, FriendsHeader, FriendsItem} from '@components';
import {addFriendRequest, fetchAllUsers} from '@services/api-services';
import {useDispatch, useSelector} from 'react-redux';
import {launchImageLibrary} from 'react-native-image-picker';
import {
  removeSuggestedFriends,
  setSuggestedFriends,
} from '@redux/slices/friends/friends-slice';

const FriendsScreen = ({navigation}) => {
  const {apiUserId, authToken} = useSelector(state => state.auth);
  const {suggestedFriends} = useSelector(state => state.friends);
  const dispatch = useDispatch();

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
      <FriendsHeader
        onFriendRequestPress={friendsRequest}
        onYourFriendPress={yourFriends}
      />
    );
  };

  const renderSuggestedFriendsItem = ({item}) => {
    return (
      <FriendsItem
        friend={item}
        addButtonTitle="Add Friend"
        removeButtonTitle="Remove"
        onAddFriendPress={() => {
          addFriend(item);
        }}
        onRemoveFriendPress={() => {
          removeFriend(item);
        }}
      />
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
