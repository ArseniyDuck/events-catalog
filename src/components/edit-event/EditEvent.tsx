import ModalBody from 'components/modal-body/ModalBody';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { withField } from 'high-order-components';
import React from 'react';
import { requiredFields } from 'tools/functions';
import s from './EditEvent.module.scss';

type PropsType = {
   isOpened: boolean
   close: () => void
   innerRef: React.RefObject<HTMLDivElement>
}

type FormValues = EventEdit

const EditEvent: React.FC<PropsType> = (props) => {
   const initialValues: FormValues = {
      name: '',
      description: '',
      time: '',
      peopleRequired: '',
      peopleJoined: '',
      price: '',
      place: '',
      categories: [],
   }

   const handleSubmit = (
      formData: FormValues,
      { setSubmitting, resetForm }: FormikHelpers<FormValues>
   ) => {
      // props.createEvent(formData)
      resetForm()
      setSubmitting(false)
      props.close()
   }

   const validate = (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};

      errors = requiredFields<Omit<FormValues, 'categories'>>(
         values,
         'name', 'description', 'place',
         'peopleRequired', 'peopleJoined',
         'time',
      )

      if (values.categories.length === 0) {
         errors.categories = 'This field is required!'
      }

      return errors;
   }

   return (
      <ModalBody
         width={500}
         title='Edit event'
         isOpened={props.isOpened}
         close={props.close}
         innerRef={props.innerRef}
      >
         <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validate}
         >
            {({ errors, touched }) => (
            <Form autoComplete='off' className={s.form}>
               
            </Form>
            )}
         </Formik>
      </ModalBody>
   );
};

const EditField = withField<Omit<FormValues, 'categories'>>()

export default EditEvent;