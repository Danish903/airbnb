import { gql } from "apollo-boost";

export const CREATE_LISTING = gql`
   mutation CreateListing($data: ListingInput!) {
      createListing(data: $data)
   }
`;
