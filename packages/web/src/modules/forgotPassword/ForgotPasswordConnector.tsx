import React from "react";
import { ForgotPasswordView } from "./ui/ForgotPasswordView";
import { ForgotPasswordController } from "@abb/controller/dist";
import { RouteComponentProps } from "react-router";
export default function ForgotPasswordConnector(
   props: RouteComponentProps<{}>
) {
   const onFinish = () => {
      props.history.push("/m/reset-password", {
         message: "check your email to reset your password. "
      });
   };
   return (
      <ForgotPasswordController>
         {({ submit }) => (
            <ForgotPasswordView submit={submit} onFinish={onFinish} />
         )}
      </ForgotPasswordController>
   );
}
