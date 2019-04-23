// @ts-ignore
import * as React from "react";

import { FindMessagesQueryComponent } from "../../generated/apolloComponents";

import { FIND_MESSAGES_QUERY } from "../../graphql/message/queries/findMessages";

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
}

interface Props {
   listingId: string;
   children: (data: WithFindMessageQueryType) => JSX.Element | null;
}
export class ViewMessagesQueryComponent extends React.Component<Props> {
   render() {
      const { children, listingId } = this.props;
      return (
         <FindMessagesQueryComponent
            query={FIND_MESSAGES_QUERY}
            variables={{ listingId }}
         >
            {({ data, loading }) => {
               let messages: messageType[] = [];
               if (data && data.findMessages) {
                  messages = data.findMessages;
               }
               return children({
                  messages,
                  loading
               });
            }}
         </FindMessagesQueryComponent>
      );
   }
}
