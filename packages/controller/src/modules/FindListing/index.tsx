// @ts-ignore
import * as React from "react";
import { graphql } from "react-apollo";
import { FIND_LISTINGS_QUERY } from "../../graphql/listing/queries/findListing";
import {
   FindListingsQuery,
   FindListingsQueryVariables
} from "../../generated/apolloComponents";

interface owner {
   id: string;
   email: string;
}
interface ListingType {
   id: string;
   name: string;
   category: string;
   description: string;
   price: number;
   latitude: number;
   longitude: number;
   guests: number;
   beds: number;
   amenities: string[];
   owner: owner;
   imageURL?: string;
}
export interface WithFindListingsQueryType {
   listings: ListingType[];
   loading: boolean;
}
export const withFindListingsQuery = graphql<
   any,
   FindListingsQuery,
   FindListingsQueryVariables,
   WithFindListingsQueryType
>(FIND_LISTINGS_QUERY, {
   props: ({ data }) => {
      let listings: ListingType[] = [];
      if (data && !data.loading && data.findListings) {
         listings = data.findListings;
      }
      return {
         listings,
         loading: data ? data.loading : false
      };
   }
});
