import React, { Component } from "react";
import { Formik, Field, Form } from "formik";
import { CreateMessageController } from "@abb/controller/dist";
import { InputField } from "../../shared/InputField";

interface FormValues {
   text: string;
}
interface Props {
   listingId: string;
}
export class InputBar extends Component<Props> {
   render() {
      const { listingId } = this.props;
      return (
         <CreateMessageController>
            {({ createMessage }) => (
               <Formik<FormValues>
                  initialValues={{
                     text: ""
                  }}
                  onSubmit={async ({ text }, { resetForm, setSubmitting }) => {
                     await createMessage({
                        variables: {
                           listingId,
                           text
                        }
                     });
                     resetForm();
                     setSubmitting(false);
                  }}
               >
                  {({ handleSubmit, isSubmitting }) => {
                     return (
                        <form onSubmit={handleSubmit}>
                           <Field
                              name="text"
                              placeholder="Text"
                              component={InputField}
                           />
                           <button type="submit" disabled={isSubmitting}>
                              send message
                           </button>
                        </form>
                     );
                  }}
               </Formik>
            )}
         </CreateMessageController>
      );
   }
}
