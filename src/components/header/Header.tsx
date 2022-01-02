import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useQueryParams } from 'hooks';
import s from './Header.module.scss';
import { Container } from 'components/common';
import { Cross, Search } from 'icons';


type PropsType = {
   setSearch: (search: string) => void
}

type FormValues = { term: string }

const Header: React.FC<PropsType> = (props) => {
   const { getParam, updateParams } = useQueryParams<Pick<CalalogEventFilters, 'search'>>()
   const [searchTerm, setSearchTerm] = useState(getParam('search'))

   const formik = useFormik<FormValues>({
      initialValues: {
         term: getParam('search')
      },
      onSubmit: (formData, { setSubmitting }) => {
         setSubmitting(false)
         setSearchTerm(formData.term)
         updateParams({ search: formData.term })
      }
   });

   const handleReset = () => {
      formik.setFieldValue('term', '')
      setSearchTerm('')
      updateParams({ search: '' })
   }

   useEffect(() => {
      props.setSearch(searchTerm)
   }, [searchTerm]);

   return (
      <header className={s.header}>
         <Container className={s.container}>
            <form className={s.search} onSubmit={formik.handleSubmit}>
               <button type='submit' disabled={formik.isSubmitting}>
                  <Search size={25} color='var(--light-grey)' />
               </button>
               <input
                  autoComplete='off'
                  type='text'
                  name='term'
                  className={s.searchInput}
                  placeholder='Search by title'
                  onChange={formik.handleChange}
                  value={formik.values.term}
               />
               {formik.values.term && (
                  <button onClick={handleReset} type='reset'>
                     <Cross isHover />
                  </button>
               )}
            </form>
            <button className={s.create}>Create</button>
            <div className={`${s.avatar} ibg`}></div>
         </Container>
      </header>
   );
}

export default Header;