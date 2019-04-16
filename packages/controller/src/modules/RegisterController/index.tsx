import * as React from "react";

import { graphql, ChildMutateProps } from "react-apollo";
import {
   RegisterMutation,
   RegisterMutationVariables
} from "../../generated/apolloComponents";
import { REGISTER_MUTATION } from "../../graphql/user/mutations/register";
interface Props {
   children: (data: {
      submit: (values: RegisterMutationVariables) => Promise<void>;
   }) => JSX.Element | null;
}
class C extends React.Component<
   ChildMutateProps<Props, RegisterMutation, RegisterMutationVariables>
> {
   submit = async (data: RegisterMutationVariables) => {
      const res = await this.props.mutate({
         variables: data
      });

      console.log({ res });
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
