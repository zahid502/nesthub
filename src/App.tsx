/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import store from '@redux/store';
import Routes from '@routes/routes';
import React from 'react';
import {Provider} from 'react-redux';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store.store}>
      <PersistGate loading={null} persistor={store.persistor}>
        <Routes />
      </PersistGate>
    </Provider>
  );
};

export default App;
