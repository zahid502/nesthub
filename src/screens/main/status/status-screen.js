import {View, Text} from 'react-native';
import React from 'react';

const StatusScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Text style={{flex: 1}}>Status</Text>
    </View>
  );
};

export default StatusScreen;
