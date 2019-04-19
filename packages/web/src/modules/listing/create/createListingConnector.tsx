import React, { Component } from "react";
import { Form, Button } from "antd";
import { Formik, FormikActions } from "formik";

import { Page2 } from "./ui/Page2";
import { Page1 } from "./ui/Page1";
import { Page3 } from "./ui/Page3";
import {
   withCreateListingMutation,
   NewPropsCreateListing,
   CreateListingMutationVariables
} from "@abb/controller/dist";
// import { ImageFile } from "react-dropzone";

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
   pictureURL?: string;
   file?: File | null;
}
interface Props {
   // submit: ({
   //    data
   // }: {
   //    data: FormValues;
   // }) => Promise<{ [key: string]: string } | null>;
   onFinish: () => void;
}
interface State {
   page: number;
}
const Pages = [<Page1 />, <Page2 />, <Page3 />];
class C extends Component<Props & NewPropsCreateListing, State> {
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
                     amenities: [],
                     file: null
                  }}
                  onSubmit={async (
                     values: FormValues,
                     { setSubmitting }: FormikActions<FormValues>
                  ) => {
                     const file = values.file;
                     delete values.file;
                     const data = {
                        data: values,
                        file
                     } as CreateListingMutationVariables;

                     await this.props.createListing(data);
                     setSubmitting(false);
                  }}
               >
                  {({ values, handleSubmit, isSubmitting }) => (
                     <Form className="login-form" onSubmit={handleSubmit}>
                        {Pages[this.state.page]}

                        {this.state.page === Pages.length - 1 ? (
                           <Form.Item>
                              <Button
                                 type="primary"
                                 htmlType="submit"
                                 disabled={isSubmitting}
                              >
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

export const CreateListingConnector = withCreateListingMutation(C);
