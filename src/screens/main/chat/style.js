import React from 'react';
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  chatSection: {
    flex: 1,
    padding: 10,
  },
  messageContainer: {
    maxWidth: '70%',
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
  },
  sent: {
    alignSelf: 'flex-end',
    backgroundColor: '#3C73E9',
  },
  received: {
    alignSelf: 'flex-start',
    backgroundColor: '#ffffff',
  },
  messageText: {
    color: 'white',
    fontSize: 14,
  },
  writeMessageMainview: {
    flex: 4,
    flexDirection: 'row',
    backgroundColor: 'white',
    margin: 10,
    paddingHorizontal: 10,
    alignItems: 'center',
    borderRadius: 40,
    justifyContent: 'center',
  },
  iconContainer: {},
  inputContainer: {
    flex: 1,
    marginHorizontal: 5,
  },
  input: {
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: 17,
    height: 40,
    lineHeight: 30,
  },
  fileAndCameraIconContainer: {
    flexDirection: 'row',
  },
  attachFileIcon: {
    marginRight: 20,
  },

  camerIcon: {},
});

export default styles;
