import React, { Component } from "react";
import { Form, Icon, Input } from "antd";
import { Formik, Field } from "formik";
import * as yup from "yup";
import { InputField } from "../../shared/InputField";

const validationSchema = yup.object().shape({
   email: yup
      .string()
      .min(3, "Email is not long enough")
      .max(255)
      .email("Email must be a valid email")
      .required("Email is required"),
   password: yup
      .string()
      .required("Password is required.")
      .min(6, "X Password strength: weak."),
   firstName: yup.string().required("First Name is required"),
   lastName: yup.string().required("Last Name is required")
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
   firstName: string;
   lastName: string;
}
interface Props {
   submit: ({ data }: { data: FormValues }) => Promise<void>;
}
export class RegisterView extends Component<Props> {
   render() {
      return (
         <div style={{ display: "flex", justifyContent: "center" }}>
            <div style={{ width: 500 }}>
               <Formik
                  validateOnChange={true}
                  validateOnBlur={true}
                  initialValues={{
                     email: "",
                     firstName: "",
                     lastName: "",
                     password: ""
                  }}
                  validationSchema={validationSchema}
                  onSubmit={async (values, actions) => {
                     const data = values;
                     await this.props.submit({ data });
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
                                 type="user"
                                 style={{ color: "rgba(0,0,0,.25)" }}
                              />
                           }
                           name="firstName"
                           placeholder="First Name"
                           component={InputField}
                        />
                        <Field
                           prefix={
                              <Icon
                                 type="user"
                                 style={{ color: "rgba(0,0,0,.25)" }}
                              />
                           }
                           name="lastName"
                           placeholder="Last Name"
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
