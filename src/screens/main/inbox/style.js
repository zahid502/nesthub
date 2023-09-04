import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    marginTop:10
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 10,
    borderRadius: 10,
    backgroundColor:"lightgray",
    marginHorizontal:10,
    marginBottom:10
  },
  imgView: {
    flex: 0.5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  userimg: {
    height: 50,
    width: 50,
  },
  messageView: {
    flex: 2,
    justifyContent: 'center',
    marginLeft: 15,
  },
  usernameText: {
    fontSize: 17,
    color: 'black',
    fontWeight: 'bold',
  },
  msgText: {
    fontSize: 15,
  },

  timeView: {
    justifyContent: 'center',
    flex: 1,
    alignItems: 'flex-end',
  },
  timeText: {
    fontSize: 12,
  },
});

export default styles;
