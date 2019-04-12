import * as React from "react";

interface Props {
   children: (data: {
      submit: (values: any) => Promise<void>;
   }) => JSX.Element | null;
}
export class RegisterController extends React.Component<Props> {
   submit = async (values: any) => {
      console.log(values);
   };
   render() {
      return this.props.children({ submit: this.submit });
   }
}
