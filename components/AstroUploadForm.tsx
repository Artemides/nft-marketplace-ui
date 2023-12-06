import { Field, Form, Formik, FormikHelpers } from "formik";
import { MetadataNFT } from "../types/types";

const initialMetadata: MetadataNFT = {
  description: "",
  name: "",
};
const AstroUploadForm = () => {
  const handleSubmit = (
    values: MetadataNFT,
    {}: FormikHelpers<MetadataNFT>
  ) => {};

  return (
    <Formik initialValues={initialMetadata} onSubmit={handleSubmit}>
      <Form>
        <Field type="text" />
      </Form>
    </Formik>
  );
};

export default AstroUploadForm;
