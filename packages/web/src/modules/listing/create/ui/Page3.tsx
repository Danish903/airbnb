import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";

export const Page3 = () => (
   <>
      <Field name="latitude" placeholder="latitude" component={InputField} />
      <Field name="longitude" placeholder="longitude" component={InputField} />
      <Field name="amenities" placeholder="Amenities" component={InputField} />
   </>
);
