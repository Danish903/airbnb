import React, { useState } from "react";
import { FieldProps } from "formik";
import Dropzone from "react-dropzone";
export const DropZoneField = ({
   field: { name }, // { name, value, onChange, onBlur }
   form: { setFieldValue }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.

   ...props
}: FieldProps) => {
   const [preview, setPreview] = useState("");
   return (
      <Dropzone
         multiple={false}
         accept="image/*"
         onDrop={([file]) => {
            const preview = URL.createObjectURL(file);
            setPreview(preview);
            setFieldValue(name, file);
         }}
         {...props}
      >
         {({ getRootProps, getInputProps }) => (
            <section>
               <div {...getRootProps()}>
                  <input {...getInputProps()} />
                  <p>Drag 'n' drop some files here, or click to select files</p>
               </div>
               {!!preview && <img src={preview} alt="/" width="200px" />}
            </section>
         )}
      </Dropzone>
   );
};
