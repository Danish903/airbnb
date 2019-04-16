import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import App from "../App";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";

export const Routes: React.FC<{}> = () => (
   <Router>
      <Switch>
         <Route path="/" exact component={App} />
         <Route path="/register" exact component={RegisterConnector} />
         <Route path="/login" exact component={LoginConnector} />
      </Switch>
   </Router>
);
