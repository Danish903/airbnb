import * as React from "react";
import { Field } from "formik";
import { InputField } from "../../../shared/InputField";
import { TagField } from "../../../shared/TagField";

export const Page3 = () => (
   <>
      <Field
         label="Latitude"
         name="latitude"
         placeholder="latitude"
         component={InputField}
         useNumberComponent={true}
      />

      <Field
         label="Longitude"
         name="longitude"
         placeholder="longitude"
         component={InputField}
         useNumberComponent={true}
      />

      <Field name="amenities" placeholder="Amenities" component={TagField} />
   </>
);
