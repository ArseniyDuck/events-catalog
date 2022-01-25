import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import { useAppSelector, useModal, useQueryParams } from 'hooks';
import s from './Header.module.scss';
import { Container } from 'components/common';
import { Cross, Search } from 'icons';
import { RouteLinks } from 'app-routing';
import { Link } from 'react-router-dom';
import { imageUrl } from 'tools/functions';
import EventForm from 'components/event-form/EventForm';


type PropsType = {
   setSearch: (search: string) => void
   openCreation: () => void
}

type FormValues = { term: string }

const Header: React.FC<PropsType> = (props) => {
   const { photo } = useAppSelector(state => state.auth.user)

   const { getParam, updateParams } = useQueryParams<Pick<CalalogEventFilters, 'search'>>()
   const [searchTerm, setSearchTerm] = useState(getParam('search'))

   const formik = useFormik<FormValues>({
      initialValues: {
         term: getParam('search')
      },
      onSubmit: (formData, { setSubmitting }) => {
         setSubmitting(false)
         setSearchTerm(formData.term)
         updateParams({search: formData.term})
      }
   });

   const handleReset = () => {
      formik.setFieldValue('term', '')
      setSearchTerm('')
      updateParams({search: ''})
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
            <button onClick={props.openCreation} className={s.create}>
               Create
            </button>
            <Link to={RouteLinks.PROFILE}>
               <div className={`${s.avatar} ibg`}>
                  {photo && <img src={imageUrl(photo)} alt='avatar' /> }
               </div>
            </Link>
         </Container>
      </header>
   );
}

export default Header;