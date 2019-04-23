import React, { Component } from "react";
import {
   withFindListingsQuery,
   WithFindListingsQueryType
} from "@abb/controller/dist";
import { Card } from "antd";
import { Link } from "react-router-dom";
const { Meta } = Card;

export class F extends Component<WithFindListingsQueryType> {
   render() {
      const { listings, loading } = this.props;
      if (loading) return <div>Loading...</div>;
      return (
         <>
            {listings.map(listing => (
               <Link key={listing.id} to={`/listing/${listing.id}`}>
                  <Card
                     hoverable
                     style={{ width: 240 }}
                     cover={<img alt="example" src={listing.imageURL} />}
                  >
                     <Meta
                        title={listing.name}
                        description={listing.owner.email}
                     />
                  </Card>
               </Link>
            ))}
         </>
      );
   }
}

export const FindListingConnector = withFindListingsQuery(F);
