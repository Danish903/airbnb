import React, { Component } from "react";
import { RegisterController } from "@abb/controller/dist";
import { RegisterView } from "./ui/RegisterView";
import { RouteComponentProps } from "react-router";

export class RegisterConnector extends Component<RouteComponentProps<{}>> {
   onFinish = () => {
      this.props.history.push("/m/confirm-email", {
         message: "check your email to confirm your account "
      });
   };
   render() {
      return (
         <RegisterController>
            {({ submit }: { submit: any }) => (
               <RegisterView submit={submit} onFinish={this.onFinish} />
            )}
         </RegisterController>
      );
   }
}
