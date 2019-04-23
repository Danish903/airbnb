import React from "react";
import { RouteComponentProps } from "react-router";
import { ViewMessagesQueryComponent } from "@abb/controller/dist";

export default class MessageConnector extends React.Component<
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
         <ViewMessagesQueryComponent listingId={listingId}>
            {({ messages, loading }) => {
               if (loading) return <p>loading...</p>;
               console.log(messages);
               return (
                  <div>
                     <p>hello</p>
                     {messages.map(message => (
                        <div key={message.id}>
                           <p key={message.id}>{message.text}</p>
                           <p>sent by: {message.sender.email}</p>
                        </div>
                     ))}
                  </div>
               );
            }}
         </ViewMessagesQueryComponent>
      );
   }
}
