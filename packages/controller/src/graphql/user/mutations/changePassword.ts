import { gql } from "apollo-boost";

export const CHANGE_PASSWORD_MUTATION = gql`
   mutation ChangePassowrd($data: ChangePasswordInput!) {
      changePassword(data: $data) {
         email
         name
      }
   }
`;
