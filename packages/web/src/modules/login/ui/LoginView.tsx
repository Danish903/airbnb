import React, { Component } from "react";
import { Form, Icon } from "antd";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { Link } from "react-router-dom";
import { InputField } from "../../shared/InputField";

const validationSchema = yup.object().shape({
   email: yup
      .string()
      .max(255)
      .email("Email must be a valid email")
      .required("Email is required"),
   password: yup
      .string()
      .required("Password is required.")
      .min(6, "X Password strength: weak.")
});

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
}
interface Props {
   submit: (values: FormValues) => Promise<any | null>;
}
export class LoginView extends Component<Props> {
   render() {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 500 }}>
               <Formik
                  validateOnChange={false}
                  validateOnBlur={false}
                  initialValues={{
                     email: "",
                     password: ""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, actions) => {
                     const res = await this.props.submit(values);
                     if (res) {
                        actions.setErrors(res);
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
                        />

                        <Form.Item>
                           <a className="login-form-forgot" href="">
                              Forgot password
                           </a>
                           <br />
                           <button type="submit" style={btnStyle}>
                              Login
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
