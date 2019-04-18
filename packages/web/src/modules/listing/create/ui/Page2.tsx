import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";
import { Form } from "antd";

export const Page2 = () => (
   <>
      <Field
         label="Price"
         name="price"
         placeholder="Price"
         component={InputField}
         useNumberComponent={true}
      />

      <Field
         label="Beds"
         name="beds"
         placeholder="beds"
         component={InputField}
         useNumberComponent
      />

      <Field
         label="Guests"
         name="guests"
         placeholder="guests"
         component={InputField}
         useNumberComponent={true}
      />
   </>
);
