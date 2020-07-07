import React, { FC } from "react";
import Routes from "Routes";
import { BrowserRouter as Router } from "react-router-dom";
import "./App.less";

const App: FC = () => (
  <div className="App">
    <Router>
      <Routes />
    </Router>
  </div>
);

export default App;
