import React, { Component } from "react";
import { Form, Icon, Input } from "antd";
import { Formik, FormikErrors } from "formik";

const btnStyle = {
   background: "#1890ff",
   color: "#fff",
   padding: "2px 4px",
   lineHeight: "1",
   width: "100px",
   borderRadius: "2px"
};
export interface FormValues {
   email: string;
   password: string;
   firstName: string;
   lastName: string;
}
interface Props {
   submit: (values: FormValues) => Promise<FormikErrors<FormValues> | null>;
}
export class RegisterView extends Component<Props> {
   render() {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 500 }}>
               <Formik
                  initialValues={{
                     email: "",
                     firstName: "",
                     lastName: "",
                     password: ""
                  }}
                  onSubmit={async (values, actions) => {
                     await this.props.submit(values);
                  }}
               >
                  {({ values, handleSubmit, handleChange }) => (
                     <Form className="login-form" onSubmit={handleSubmit}>
                        <Form.Item>
                           <Input
                              prefix={
                                 <Icon
                                    type="user"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                 />
                              }
                              name="email"
                              placeholder="Email"
                              onChange={handleChange}
                              value={values.email}
                           />
                        </Form.Item>
                        <Form.Item>
                           <Input
                              prefix={
                                 <Icon
                                    type="lock"
                                    style={{ color: "rgba(0,0,0,.25)" }}
                                 />
                              }
                              type="password"
                              placeholder="Password"
                              name="password"
                              onChange={handleChange}
                              value={values.password}
                           />
                        </Form.Item>
                        <Form.Item>
                           <a className="login-form-forgot" href="">
                              Forgot password
                           </a>
                           <br />
                           <button type="submit" style={btnStyle}>
                              Register
                           </button>
                           <br />
                           Or <a href="">Login now!</a>
                        </Form.Item>
                     </Form>
                  )}
               </Formik>
            </div>
         </div>
      );
   }
}
