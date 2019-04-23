import React from "react";
import { RouteComponentProps } from "react-router";
import { ViewMessagesQueryComponent } from "@abb/controller/dist";
import { InputBar } from "./InputBar";

export default class MessageConnector extends React.Component<
   RouteComponentProps<{
      listingId: string;
   }>
> {
   unsubscribe!: () => void;
   render() {
      const {
         match: {
            params: { listingId }
         }
      } = this.props;
      return (
         <ViewMessagesQueryComponent listingId={listingId}>
            {({ messages, loading, subscribe }) => {
               if (loading) return <p>loading...</p>;
               if (!this.unsubscribe) {
                  this.unsubscribe = subscribe();
               }
               return (
                  <div>
                     <p>hello</p>
                     {messages.map(message => (
                        <div key={message.id}>
                           <p key={message.id}>{message.text}</p>
                           <p>sent by: {message.sender.email}</p>
                        </div>
                     ))}
                     <InputBar listingId={listingId} />
                  </div>
               );
            }}
         </ViewMessagesQueryComponent>
      );
   }
}
