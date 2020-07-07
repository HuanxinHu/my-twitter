import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "pages/Login/Login";

const Routes: React.FC = (props) => (
  <Switch>
    <Route exact path="/login">
      <Login />
    </Route>
  </Switch>
);

export default Routes;
