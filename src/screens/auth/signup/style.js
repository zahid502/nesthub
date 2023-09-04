import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    paddingHorizontal: 20,
  },
  headerContainer: {
    flex: 0.3,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logoImg: {
    height: 70,
    width: 70,
  },
  formContainer: {},
  footerContainer: {
    flex: 1,
    marginTop: 10,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  footerTop: {
    marginBottom: 20,
    flexDirection: 'row',
  },
  newUserText: {
    fontSize: 15,
  },
  signupLinkText: {
    fontSize: 16,
    color: '#3C73E9',
    fontWeight: 'bold',
    marginHorizontal: 3,
  },
  activityIndicatorContainer: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'lightgray',
  },
});

export default styles;
