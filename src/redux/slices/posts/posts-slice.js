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
    addPost: (state, action) => {
      const previousData = [...state.posts];
      const newPosts = action.payload;
      state.posts = [...previousData, newPosts];
    },
    removePost: (state, action) => {
      const previousData = [...state.posts];
      const newPosts = action.payload;
      const getIndex = previousData?.findIndex(
        item => item?._id === newPosts?._id,
      );

      if (getIndex !== -1) {
        previousData?.splice(getIndex, 1);
      }
      state.posts = previousData;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setPosts, addPost, removePost, setComments} = postsSlice.actions;

export default postsSlice.reducer;
