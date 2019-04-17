import React from "react";
import { ChangePasswordController } from "@abb/controller/dist";
import { ChangePasswordView } from "./ui/ChangePasswordUI";
import { RouteComponentProps } from "react-router";

export default function ChangePasswordConnector(
   props: RouteComponentProps<{ id: string }>
) {
   const onFinish = () => {
      props.history.push("/m/password-changed", {
         message: "Your password has been changed. "
      });
   };

   return (
      <ChangePasswordController>
         {({ submit }) => (
            <ChangePasswordView
               submit={submit}
               token={props.match.params.id}
               onFinish={onFinish}
            />
         )}
      </ChangePasswordController>
   );
}
