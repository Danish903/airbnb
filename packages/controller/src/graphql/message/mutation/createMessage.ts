import { gql } from "apollo-boost";

export const CREATE_MESSAGE_MUTATION = gql`
   mutation CreateMessageMutation($text: String!, $listingId: String!) {
      createMessage(text: $text, listingId: $listingId)
   }
`;
