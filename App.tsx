// src/App.tsx
import React from 'react';
import { Provider } from 'react-redux';
import { store } from './src/data/state/store';
import MainNavigator from './src/presentation/navigation/mainNavigatior';

const App = () => {
  return (
    <Provider store={store}>
      <MainNavigator />
    </Provider>
  );
};

export default App;
