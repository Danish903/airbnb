import React, { Component } from "react";
import { RegisterController } from "@abb/controller/dist";
import { RegisterView } from "./ui/RegisterView";

export class RegisterConnector extends Component {
   // handleSubmit = async (values: FormValues) => {
   //    console.log(values);
   // };
   render() {
      return (
         <RegisterController>
            {({ submit }) => <RegisterView submit={submit} />}
         </RegisterController>
      );
   }
}
