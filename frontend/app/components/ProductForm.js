import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';

const ProductForm = ({ onSubmit, initialValues }) => {
  const validationSchema = Yup.object({
    name: Yup.string().required('Product name is required'),
    price: Yup.number()
      .positive('Price must be positive')
      .test(
        'is-decimal',
        'Price must have at most 2 decimal places',
        (value) => /^\d+(\.\d{1,2})?$/.test(value)
      )
      .required('Price is required'),
  });

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
      enableReinitialize // Allows form to update when initialValues change
    >
      {({ isSubmitting }) => (
        <Form className="flex flex-col gap-4 p-4">
          <div>
            <label className="block">Product Name</label>
            <Field
              name="name"
              placeholder="Product name"
              className="border p-2 w-full"
            />
            <ErrorMessage name="name" component="div" className="text-red-500" />
          </div>

          <div>
            <label className="block">Description</label>
            <Field
              name="description"
              placeholder="Product description"
              className="border p-2 w-full"
            />
          </div>

          <div>
            <label className="block">Price</label>
            <Field
              name="price"
              type="number"
              placeholder="Price"
              className="border p-2 w-full"
            />
            <ErrorMessage name="price" component="div" className="text-red-500" />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-500 text-white py-2 px-4 rounded"
          >
            {initialValues.id ? 'Update Product' : 'Add Product'}
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default ProductForm;
