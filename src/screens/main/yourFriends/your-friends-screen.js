import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React, {useEffect, useRef, useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Search from '@components/search';
import {fetchfriendsList} from '@services/api-services';
import {setFriendsList} from '@redux/slices/friends/friends-slice';
import {useDispatch, useSelector} from 'react-redux';
import {SearchUtil} from '@app-utils/search-util';
import RBSheet from 'react-native-raw-bottom-sheet';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const YourFriendsScreen = ({navigation}) => {
  const {authToken, apiUserId} = useSelector(state => state.auth);
  const {friendsList} = useSelector(state => state.friends);
  const dispatch = useDispatch();
  const searchUtil = SearchUtil.getInstance();
  const refRBSheet = useRef();
  const [item, setItem] = useState({});
  const [searchedData, setSearchedData] = useState([]);
  const [searchText, setSearchText] = useState('');

  let profile1 = require('../../../assets/images/profile1.png');

  useEffect(() => {
    fetchfriends();
  }, []);

  const fetchfriends = async () => {
    let data = await fetchfriendsList(authToken, apiUserId);
    if (data?.length > 0) {
      dispatch(setFriendsList(data));
    }
  };

  const searchQuery = search => {
    setSearchText(search);
    const searchedData = searchUtil.searchItem(search, friendsList);

    if (searchedData) {
      setSearchedData(searchedData);
    }
  };

  const onBackArrowPress = () => {
    navigation.goBack();
  };

  const onOptionPress = item => {
    setItem(item);
    refRBSheet.current.open(), console.log('item...', item);
  };

  const onSearchPress = () => {
    navigation.navigate('Search');
  };

  const renderFriendsItem = ({item}) => {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          paddingBottom: 15,
        }}>
        <View
          style={{
            height: 71,
            width: 71,
            borderWidth: 0.5,
            borderRadius: 100,
            borderColor: 'gray',
          }}>
          <Image
            style={{
              height: 70,
              width: 70,
              borderRadius: 100,
              resizeMode: 'cover',
            }}
            source={profile1}
          />
        </View>
        <View
          style={{
            flex: 1,
            justifyContent: 'space-between',
            paddingLeft: 12,
            flexDirection: 'row',
          }}>
          <Text
            style={{
              fontWeight: '500',
              fontSize: 16,
              paddingBottom: 5,
              paddingLeft: 2,
            }}>
            {item.name}
          </Text>
          <TouchableOpacity
            style={{
              alignItems: 'center',
              paddingRight: 5,
            }}
            onPress={() => onOptionPress(item)}>
            <SimpleLineIcons name="options" size={18} color={'gray'} />
          </TouchableOpacity>
        </View>
      </View>
    );
  };

  return (
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
          <Text style={{paddingLeft: 10, fontSize: 18}}>Your friends</Text>
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
        style={{flex: 1, backgroundColor: 'white', padding: 10, paddingTop: 7}}>
        <FlatList
          showsVerticalScrollIndicator={false}
          bounces={false}
          data={searchText ? searchedData : friendsList}
          contentContainerStyle={{
            overflow: 'hidden',
            paddingBottom: 20,
          }}
          onEndReached={() => {}}
          keyboardDismissMode={'on-drag'}
          renderItem={renderFriendsItem}
          onEndReachedThreshold={0}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
        />
        <RBSheet
          ref={refRBSheet}
          closeOnDragDown={true}
          closeOnPressMask={true}
          onClose={() => {}}
          dragFromTopOnly={true}
          height={400}
          customStyles={{
            wrapper: {
              backgroundColor: 'rgba(164, 175, 175, 0.30)',
            },
            draggableIcon: {
              backgroundColor: 'white',
            },
            container: {
              backgroundColor: 'white',
            },
          }}>
          <View style={{paddingHorizontal: 12}}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingBottom: 15,
              }}>
              <View
                style={{
                  height: 61,
                  width: 61,
                  borderWidth: 0.5,
                  borderRadius: 100,
                  borderColor: 'gray',
                }}>
                <Image
                  style={{
                    height: 60,
                    width: 60,
                    borderRadius: 100,
                    resizeMode: 'cover',
                  }}
                  source={profile1}
                />
              </View>
              <View
                style={{
                  flex: 1,
                  justifyContent: 'space-between',
                  paddingLeft: 12,
                  flexDirection: 'row',
                }}>
                <View>
                  <Text
                    style={{
                      fontWeight: '500',
                      fontSize: 16,
                      paddingBottom: 5,
                      paddingLeft: 2,
                    }}>
                    {item.name}
                  </Text>
                  <Text
                    style={{
                      paddingLeft: 2,
                      color: 'gray',
                    }}>
                    {'Friends since September 2023'}
                  </Text>
                </View>
              </View>
            </View>
          </View>
          <View
            style={{
              borderBottomWidth: 0.4,
              borderBottomColor: 'gray',
              marginBottom: 15,
            }}
          />
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              paddingHorizontal: 12,
            }}>
            <View
              style={{
                height: 61,
                width: 61,
                borderWidth: 0.5,
                borderRadius: 100,
                borderColor: 'gray',
              }}>
              <Image
                style={{
                  height: 60,
                  width: 60,
                  borderRadius: 100,
                  resizeMode: 'cover',
                }}
                source={profile1}
              />
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingLeft: 12,
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    paddingBottom: 5,
                    paddingLeft: 2,
                  }}>
                  {item.name}
                </Text>
                <Text
                  style={{
                    paddingLeft: 2,
                    color: 'gray',
                  }}>
                  {'Friends since September 2023'}
                </Text>
              </View>
            </View>
          </View>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingBottom: 15,
              paddingHorizontal: 12,
            }}>
            <MaterialCommunityIcons
              name="account-remove-outline"
              size={40}
              color={'red'}
              style={{transform: [{scaleX: -1}]}}
            />
            <View
              style={{
                flex: 1,
                justifyContent: 'space-between',
                paddingLeft: 12,
                flexDirection: 'row',
              }}>
              <View>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    paddingBottom: 5,
                    paddingLeft: 2,
                    color: 'red',
                  }}>
                  {`Unfriend ${item?.name}`}
                </Text>
                <Text
                  style={{
                    paddingLeft: 2,
                    color: 'gray',
                  }}>
                  {`Remove ${item?.name} as a friend`}
                </Text>
              </View>
            </View>
          </View>
        </RBSheet>
      </View>
    </View>
  );
};

export default YourFriendsScreen;
