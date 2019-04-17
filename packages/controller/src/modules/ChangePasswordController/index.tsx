import * as React from "react";
import { graphql, ChildMutateProps } from "react-apollo";
import { CHANGE_PASSWORD_MUTATION } from "../../graphql/user/mutations/changePassword";
import {
   ChangePassowrdMutation,
   ChangePassowrdMutationVariables
} from "src/generated/apolloComponents";

interface Props {
   children: (data: {
      submit: (
         values: ChangePassowrdMutationVariables
      ) => Promise<{ [key: string]: string } | null>;
   }) => JSX.Element | null;
}
class F extends React.Component<
   ChildMutateProps<
      Props,
      ChangePassowrdMutation,
      ChangePassowrdMutationVariables
   >
> {
   submit = async (values: ChangePassowrdMutationVariables) => {
      try {
         const res = await this.props.mutate({
            variables: values
         });
         console.log(res);
         return null;
      } catch (error) {
         console.log(error.message.split(":").pop());
         const err = { password: error.message.split(":").pop() };
         return err;
      }
   };
   render() {
      return this.props.children({ submit: this.submit });
   }
}

export const ChangePasswordController = graphql<
   Props,
   ChangePassowrdMutation,
   ChangePassowrdMutationVariables
>(CHANGE_PASSWORD_MUTATION)(F);
