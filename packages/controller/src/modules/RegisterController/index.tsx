import * as React from "react";
import { gql } from "apollo-boost";
import { graphql, ChildMutateProps } from "react-apollo";
import {
   RegisterMutation,
   RegisterMutationVariables
} from "../../generated/apolloComponents";

export const REGISTER_MUTATION = gql`
   mutation Register($data: RegisterInput!) {
      register(data: $data) {
         id
         firstName
         lastName
         email
         name
      }
   }
`;
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
