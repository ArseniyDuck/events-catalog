import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useQueryParams } from 'hooks';
import s from './Header.module.scss';
import { Container } from 'components/common';
import { Search } from 'icons';


type PropsType = {
   setSearch: (search: string) => void
}

type FormValues = { term: string }

const Header: React.FC<PropsType> = (props) => {
   const { getParam, updateParams } = useQueryParams()
   const [term, setTerm] = useState(getParam('search'))
   
   const initialValues: FormValues = {
      term: getParam('search')
   }

   const handleSubmit = (formData: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setSubmitting(false)
      setTerm(formData.term)
      updateParams({ search: formData.term })
   }

   useEffect(() => {
      props.setSearch(term)
   }, [term]);

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
                     name='term'
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