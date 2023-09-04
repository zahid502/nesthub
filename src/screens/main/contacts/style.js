import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
  },
  headerContainer: {
    height: 60,
    backgroundColor: '#3C73E9',
  },
  header: {
    flex: 1,
    flexDirection: 'row',
  },
  backIconView: {
    justifyContent: 'center',
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
  },

  usernameView: {
    flex: 2,
    justifyContent: 'center',
    marginHorizontal: 30,
  },

  usernameText: {
    fontSize: 18,
    color: 'white',
    fontWeight: 'bold',
  },
  chatContainer: {
    flex: 1,
    flexDirection: 'row',
    padding: 15,
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
    marginHorizontal: 15,
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
  loader: {
    zIndex: 1000,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
export default styles;
