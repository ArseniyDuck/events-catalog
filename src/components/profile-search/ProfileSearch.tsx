import React from 'react';
import { useFormik } from 'formik';
import { useQueryParams } from 'hooks';
import s from './ProfileSearch.module.scss';
import { Cross, Search } from 'icons';


type FormValues = {
   term: string
}

type PropsType = {
   setSearch: React.Dispatch<React.SetStateAction<string>>
};

const ProfileSearch: React.FC<PropsType> = (props) => {
   const { getParam, updateParams } = useQueryParams<ProfileQueryParams>()

   const formik = useFormik<FormValues>({
      initialValues: {
         term: getParam('search')
      },
      onSubmit: (formData, { setSubmitting }) => {
         setSubmitting(false)
      }
   })

   const handleReset = () => {
      formik.setFieldValue('term', '')
      props.setSearch('')
      updateParams({search: ''})
   }

   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const inputTerm = e.target.value

      formik.setFieldValue('term', inputTerm)
      props.setSearch(inputTerm)
      updateParams({search: inputTerm})
   }

   return (
      <form className={s.searchForm} onSubmit={formik.handleSubmit}>
         <button type='submit' disabled={formik.isSubmitting}>
            <Search size={20} color='var(--grey)' />
         </button>
         <input
            autoComplete='off'
            type='text'
            name='term'
            placeholder='Search by title'
            value={formik.values.term}
            onChange={handleChange}
            className={s.searchInput}
         />
         {formik.values.term && (
            <button onClick={handleReset} type='reset'>
               <Cross size={13} isHover />
            </button>
         )}
      </form>
   );
}


export default ProfileSearch;