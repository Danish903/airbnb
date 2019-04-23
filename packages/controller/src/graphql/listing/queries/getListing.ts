import { gql } from "apollo-boost";

export const GET_LISTING_QUERY = gql`
   query GetListing($listingId: String!) {
      getListing(listingId: $listingId) {
         id
         name
         category
         imageURL
         description
         price
         latitude
         longitude
         guests
         beds
         amenities
         owner {
            id
            email
         }
      }
   }
`;
