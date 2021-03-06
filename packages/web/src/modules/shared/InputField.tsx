import React from "react";
import { FieldProps } from "formik";
import { Form, Input, InputNumber } from "antd";

export const InputField = ({
   field: { onChange, ...field }, // { name, value, onChange, onBlur }
   form: { touched, errors, setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
   label,
   useNumberComponent = false,
   ...props
}: FieldProps & { label: string; useNumberComponent: Boolean }) => {
   const isError = touched[field.name] && errors[field.name];
   const Comp = useNumberComponent ? InputNumber : Input;
   return (
      <Form.Item
         label={label}
         help={isError ? errors[field.name] : ""}
         validateStatus={isError ? "error" : ""}
      >
         <Comp
            {...field}
            {...props}
            onChange={
               useNumberComponent
                  ? (newValue: any) => setFieldValue(field.name, newValue)
                  : onChange
            }
         />
      </Form.Item>
   );
};
