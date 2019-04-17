import React, { Component } from "react";
import { LoginController } from "@abb/controller/dist";
import { LoginView } from "./ui/LoginView";
import { RouteComponentProps } from "react-router";

export class LoginConnector extends Component<RouteComponentProps<{}>> {
   onFinish = () => {
      this.props.history.push("/");
   };
   render() {
      return (
         <LoginController>
            {({ submit }: { submit: any }) => (
               <LoginView submit={submit} onFinish={this.onFinish} />
            )}
         </LoginController>
      );
   }
}
