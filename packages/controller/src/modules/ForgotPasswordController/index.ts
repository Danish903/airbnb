import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import { FORGOT_PASSWORD } from "../../graphql/user/mutations/forgotPassword";
import {
   ForgotPassowrdMutation,
   ForgotPassowrdMutationVariables
} from "src/generated/apolloComponents";

interface Props {
   children: (data: {
      submit: (
         values: ForgotPassowrdMutationVariables
      ) => Promise<{ [key: string]: string } | null>;
   }) => JSX.Element | null;
}
class F extends React.Component<
   ChildMutateProps<
      Props,
      ForgotPassowrdMutation,
      ForgotPassowrdMutationVariables
   >
> {
   submit = async (values: ForgotPassowrdMutationVariables) => {
      try {
         const res = await this.props.mutate({
            variables: values
         });
         console.log(res);
         return null;
      } catch (error) {
         console.log(error.message.split(":").pop());
         const err = { email: error.message.split(":").pop() };
         return err;
      }
   };
   render() {
      return this.props.children({ submit: this.submit });
   }
}

export const ForgotPasswordController = graphql<
   Props,
   ForgotPassowrdMutation,
   ForgotPassowrdMutationVariables
>(FORGOT_PASSWORD)(F);
