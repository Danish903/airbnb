import * as React from "react";
import { Mutation } from "react-apollo";
import { LOGOUT_MUTATION } from "../../graphql/user/mutations/logout";
import { LogoutMutation } from "../../generated/apolloComponents";
interface Props {
   children: (data: { logout: () => Promise<void> }) => JSX.Element | null;
}

export const LogoutController: React.SFC<Props> = ({ children }) => (
   <Mutation<LogoutMutation, {}> mutation={LOGOUT_MUTATION}>
      {(mutate, { client }) =>
         children({
            logout: async () => {
               await mutate();
               await client.resetStore();
            }
         })
      }
   </Mutation>
);
