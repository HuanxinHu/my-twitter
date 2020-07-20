import Feeds from 'pages/Feeds/Feeds';
import Login from 'pages/Login/Login';
import Profile from 'pages/Profile/Profile';
import Register from 'pages/Register/Register';
import React from 'react';
import { Route, Switch } from 'react-router-dom';

const Routes: React.FC = (props) => (
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
    <Route exact path="/profile">
      <Profile />
    </Route>
    <Route path="/">
      <Feeds />
    </Route>
  </Switch>
);

export default Routes;
