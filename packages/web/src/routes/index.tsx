import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import { RegisterConnector } from "../modules/register/RegisterConnector";

export const Routes: React.FC<{}> = () => (
   <Router>
      <Switch>
         <Route path="/" exact component={App} />
         <Route path="/register" exact component={RegisterConnector} />
      </Switch>
   </Router>
);
