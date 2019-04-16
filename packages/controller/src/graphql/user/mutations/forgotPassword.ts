import { gql } from "apollo-boost";

export const FORGOT_PASSWORD = gql`
   mutation ForgotPassowrd($email: String!) {
      forgotPassword(email: $email)
   }
`;
