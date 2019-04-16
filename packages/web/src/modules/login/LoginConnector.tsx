import React, { Component } from "react";
import { LoginController } from "@abb/controller/dist";
import { LoginView } from "./ui/LoginView";

export class LoginConnector extends Component {
   render() {
      return (
         <LoginController>
            {({ submit }: { submit: any }) => <LoginView submit={submit} />}
         </LoginController>
      );
   }
}
