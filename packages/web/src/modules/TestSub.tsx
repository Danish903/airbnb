import React, { PureComponent } from "react";
import { Subscription } from "react-apollo";
import gql from "graphql-tag";

const NEW_MESSAGE_SUBSCRIPTION = gql`
   subscription {
      newMessage(listingId: "7af0caa4-923a-49cc-b5cc-ba0379ba997a") {
         id
         text
         sender {
            id
            email
         }
      }
   }
`;
export default class TestSub extends PureComponent {
   render() {
      return (
         <>
            // @ts-ignore
            <Subscription
               subscription={NEW_MESSAGE_SUBSCRIPTION}
               // @ts-ignore
               children={({ data }) => {
                  if (!data) {
                     return <div>Loading</div>;
                  }
                  console.log(data);
                  return <div>{data.newMessage.text}</div>;
               }}
            />
         </>
      );
   }
}
