import React, { FC } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Routes from 'Routes';
import './App.less';
import store from './store';

const App: FC = () => (
  <Provider store={store}>
    <div className="App">
      <Router>
        <Routes />
      </Router>
    </div>
  </Provider>
);

export default App;
