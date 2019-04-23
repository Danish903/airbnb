import * as React from "react";

import {
   CreateMessageMutationComponent,
   CreateMessageMutationMutation,
   CreateMessageMutationMutationVariables
} from "../../generated/apolloComponents";

import { MutationFn } from "react-apollo";

export interface WithCreateMessageType {
   createMessage: MutationFn<
      CreateMessageMutationMutation,
      CreateMessageMutationMutationVariables
   >;
}

interface Props {
   // listingId: string;
   // text: string;
   children: (data: WithCreateMessageType) => JSX.Element | null;
}
export class CreateMessageController extends React.Component<Props> {
   render() {
      const { children } = this.props;
      return (
         <CreateMessageMutationComponent>
            {createMessage => {
               return children({
                  createMessage
               });
            }}
         </CreateMessageMutationComponent>
      );
   }
}
