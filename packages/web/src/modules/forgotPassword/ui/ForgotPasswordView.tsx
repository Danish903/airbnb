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
   email: string;
}
interface Props {
   submit: (values: FormValues) => Promise<any | null>;
   onFinish: () => void;
}
export class ForgotPasswordView extends Component<Props> {
   render() {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 500 }}>
               <Formik
                  validateOnChange={false}
                  validateOnBlur={false}
                  initialValues={{
                     email: ""
                  }}
                  onSubmit={async (values, actions) => {
                     const res = await this.props.submit(values);
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
                                 type="user"
                                 style={{ color: "rgba(0,0,0,.25)" }}
                              />
                           }
                           name="email"
                           placeholder="Email"
                           component={InputField}
                        />

                        <Form.Item>
                           <button type="submit" style={btnStyle}>
                              Reset Password
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
