import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  inboxes: [],
  currentReff: '',
};

export const inboxSlice = createSlice({
  name: 'inboxSlice',
  initialState,
  reducers: {
    setInbox: (state, action) => {
      state.inboxes = action.payload;
    },
    setInboxPagination: (state, action) => {
      const previousInboxes = state.inboxes;
      if (previousInboxes.length > 0) {
        state.inboxes = _.uniqBy(
          [...previousInboxes, ...action.payload],
          'lastMsgDateTime',
        );
      }
    },
    setNewInbox: (state, action) => {
      const previusData = [...state.inboxes];
      const newInbox = action.payload;
      const getIndex = previusData?.findIndex(
        item => item.uid === newInbox.uid,
      );

      if (getIndex > -1) {
        previusData.splice(getIndex, 1);
      }
      state.inboxes = [newInbox, ...previusData];
    },
  },
});

// Action creators are generated for each case reducer function
export const {setInbox, setInboxPagination, setNewInbox} = inboxSlice.actions;

export default inboxSlice.reducer;
