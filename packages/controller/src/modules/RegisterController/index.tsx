import * as React from "react";
import { gql } from "apollo-boost";
import { graphql, ChildMutateProps } from "react-apollo";

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
      submit: (values: any) => Promise<void>;
   }) => JSX.Element | null;
}
class C extends React.Component<ChildMutateProps<Props, any, any>> {
   submit = async (values: any) => {
      const res = await this.props.mutate({
         variables: {
            data: values
         }
      });
      console.log({ res });
   };
   render() {
      return this.props.children({ submit: this.submit });
   }
}

export const RegisterController = graphql(REGISTER_MUTATION)(C);
