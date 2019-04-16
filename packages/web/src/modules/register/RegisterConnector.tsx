import React, { Component } from "react";
import { RegisterController } from "@abb/controller/dist";
import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends Component {
   render() {
      return (
         <RegisterController>
            {({ submit }: { submit: any }) => <RegisterView submit={submit} />}
         </RegisterController>
      );
   }
}
