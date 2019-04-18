//@ts-ignore
import * as React from "react";
import { graphql } from "react-apollo";
import { CREATE_LISTING } from "../../graphql/listing/mutations/create";
import {
   CreateListingMutation,
   CreateListingMutationVariables
} from "../../generated/apolloComponents";

export interface NewPropsCreateListing {
   createListing: (variables: CreateListingMutationVariables) => void;
}
export const withCreateListingMutation = graphql<
   any,
   CreateListingMutation,
   CreateListingMutationVariables,
   NewPropsCreateListing
>(CREATE_LISTING, {
   props: ({ mutate }) => ({
      createListing: async variables => {
         if (!mutate) return;
         const res = await mutate({
            variables
         });
         console.log(res);
      }
   })
});
