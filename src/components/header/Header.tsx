import React from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import s from './Header.module.scss';
import { Container } from 'components/common';
import { Search } from 'icons';


type FormValues = { term: string }

const Header: React.FC = () => {
   const initialValues: FormValues = { term: '' }
   
   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      console.log(formData.term);
      setSubmitting(false);
      resetForm({});
   }

   return (
      <header className={s.header}>
         <Container className={s.container}>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
               {() => (
               <Form className={s.search}>
                  <button type='submit'>
                     <Search size={25} color='var(--light-grey)' />
                  </button>
                  <Field 
                     autoComplete='off'
                     type='text'
                     name='temp'
                     id='temp'
                     className={s.searchInput}
                     placeholder='Search'
                  />
               </Form>
               )}
            </Formik>
            <button className={s.create}>Create</button>
            <div className={`${s.avatar} ibg`}></div>
         </Container>
      </header>
   );
}

export default Header;