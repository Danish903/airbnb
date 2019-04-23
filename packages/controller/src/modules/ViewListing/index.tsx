// @ts-ignore
import * as React from "react";
import { Query } from "react-apollo";
import {
   GetListingQuery,
   GetListingQueryVariables
} from "../../generated/apolloComponents";
import { GET_LISTING_QUERY } from "../../graphql/listing/queries/getListing";

export interface owner {
   id: string;
   email: string;
}
export interface ListingType {
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
export interface WithGetListingsQueryType {
   listing: ListingType | null;
   loading: boolean;
}
// export const WithGetListingQuery = graphql<
//    any,
//    GetListingQuery,
//    GetListingQueryVariables,
//    WithGetListingsQueryType
// >(GET_LISTING_QUERY, {
//    props: ({ data }) => {
//       let listing: ListingType | null = null;
//       if (data && !data.loading && data.getListing) {
//          listing = data.getListing;
//       }
//       return {
//          listing,
//          loading: data ? data.loading : false
//       };
//    },
//    options: props => ({ variables: { listingId: props.listingId } })
// });

interface Props {
   listingId: string;
   children: (data: WithGetListingsQueryType) => JSX.Element | null;
}
export class ViewListingQueryComponent extends React.Component<Props> {
   render() {
      const { children, listingId } = this.props;
      return (
         <Query<GetListingQuery, GetListingQueryVariables>
            query={GET_LISTING_QUERY}
            variables={{ listingId }}
         >
            {({ data, loading }) => {
               let listing: ListingType | null = null;
               if (data && data.getListing) {
                  listing = data.getListing;
               }
               return children({
                  listing,
                  loading
               });
            }}
         </Query>
      );
   }
}
