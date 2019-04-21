import React, { Component } from "react";
import {
   withFindListingsQuery,
   WithFindListingsQueryType
} from "@abb/controller/dist";
import { Card } from "antd";
const { Meta } = Card;

export class F extends Component<WithFindListingsQueryType> {
   render() {
      const { listings, loading } = this.props;
      if (loading) return <div>Loading...</div>;
      console.log(listings);
      return (
         <>
            {listings.map(listing => (
               <Card
                  key={listing.id}
                  hoverable
                  style={{ width: 240 }}
                  cover={<img alt="example" src={listing.imageURL} />}
               >
                  <Meta
                     title={listing.name}
                     description={listing.owner.email}
                  />
               </Card>
            ))}
         </>
      );
   }
}

export const FindListingConnector = withFindListingsQuery(F);
