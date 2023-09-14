import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  userId: '',
  userName: '',
  userEmail: '',
  userProfile: '',
  userData: {},
  authToken: '',
  apiUserId: '',
};

export const authSlice = createSlice({
  name: 'authSlice',
  initialState,
  reducers: {
    setUserData: (state, action) => {
      const userData = action.payload;
      state.userData = userData;
      state.userId = userData.uid;
      state.userName = userData.name;
      state.userEmail = userData.email;
      state.userProfile = userData.profileImage;
    },
    setAuthToken: (state, action) => {
      state.authToken = action.payload;
    },
    setApiUserId: (state, action) => {
      state.apiUserId = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setUserData, setAuthToken, setApiUserId} = authSlice.actions;

export default authSlice.reducer;
