import {View, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {friendRequest, reactFriendRequest} from '@services/api-services';
import {
  setFriendRequestsTo,
  setFriendRequestsFrom,
  removeFriendRequestFrom,
} from '@redux/slices/friends/friends-slice';
import {useDispatch, useSelector} from 'react-redux';
import {SearchUtil} from '@app-utils/search-util';
import {FriendsHeaderSearch, FriendsItem} from '@components';

const FriendRequestScreen = ({navigation}) => {
  const {apiUserId, authToken} = useSelector(state => state.auth);
  const {friendRequestsFrom} = useSelector(state => state.friends);
  const searchUtil = SearchUtil.getInstance();
  const dispatch = useDispatch();

  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  useEffect(() => {
    fetchfriends();
  }, []);

  const fetchfriends = async () => {
    let data = await friendRequest(authToken, apiUserId, true);
    if (data?.message === 'Success.') {
      dispatch(setFriendRequestsFrom(data?.data));
    }
  };

  const reactFriendReq = async (item, reaction) => {
    dispatch(removeFriendRequestFrom(item));
    // console.log("item...",item);
    // myId, friendReqId, reaction, friendId

    // let data = await reactFriendRequest(authToken, apiUserId, reaction, "friendId");
    // console.log('reactFriendRequest... data', data);
    // if (data?.message === 'Success.') {
    //   dispatch(setFriendRequests(data?.data));
    // }
  };

  const searchQuery = search => {
    setSearchText(search);
    const searchedData = searchUtil.searchItem(search, friendRequestsFrom);

    if (searchedData) {
      setSearchedData(searchedData);
    }
  };

  const onBackPress = () => {
    navigation.goBack();
  };

  const onSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderFriendRequestsItem = ({item}) => {
    return (
      <FriendsItem
        friend={item}
        addButtonTitle="Confirm"
        removeButtonTitle="Delete"
        onAddFriendPress={() => {
          reactFriendReq(item, 'accept');
        }}
        onRemoveFriendPress={() => {
          reactFriendReq(item, 'reject');
        }}
      />
    );
  };

  return (
    <View style={{flex: 1, backgroundColor: 'white'}}>
      <FriendsHeaderSearch
        title="Friend Requests"
        searchText={searchText}
        onBackPress={onBackPress}
        onSearchPress={onSearchPress}
        searchQueryFunction={searchQuery}
      />
      <View
        style={{
          padding: 10,
          paddingTop: 7,
        }}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={searchText ? searchedData : friendRequestsFrom}
          contentContainerStyle={{
            overflow: 'hidden',
            paddingBottom: 90,
          }}
          onEndReached={() => {}}
          keyboardDismissMode={'on-drag'}
          renderItem={renderFriendRequestsItem}
          onEndReachedThreshold={0}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
        />
      </View>
    </View>
  );
};

export default FriendRequestScreen;
