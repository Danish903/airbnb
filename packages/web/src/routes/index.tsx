import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import { AuthRoute } from "@abb/controller/dist";
import App from "../App";
import { RegisterConnector } from "../modules/register/RegisterConnector";
import { LoginConnector } from "../modules/login/LoginConnector";
import ForgotPasswordConnector from "../modules/forgotPassword/ForgotPasswordConnector";
import ChangePasswordConnector from "../modules/changePassword/ChangePasswordConnector";
import TextPage from "../modules/TextPage";
import { CreateListingConnector } from "../modules/listing/create/createListingConnector";
import { FindListingConnector } from "../modules/listing/find/FindListingConnector";
import Logout from "../modules/logout/Logout";
import TestSub from "../modules/TestSub";
import { ViewListingConnector } from "../modules/listing/view/ViewListingConnector";

export const Routes: React.FC<{}> = () => (
   <Router>
      <Switch>
         <Route path="/" exact component={App} />
         <Route path="/register" exact component={RegisterConnector} />
         <Route path="/login" exact component={LoginConnector} />
         <Route
            path="/forgot-password"
            exact
            component={ForgotPasswordConnector}
         />
         <Route
            path="/user/change-password/:id"
            exact
            component={ChangePasswordConnector}
         />
         <Route path="/logout" exact component={Logout} />
         <Route path="/test-sub" exact component={TestSub} />
         <Route path="/listings" component={FindListingConnector} />
         <Route path="/listing/:listingId" component={ViewListingConnector} />

         <AuthRoute path="/create-listing" component={CreateListingConnector} />
         <Route path="/m" component={TextPage} />
      </Switch>
   </Router>
);
