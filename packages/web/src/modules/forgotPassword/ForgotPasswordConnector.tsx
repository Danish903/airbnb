import React from "react";
import { ForgotPasswordView } from "./ui/ForgotPasswordView";
import { ForgotPasswordController } from "@abb/controller/dist";
export default function ForgotPasswordConnector() {
   return (
      <ForgotPasswordController>
         {({ submit }) => <ForgotPasswordView submit={submit} />}
      </ForgotPasswordController>
   );
}
