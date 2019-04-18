import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";

export const Page2 = () => (
   <>
      <Field name="price" placeholder="Price" component={InputField} />
      <Field name="beds" placeholder="beds" component={InputField} />
      <Field name="guests" placeholder="guests" component={InputField} />
   </>
);
