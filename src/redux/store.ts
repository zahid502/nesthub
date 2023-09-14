import AsyncStorage from '@react-native-async-storage/async-storage';
import {combineReducers, configureStore} from '@reduxjs/toolkit';
import {persistReducer, persistStore} from 'redux-persist';
import authSlice from './slices/auth/auth-slice';
import chatSlice from './slices/chat/chat-slice';
import inboxSlice from './slices/inbox/inbox-slice';
import bottomTabReducer from './slices/bottomTab/bottomTab-slice';
import postsSlice from './slices/posts/posts-slice';
import contactsSlice from './slices/contacts/contacts-slice';

const rootReducer = combineReducers({
  auth: authSlice,
  chat: chatSlice,
  inbox: inboxSlice,
  contacts: contactsSlice,
  posts: postsSlice,
  bottom: bottomTabReducer,
});

const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
  blacklist: ['inbox', 'chat', 'bottom'],
};

const store = configureStore({
  reducer: persistReducer(persistConfig, rootReducer),
  devTools: process.env.NODE_ENV !== 'production',
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
      immutableCheck: false,
    }),
});

const persistor = persistStore(store);
persistor.flush();
export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;

export default {store, persistor};

