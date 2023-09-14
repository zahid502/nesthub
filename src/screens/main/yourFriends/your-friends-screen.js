import {
  View,
  Text,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';
import React, {useState} from 'react';
import SimpleLineIcons from 'react-native-vector-icons/SimpleLineIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Search from '@components/search';

const YourFriendsScreen = ({navigation}) => {
  const [searchText, setSearchText] = useState('');

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

  const searchQuery = search => {
    setSearchText(search);
  };

  const onBackArrowPress = () => {
    navigation.goBack();
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
            source={item.img}
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
            }}>
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
        <FontAwesome5 name="search" size={23} color={'black'} />
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
          data={suggestedFriends}
          contentContainerStyle={{
            overflow: 'hidden',
            paddingBottom: 20,
          }}
          onEndReached={() => {}}
          keyboardDismissMode={'on-drag'}
          renderItem={renderSuggestedItem}
          onEndReachedThreshold={0}
          initialNumToRender={20}
          maxToRenderPerBatch={20}
          updateCellsBatchingPeriod={100}
        />
      </View>
    </View>
  );
};

export default YourFriendsScreen;
