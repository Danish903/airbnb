import React from "react";
import { ChangePasswordController } from "@abb/controller/dist";
import { ChangePasswordView } from "./ui/ChangePasswordUI";
import { RouteComponentProps } from "react-router";

export default function ChangePasswordConnector(
   props: RouteComponentProps<{ id: string }>
) {
   return (
      <ChangePasswordController>
         {({ submit }) => (
            <ChangePasswordView submit={submit} token={props.match.params.id} />
         )}
      </ChangePasswordController>
   );
}
