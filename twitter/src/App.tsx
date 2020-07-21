import React, { FC } from 'react';
import Routes from 'Routes';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';
import './App.less';

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
