import {View, Text, TouchableOpacity, FlatList, Image} from 'react-native';
import React from 'react';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import {DrawerToolbar} from '@components';

const FriendRequestScreen = () => {
  let profile1 = require('../../../assets/images/profile1.png');
  let profile2 = require('../../../assets/images/profile2.png');
  const suggestedFriends = [
    {name: 'John Ch', img: profile1},
    {name: 'Ali Khan', img: profile2},
    {name: 'Ayesha Khan', img: profile1},
    {name: 'Maha Khan', img: profile2},
    {name: 'Saba Khan', img: profile1},
    {name: 'Kamran Khan', img: profile2},
    {name: 'Mohsin Khan', img: profile1},
    {name: 'Kaleem Khan', img: profile2},
    {name: 'Zeeshan Khan', img: profile1},
    {name: 'Shoiab Khan', img: profile2},
    {name: 'Zoha Khan', img: profile1},
    {name: 'Alyia Khan', img: profile2},
    {name: 'Nimra Khan', img: profile1},
    {name: 'Fasil Khan', img: profile2},
    {name: 'Jameel Khan', img: profile1},
  ];

  const renderSuggestedItemHeader = () => {
    return (
      <>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <TouchableOpacity
            activeOpacity={0.5}
            onPress={() => {}}
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
            onPress={() => {}}
            style={{padding: 10, backgroundColor: '#d6d6d6', borderRadius: 18}}>
            <Text style={{fontWeight: '500'}}>Your friends</Text>
          </TouchableOpacity>
        </View>
        <View
          style={{
            borderBottomWidth: 0.4,
            borderBottomColor: 'gray',
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
  const renderSuggestedItem = ({item}) => {
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
            source={item.img}
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
              }}>
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
              }}>
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
            onPress={() => {}}
            style={{
              padding: 5,
              backgroundColor: '#d6d6d6',
              borderRadius: 100,
            }}>
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
          ListHeaderComponent={renderSuggestedItemHeader}
          renderItem={renderSuggestedItem}
          onEndReachedThreshold={0}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
        />
      </View>
    </>
  );
};

export default FriendRequestScreen;
