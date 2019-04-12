import React, { Component } from "react";
import { RegisterView } from "./ui/RegisterView";
import { FormValues } from "./ui/RegisterView";

export class RegisterConnector extends Component {
   handleSubmit = async (values: FormValues) => {
      console.log(values);
      return null;
   };
   render() {
      return (
         <div>
            <RegisterView submit={this.handleSubmit} />;
         </div>
      );
   }
}
