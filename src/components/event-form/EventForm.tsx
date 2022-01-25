import React from 'react';
import { Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import { requiredFields } from 'tools/functions';
import s from './EventForm.module.scss';
import ModalBody from 'components/modal-body/ModalBody';
import { withField } from 'high-order-components';
import FullwidthButton from 'components/common/fullwidth-button/FullwidthButton';
import SelectCategories from 'components/common/select-categories/SelectCategories';
import { useModal } from 'hooks';

type CreateProps = {
   mode: 'create'
   onSubmit: (body: EventCreation) => void
   initialValues?: never
}

type EditProps = {
   mode: 'edit'
   onSubmit: (body: EventEdit) => void
   initialValues?: EventEdit
}

type PropsType = (CreateProps | EditProps) & {
   isOpened: boolean
   close: () => void
   innerRef: React.RefObject<HTMLDivElement>
}

type FormValues = EventEdit

const EventForm: React.FC<PropsType> = (props) => {

   const [
      areCategoriesOpened,
      setAreCategoriesOpened,
      categoriesRef
   ] = useModal<HTMLDivElement>();

   const initialValues: EventEdit = props.initialValues || {
      name: '',
      description: '',
      time: '',
      peopleRequired: '',
      peopleJoined: '0',
      price: '',
      place: '',
      categories: [],
   };

   const handleSubmit = (
      formData: EventEdit,
      { setSubmitting, resetForm }: FormikHelpers<FormValues>
   ) => {
      props.onSubmit(formData)
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
         title={props.mode === 'create' ? 'Create event' : 'Edit event'}
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
               <CreationField
                  name='name'
                  displayName='Event title'
                  error={errors.name}
                  touched={touched.name}
               />
               <CreationField
                  as='textarea'
                  name='description'
                  displayName='Description'
                  error={errors.description}
                  touched={touched.description}
               />
               <CreationField
                  name='price'
                  type='number'
                  displayName='Price in $'
                  placeholder='Price in $ (blank means free)'
                  error={errors.price}
                  touched={touched.price}
               />
               <CreationField.Row>
                  {props.mode === 'edit' && (
                     <CreationField
                        name='peopleJoined'
                        displayName='People joined for event'
                        error={errors.peopleJoined}
                        touched={touched.peopleJoined}
                     />
                  )}
                  <CreationField
                     name='peopleRequired'
                     displayName='Required number of people'
                     error={errors.peopleRequired}
                     touched={touched.peopleRequired}
                  />
               </CreationField.Row>
               <CreationField
                  name='time'
                  displayName='time'
                  type='datetime-local'
                  error={errors.time}
                  touched={touched.time}
               />
               <CreationField
                  name='place'
                  displayName='Venue of the event'
                  error={errors.place}
                  touched={touched.place}
               />
               <div className={s.selectionRow}>
                  <SelectCategories
                     as='modal'
                     isOpened={areCategoriesOpened}
                     setIsOpened={setAreCategoriesOpened}
                     modalRef={categoriesRef}
                     styles={{
                        border: '1px solid var(--grey)',
                        maxWidth: 'calc(100% - 21px)',
                     }}
                  />
               </div>
               <FullwidthButton
                  text={props.mode === 'create'
                     ? 'Create'
                     : 'Update'
                  }
                  type='submit'
               />
            </Form>
            )}
         </Formik>
      </ModalBody>
   );
}

const CreationField = withField<Omit<FormValues, 'categories'>>()

export default EventForm;