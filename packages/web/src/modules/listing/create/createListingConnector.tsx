import React, { Component } from "react";
import { Form, Button } from "antd";
import { Formik } from "formik";

import { Page2 } from "./ui/Page2";
import { Page1 } from "./ui/Page1";
import { Page3 } from "./ui/Page3";

export interface FormValues {
   name: string;
   category: string;
   description: string;
   price: number;
   beds: number;
   guests: number;
   latitude: number;
   longitude: number;
   amenities: String[];
}
interface Props {
   submit: ({
      data
   }: {
      data: FormValues;
   }) => Promise<{ [key: string]: string } | null>;
   onFinish: () => void;
}
interface State {
   page: number;
}
const Pages = [<Page1 />, <Page2 />, <Page3 />];
export class CreateListingConnector extends Component<Props, State> {
   state = {
      page: 0
   };

   nexPage = () => this.setState(prevState => ({ page: prevState.page + 1 }));
   render() {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 500 }}>
               <Formik<FormValues>
                  validateOnChange={true}
                  validateOnBlur={true}
                  initialValues={{
                     name: "",
                     category: "",
                     description: "",
                     price: 0,
                     beds: 0,
                     guests: 0,
                     latitude: 0,
                     longitude: 0,
                     amenities: []
                  }}
                  onSubmit={async (values, actions) => {
                     const data = values;

                     const res = await this.props.submit({ data });
                     console.log(res);
                     if (res) {
                        actions.setErrors(res);
                     } else {
                        this.props.onFinish();
                     }
                  }}
               >
                  {({ handleSubmit }) => (
                     <Form className="login-form" onSubmit={handleSubmit}>
                        {Pages[this.state.page]}

                        {this.state.page === Pages.length - 1 ? (
                           <Form.Item>
                              <Button type="primary" htmlType="submit">
                                 Create a listing
                              </Button>
                           </Form.Item>
                        ) : (
                           <>
                              {/* <Form.Item>
                                 <Button> Prev</Button>
                              </Form.Item> */}
                              <Form.Item>
                                 <Button onClick={this.nexPage}> Next</Button>
                              </Form.Item>
                           </>
                        )}
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      );
   }
}
