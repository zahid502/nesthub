import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  friendsList: [],
  suggestedFriends: [],
  friendRequestsTo: [],
  friendRequestsFrom: [],
};

export const friendsSlice = createSlice({
  name: 'friendsSlice',
  initialState,
  reducers: {
    setFriendsList: (state, action) => {
      state.friendsList = action.payload;
    },
    setSuggestedFriends: (state, action) => {
      state.suggestedFriends = action.payload;
    },
    setFriendRequestsTo: (state, action) => {
      state.friendRequestsTo = action.payload;
    },
    setFriendRequestsFrom: (state, action) => {
      state.friendRequestsFrom = action.payload;
    },
    removeFriendRequestFrom: (state, action) => {
      const previousData = [...state.friendRequestsFrom];
      const newFriendRequestsFrom = action.payload;
      const getIndex = previousData?.findIndex(
        item => item?._id === newFriendRequestsFrom?._id,
      );

      if (getIndex !== -1) {
        previousData?.splice(getIndex, 1);
      }
      state.friendRequestsFrom = previousData;
    },
    removeFriendRequestTo: (state, action) => {
      const previousData = [...state.friendRequestsTo];
      const newFriendRequestsTo = action.payload;
      const getIndex = previousData?.findIndex(
        item => item?._id === newFriendRequestsTo?._id,
      );

      if (getIndex !== -1) {
        previousData?.splice(getIndex, 1);
      }
      state.friendRequestsTo = previousData;
    },
    removeSuggestedFriends: (state, action) => {
      const previousData = [...state.suggestedFriends];
      const newSuggestedFriends = action.payload;
      const getIndex = previousData?.findIndex(
        item => item?._id === newSuggestedFriends?._id,
      );

      if (getIndex !== -1) {
        previousData?.splice(getIndex, 1);
      }
      state.suggestedFriends = previousData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setFriendsList,
  setSuggestedFriends,
  removeSuggestedFriends,
  setFriendRequestsTo,
  removeFriendRequestTo,
  setFriendRequestsFrom,
  removeFriendRequestFrom,
} = friendsSlice.actions;

export default friendsSlice.reducer;
