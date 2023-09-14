import {createSlice} from '@reduxjs/toolkit';
import _ from 'lodash';

const initialState = {
  posts: [],
  comments: [],
};

export const postsSlice = createSlice({
  name: 'postsSlice',
  initialState,
  reducers: {
    setPosts: (state, action) => {
      state.posts = action.payload;
    },
    setComments: (state, action) => {
      state.comments = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setPosts, setComments} = postsSlice.actions;

export default postsSlice.reducer;
