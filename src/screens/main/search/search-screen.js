import {Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import Search from '@components/search';
import {Divider} from '@components';

const SearchScreen = ({navigation}) => {
  return (
    <>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center',
          backgroundColor: 'white',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <AntDesign name="arrowleft" size={30} color={'gray'} />
        </TouchableOpacity>
        <Search
          placeholder="Search for friends"
          style={{borderRadius: 20, height: 40, width: '85%'}}
        />
      </View>
      <Divider />
      <View
        style={{
          flex: 1,
          justifyContent: 'center',
          backgroundColor: 'white',
          alignItems: 'center',
          paddingBottom: 100,
        }}>
        <View
          style={{
            backgroundColor: '#16428a',
            borderRadius: 100,
            padding: 20,
            marginBottom: 25,
          }}>
          <FontAwesome5
            name="search"
            size={50}
            color={'lightgray'}
            style={{transform: [{rotate: '10deg'}]}}
          />
        </View>

        <Text style={{fontSize: 16, fontWeight: '700', paddingBottom: 5}}>
          Find friends
        </Text>
        <Text
          style={{
            textAlign: 'center',
          }}>{`Search for a friend or someone you may know to \n connect with them on Facebook.`}</Text>
      </View>
    </>
  );
};

export default SearchScreen;
