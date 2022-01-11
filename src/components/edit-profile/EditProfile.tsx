import React, { useRef } from 'react';
import { updateProfile } from 'redux/auth-reducer';
import { useAppDispatch, useAppSelector } from 'hooks';
import { Field, Form, Formik, FormikErrors, FormikHelpers } from 'formik';
import s from './EditProfile.module.scss';
import ModalBody from 'components/modal-body/ModalBody';
import { requiredFields } from 'tools/functions';
import { withField } from 'high-order-components';
import FullwidthButton from 'components/common/fullwidth-button/FullwidthButton';


type PropType = {
   isOpened: boolean
   close: () => void
   innerRef: React.RefObject<HTMLDivElement>
}

type FormValues = {
   firstName: string
   lastName: string
   phoneNumber: string
}

const EditProfile: React.FC<PropType> = ({ isOpened, innerRef, ...props }) => {
   const user = useAppSelector(state => state.auth.user)
   const { fullname, phone_number } = user

   const dispatch = useAppDispatch();

   const initialValues: FormValues = {
      firstName: fullname.split(' ')[0],
      lastName: fullname.split(' ')[1],
      phoneNumber: phone_number,
   }

   const handleSubmit = (
      formData: FormValues,
      { setSubmitting }: FormikHelpers<FormValues>
   ) => {
      setSubmitting(false)
      dispatch(updateProfile({
         first_name: formData.firstName,
         last_name: formData.lastName,
         phone_number: formData.phoneNumber,
      }))
      props.close()
   }

   const validate = (values: FormValues) => {
      let errors: FormikErrors<FormValues> = {};

      errors = requiredFields<FormValues>(
         values,
         'firstName', 'lastName', 'phoneNumber'
      )

      if (!values.phoneNumber.match(/^\+?1?\d{11}$/gi)) {
         errors.phoneNumber = 'Phone number must start with "+" and contain 9 digits!';
      }

      return errors;
   }

   const handleClose = () => {
      props.close()
   }

   return (
      <ModalBody
         title='Edit profile'
         width={450}
         isOpened={isOpened}
         close={handleClose}
         innerRef={innerRef}
      >
         <Formik
            initialValues={initialValues}
            onSubmit={handleSubmit}
            validate={validate}
         >
            {({ errors, touched }) => (
            <Form autoComplete='off' className={s.form}>
               <EditField.Row>
                  <EditField
                     name='firstName'
                     displayName='First name'
                     error={errors.firstName}
                     touched={touched.firstName}
                  />
                  <EditField
                     name='lastName'
                     displayName='Last name'
                     error={errors.lastName}
                     touched={touched.lastName}
                  />
               </EditField.Row>
               <EditField.Row>
                  <EditField
                     name='phoneNumber'
                     displayName='Phone number'
                     error={errors.phoneNumber}
                     touched={touched.phoneNumber}
                  />
               </EditField.Row>
               <FullwidthButton text='Save changes' type='submit' />
            </Form>
            )}
         </Formik>
      </ModalBody>
   );
}

const EditField = withField<FormValues>()

export default EditProfile;