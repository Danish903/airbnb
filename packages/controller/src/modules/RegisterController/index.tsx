import * as React from "react";

import { graphql, ChildMutateProps } from "react-apollo";
import {
   RegisterMutation,
   RegisterMutationVariables
} from "../../generated/apolloComponents";
import { REGISTER_MUTATION } from "../../graphql/user/mutations/register";

interface Props {
   children: (data: {
      submit: (
         values: RegisterMutationVariables
      ) => Promise<{ [key: string]: string } | null>;
   }) => JSX.Element | null;
}
class C extends React.Component<
   ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
   submit = async (data: RegisterMutationVariables) => {
      try {
         const res = await this.props.mutate({
            variables: data
         });

         console.log({ res });
         return null;
      } catch (error) {
         const err = { email: error.message.split(":").pop() };
         return err;
      }
   };
   render() {
      return this.props.children({ submit: this.submit });
   }
}

export const RegisterController = graphql<
   Props,
   RegisterMutation,
   RegisterMutationVariables
>(REGISTER_MUTATION)(C);
