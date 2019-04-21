import * as React from "react";
import {
   graphql,
   ChildMutateProps,
   withApollo,
   WithApolloClient
} from "react-apollo";
import { LOGIN_MUTATION } from "../../graphql/user/mutations/login";
import {
   LoginMutation,
   LoginMutationVariables
} from "src/generated/apolloComponents";

interface Props {
   children: (data: {
      submit: (
         values: LoginMutationVariables
      ) => Promise<{ [key: string]: string } | null>;
   }) => JSX.Element | null;
}
class L extends React.Component<
   ChildMutateProps<
      WithApolloClient<Props>,
      LoginMutation,
      LoginMutationVariables
   >
> {
   submit = async (values: LoginMutationVariables) => {
      try {
         const res = await this.props.mutate({
            variables: values
         });
         console.log(res);
         await this.props.client.resetStore();
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

export const LoginController = graphql<
   Props,
   LoginMutation,
   LoginMutationVariables
>(LOGIN_MUTATION)(withApollo<Props>(L as any));
