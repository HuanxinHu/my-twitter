import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "pages/Login/Login";
import Register from "pages/Register/Register";
import Feeds from "pages/Feeds/Feeds";

const Routes: React.FC = (props) => (
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
    <Route exact path="/register">
      <Register />
    </Route>
    <Route exact path="/">
      <Feeds />
    </Route>
  </Switch>
);

export default Routes;
