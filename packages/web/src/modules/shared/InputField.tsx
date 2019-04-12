import React from "react";
import { FieldProps } from "formik";
import { Form, Input, Icon } from "antd";

export const InputField = ({
   field, // { name, value, onChange, onBlur }
   form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
   ...props
}: FieldProps) => {
   const isError = touched[field.name] && errors[field.name];
   return (
      <Form.Item
         help={isError ? errors[field.name] : ""}
         validateStatus={isError ? "error" : ""}
      >
         <Input {...field} {...props} />
      </Form.Item>
   );
};
