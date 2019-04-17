import React, { Component } from "react";
import { Form, Icon } from "antd";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { InputField } from "../../shared/InputField";

const btnStyle = {
   background: "#1890ff",
   color: "#fff",
   padding: "2px 4px",
   lineHeight: "1",
   width: "100px",
   borderRadius: "2px"
};
export interface FormValues {
   password: string;
}
export interface data {
   token: string;
   password: string;
}
interface Props {
   submit: ({ data }: { data: data }) => Promise<any | null>;
   token: string;
   onFinish: () => void;
}
export class ChangePasswordView extends Component<Props> {
   render() {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 500 }}>
               <Formik
                  validateOnChange={false}
                  validateOnBlur={false}
                  initialValues={{
                     password: ""
                  }}
                  onSubmit={async (values, actions) => {
                     const data = {
                        ...values,
                        token: this.props.token
                     };
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
                        <Field
                           prefix={
                              <Icon
                                 type="lock"
                                 style={{ color: "rgba(0,0,0,.25)" }}
                              />
                           }
                           type="password"
                           placeholder="Password"
                           name="password"
                           component={InputField}
                        />{" "}
                        <Form.Item>
                           <button type="submit" style={btnStyle}>
                              Change Password
                           </button>
                           <br />
                           Or <Link to="/register">Register!</Link>
                        </Form.Item>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      );
   }
}
