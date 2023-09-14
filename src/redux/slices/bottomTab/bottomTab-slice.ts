import {RouteBottomState} from '@redux/states';
import {createSlice} from '@reduxjs/toolkit';

const initialState: RouteBottomState = {
  loading: false,
  error: false,
  message: '',
  mainRoute: 'Inbox',
  routeParams: '',
};

const bottomTabSlice = createSlice({
  name: 'bottomTabSlice',
  initialState: initialState,
  reducers: {
    setMainRoute: (state, action) => {
      state.mainRoute = action.payload;
    },
    setRouteParams: (state, action) => {
      state.routeParams = action.payload;
    },
    clearRouteParams: (state, action) => {
      state.routeParams = undefined;
    },
  },
});

const bottomTabReducer = bottomTabSlice.reducer;
export const {setMainRoute, setRouteParams, clearRouteParams} =
  bottomTabSlice.actions;
export default bottomTabReducer;
