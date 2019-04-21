import { gql } from "apollo-boost";

export const FIND_LISTINGS_QUERY = gql`
   query FindListings {
      findListings {
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
