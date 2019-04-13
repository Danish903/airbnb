import { gql } from "apollo-boost";

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
