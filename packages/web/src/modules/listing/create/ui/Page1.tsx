import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";
import { DropZoneField } from "../../../shared/DropzoneField";

export const Page1 = () => (
   <>
      <Field name="name" placeholder="Name" component={InputField} />
      <Field name="category" placeholder="Category" component={InputField} />
      <Field
         name="description"
         placeholder="Description"
         component={InputField}
      />
      <Field name="file" placeholder="file" component={DropZoneField} />
   </>
);
