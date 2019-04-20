// @ts-ignore
import * as React from "react";
import { graphql } from "react-apollo";
import { FIND_LISTINGS_QUERY } from "../../graphql/listing/queries/findListing";
import {
   FindListingsQuery,
   FindListingsQueryVariables,
   Listing
} from "../../generated/apolloComponents";

export interface WithFindListingsQueryType {
   listings: Listing[];
   loading: boolean;
}
export const withFindListingsQuery = graphql<
   any,
   FindListingsQuery,
   FindListingsQueryVariables,
   WithFindListingsQueryType
>(FIND_LISTINGS_QUERY, {
   props: ({ data }) => {
      let listings: any = [];
      if (data && !data.loading && data.findListings) {
         listings = data.findListings;
      }
      return {
         listings,
         loading: data ? data.loading : false
      };
   }
});
