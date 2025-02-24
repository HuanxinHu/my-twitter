import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { Router } from 'react-router-dom';
import history from 'utils/history';
import Routes from 'Routes';
import './App.less';
import store from './store';

const App: FC = () => (
  <Provider store={store}>
    <div className="App">
      <Router history={history}>
        <Routes />
      </Router>
    </div>
  </Provider>
);

export default App;
