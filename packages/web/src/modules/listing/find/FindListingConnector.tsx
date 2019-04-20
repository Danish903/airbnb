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

      return (
         <>
            {listings.map(listing => (
               <Card
                  key={listing.id}
                  hoverable
                  style={{ width: 240 }}
                  cover={
                     <img
                        alt="example"
                        src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png"
                     />
                  }
               >
                  <Meta
                     title={listing.name}
                     description={listing.description}
                  />
               </Card>
            ))}
         </>
      );
   }
}

export const FindListingConnector = withFindListingsQuery(F);
