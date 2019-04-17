import React, { Component } from "react";
import { RouteComponentProps } from "react-router";

export default class index extends Component<RouteComponentProps<{}>> {
   render() {
      const {
         location: { state }
      } = this.props;

      return (
         <div>
            <h1>{state && state.message ? state.message : "Helllo"} </h1>
         </div>
      );
   }
}
