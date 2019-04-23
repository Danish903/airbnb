import { gql } from "apollo-boost";

export const FIND_MESSAGES_QUERY = gql`
   query FindMessagesQuery($listingId: String!) {
      findMessages(listingId: $listingId) {
         id
         listingId
         text
         sender {
            id
            email
         }
      }
   }
`;
