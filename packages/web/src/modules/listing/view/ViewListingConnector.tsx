import React, { Component } from "react";
import {
   WithGetListingsQueryType,
   ViewListingQueryComponent
} from "@abb/controller/dist";
import { RouteComponentProps } from "react-router";

export class ViewListingConnector extends Component<
   RouteComponentProps<{
      listingId: string;
   }>
> {
   render() {
      const {
         match: {
            params: { listingId }
         }
      } = this.props;

      return (
         <ViewListingQueryComponent listingId={listingId}>
            {data => {
               if (data.loading) return <p>loading....</p>;
               if (!data.listing) return <p>listing not found</p>;
               return <p>{data.listing.name}</p>;
            }}
         </ViewListingQueryComponent>
      );
   }
}
