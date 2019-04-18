import React from "react";
import { FieldProps } from "formik";
import { Form, Input, InputNumber, Select } from "antd";

export const TagField = ({
   field: { onChange, onBlur: _, ...field }, // { name, value, onChange, onBlur }
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
         <Select
            {...field}
            {...props}
            mode="tags"
            style={{ width: "100%" }}
            // defaultValue={["a10", "c12"]}
            onChange={(newValue: any) => setFieldValue(field.name, newValue)}
         />
      </Form.Item>
   );
};
