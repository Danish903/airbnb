import React, { Component } from "react";
import { LogoutController } from "@abb/controller/dist";
import CallLogout from "./CallLogout";
import { RouteComponentProps } from "react-router";
export default class Logout extends Component<RouteComponentProps<{}>> {
   onFinish = () => {
      this.props.history.push("/login");
   };
   render() {
      return (
         <LogoutController>
            {({ logout }) => (
               <CallLogout logout={logout} onFinish={this.onFinish} />
            )}
         </LogoutController>
      );
   }
}
