import * as React from "react";
import { RouteProps, Route, RouteComponentProps, Redirect } from "react-router";
import { graphql, ChildProps } from "react-apollo";
import { MeQuery } from "../../generated/apolloComponents";
import { ME_QUERY } from "../../graphql/user/queries/meQuery";

type Props = RouteProps;

class C extends React.Component<ChildProps<Props, MeQuery>> {
   renderRoute = (routeProps: RouteComponentProps<{}>) => {
      const { data, component } = this.props;
      if (!data || data.loading) {
         // loading-screen
         return null;
      }
      if (!data.me) {
         // user not logged in
         return <Redirect to="/login" />;
      }
      const Component = component as any;
      return <Component {...routeProps} />;
   };
   render() {
      const { data: _, component: __, ...rest } = this.props;
      return <Route {...rest} render={this.renderRoute} />;
   }
}

export const AuthRoute = graphql<Props, MeQuery>(ME_QUERY)(C);
