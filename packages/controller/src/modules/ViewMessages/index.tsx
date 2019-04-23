// @ts-ignore
import * as React from "react";
import { gql } from "apollo-boost";
import { FindMessagesQueryComponent } from "../../generated/apolloComponents";

// import { FIND_MESSAGES_QUERY } from "../../graphql/message/queries/findMessages";

export const NEW_MESSAGE_SUBSCRIPTION = gql`
   subscription($listingId: ID!) {
      newMessage(listingId: $listingId) {
         id
         text
         listingId
         sender {
            id
            email
         }
      }
   }
`;
interface owner {
   id: string;
   email: string;
}
interface messageType {
   id: string;
   listingId: string;
   text: string;
   sender: owner;
}
export interface WithFindMessageQueryType {
   messages: messageType[];
   loading: boolean;
   subscribe: () => () => void;
}

interface Props {
   listingId: string;
   children: (data: WithFindMessageQueryType) => JSX.Element | null;
}
export class ViewMessagesQueryComponent extends React.Component<Props> {
   render() {
      const { children, listingId } = this.props;
      return (
         <FindMessagesQueryComponent variables={{ listingId }}>
            {({ data, loading, subscribeToMore }) => {
               let messages: messageType[] = [];
               if (data && data.findMessages) {
                  messages = data.findMessages;
               }
               return children({
                  messages,
                  loading,
                  subscribe: () =>
                     subscribeToMore({
                        document: NEW_MESSAGE_SUBSCRIPTION,
                        variables: { listingId },
                        updateQuery: (prev, { subscriptionData }) => {
                           if (!subscriptionData.data) return prev;
                           const { newMessage } = subscriptionData.data as any;
                           return {
                              ...prev,
                              findMessages: [...prev.findMessages, newMessage]
                           };
                        }
                     })
               });
            }}
         </FindMessagesQueryComponent>
      );
   }
}
