import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useState} from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {friendRequest, reactFriendRequest} from '@services/api-services';
import {
  setFriendRequestsTo,
  setFriendRequestsFrom,
  removeFriendRequestFrom,
} from '@redux/slices/friends/friends-slice';
import {useDispatch, useSelector} from 'react-redux';
import Search from '@components/search';
import {SearchUtil} from '@app-utils/search-util';

const FriendRequestScreen = ({navigation}) => {
  const {apiUserId, authToken} = useSelector(state => state.auth);
  const {friendRequestsFrom} = useSelector(state => state.friends);
  const searchUtil = SearchUtil.getInstance();
  const dispatch = useDispatch();
  const [searchText, setSearchText] = useState('');
  const [searchedData, setSearchedData] = useState([]);

  let profile1 = require('../../../assets/images/profile1.png');

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

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  const onSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderFriendRequestsItem = ({item}) => {
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
            source={profile1}
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
            {'Muhammad Zahid'}
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
              onPress={() => reactFriendReq(item, 'accept')}>
              <Text style={{color: 'white', fontSize: 16, fontWeight: '600'}}>
                Confirm
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
              onPress={() => reactFriendReq(item, 'reject')}>
              <Text style={{fontSize: 16, fontWeight: '600'}}>Delete</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    );
  };

  return (
    <>
      <View style={{flex: 1, backgroundColor: 'white'}}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            padding: 12,
            borderBottomWidth: 0.4,
            borderBlockColor: 'gray',
            backgroundColor: 'white',
          }}>
          <View style={{flexDirection: 'row', alignItems: 'center'}}>
            <TouchableOpacity activeOpacity={0.5} onPress={onBackArrowPress}>
              <AntDesign name="arrowleft" size={30} color={'black'} />
            </TouchableOpacity>
            <Text style={{paddingLeft: 10, fontSize: 18}}>Friend Requests</Text>
          </View>
          <TouchableOpacity onPress={onSearchPress}>
          <FontAwesome5 name="search" size={23} color={'black'} />
          </TouchableOpacity>
        </View>
        <Search
          style={{
            borderRadius: 20,
          }}
          value={searchText}
          onChangeText={searchQuery}
        />
        <View
          style={{
            flex: 1,
            backgroundColor: 'white',
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
    </>
  );
};

export default FriendRequestScreen;
