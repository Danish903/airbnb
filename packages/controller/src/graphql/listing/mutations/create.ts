import { gql } from "apollo-boost";

export const CREATE_LISTING = gql`
   mutation CreateListing($data: ListingInput!, $file: Upload) {
      createListing(data: $data, file: $file)
   }
`;
