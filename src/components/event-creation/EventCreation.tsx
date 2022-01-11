import React, { useState } from 'react';
import { Form, Formik, FormikErrors, FormikHelpers, useFormik } from 'formik';
import { conditionClass, requiredFields } from 'tools/functions';
import s from './EventCreation.module.scss';
import ModalBody from 'components/modal-body/ModalBody';
import { withField } from 'high-order-components';
import FullwidthButton from 'components/common/fullwidth-button/FullwidthButton';
import SelectCategories from 'components/common/select-categories/SelectCategories';
import { useModal } from 'hooks';

type PropsType = {
   isOpened: boolean
   close: () => void
   innerRef: React.RefObject<HTMLDivElement>
}

type FormValues = {
   name: string
   description: string
   time: string
   peopleRequired: string
   price: string
   place: string
   categories: number[]
}

const EventCreation: React.FC<PropsType> = (props) => {
   const [
      areCategoriesOpened,
      setAreCategoriesOpened,
      categoriesRef
   ] = useModal<HTMLDivElement>()

   const initialValues: FormValues = {
      name: '',
      description: '',
      time: '',
      peopleRequired: '',
      price: '',
      place: '',
      categories: [],
   }

   const handleSubmit = (
      formData: FormValues,
      { setSubmitting, resetForm }: FormikHelpers<FormValues>
   ) => {
      console.log(formData)
      setSubmitting(false)
      resetForm()
      props.close()
   }

   const validate = (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};

      errors = requiredFields<Omit<FormValues, 'categories'>>(
         values,
         'name', 'peopleRequired', 'place', 'time',
      )

      if (values.categories.length === 0) {
         errors.categories = 'Thisdojansf'
      }

      return errors;
   }

   return (
      <ModalBody
         title='Create event'
         width={550}
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
               <CreationField.Row>
                  <CreationField
                     name='name'
                     displayName='Event title'
                     error={errors.name}
                     touched={touched.name}
                  />
               </CreationField.Row>
               <CreationField.Row>
                  <CreationField
                     as='textarea'
                     name='description'
                     displayName='Description'
                     error={errors.description}
                     touched={touched.description}
                  />
               </CreationField.Row>
               <CreationField.Row>
                  <CreationField
                     name='price'
                     type='number'
                     displayName='Price in $'
                     placeholder='Price in $ (blank means free)'
                     error={errors.price}
                     touched={touched.price}
                  />
                  <CreationField
                     name='peopleRequired'
                     displayName='Required number of people'
                     error={errors.peopleRequired}
                     touched={touched.peopleRequired}
                  />
               </CreationField.Row>
               <CreationField.Row>
                  <CreationField
                     name='time'
                     displayName='time'
                     type='datetime-local'
                     error={errors.time}
                     touched={touched.time}
                  />
               </CreationField.Row>
               <CreationField.Row>
                  <CreationField
                     name='place'
                     displayName='Venue of the event'
                     error={errors.place}
                     touched={touched.place}
                  />
               </CreationField.Row>
               <CreationField.Row>
                  <SelectCategories
                     as='modal'
                     isOpened={areCategoriesOpened}
                     setIsOpened={setAreCategoriesOpened}
                     modalRef={categoriesRef}
                     styles={{
                        border: '1px solid var(--grey)'
                     }}
                  />
               </CreationField.Row>
               <FullwidthButton text='Create' type='submit' />
            </Form>
            )}
         </Formik>
      </ModalBody>
   );
}

const CreationField = withField<Omit<FormValues, 'categories'>>()

export default EventCreation;