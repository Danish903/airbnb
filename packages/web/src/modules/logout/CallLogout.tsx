import React from "react";

interface Props {
   logout: () => Promise<void>;
   onFinish: () => void;
}
export default class CallLogout extends React.Component<Props> {
   async componentDidMount() {
      await this.props.logout();
      this.props.onFinish();
   }
   render() {
      return null;
   }
}
