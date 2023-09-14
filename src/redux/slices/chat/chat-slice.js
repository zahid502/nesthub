import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  messages: [],
  currentRef: '',
};

export const chatSlice = createSlice({
  name: 'chatSlice',
  initialState,
  reducers: {
    setMessages: (state, action) => {
      state.messages = action.payload;
    },
    setPagination: (state, action) => {
      const previousMsgs = state.messages;
      if (previousMsgs.length > 0)
        state.messages = _.uniqBy(
          [...previousMsgs, ...action.payload],
          'dateTime',
        );
    },
    setMessageNew: (state, action) => {
      const newArr = [action.payload, ...state.messages];
      state.messages = _.uniqBy(newArr, 'dateTime');
    },
    setCurrentRef: (state, action) => {
      state.currentRef = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setMessages, setPagination, setMessageNew, setCurrentRef} = chatSlice.actions;

export default chatSlice.reducer;
