import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikHelpers, useFormik } from 'formik';
import { usePopUp, useQueryParams } from 'hooks';
import { Params } from 'hooks/useQueryParams';
import { conditionClassName } from 'tools/functions';
import s from './FiltersForm.module.scss';
import { BodyBlur } from 'components/common';
import { CategoriesLabel, CategoriesSelection } from 'components/common/select-categories/SelectCategories';
import { Cross } from 'icons';



type PropsType = {
   isOpened: boolean
   close: () => void
   filtersRef: React.RefObject<HTMLDivElement>
   categories: PopularCategory[]
   isLoading: boolean
   setFilters: React.Dispatch<React.SetStateAction<CalalogEventFilters>>
}

type FormValues = {
   peopleRequired: string
   availablePlaces: string
   onlyFree: boolean
   maxPrice: string
}

const FiltersForm: React.FC<PropsType> = (props) => {
   const [areCategoriesOpened, setAreCategoriesOpened, categoriesRef] = usePopUp<HTMLDivElement>();

   const { getParam, updateParams } = useQueryParams<Omit<FilterQueryParams, 'search'>>();
   const queryParams = {
      peopleRequired: getParam('peopleRequired'),
      availablePlaces: getParam('availablePlaces'),
      onlyFree:  getParam('onlyFree', Params.BOOLEAN),
      maxPrice: getParam('maxPrice'),
   };

   const [formFilters, setFormFilters] = useState<Omit<CalalogEventFilters, 'categories' | 'search'>>(queryParams);
   const [selectedCategories, setSelectedCategories] = useState<number[]>(
      getParam('categories', Params.ARRAY).map(id => Number(id))
   );

   const formik = useFormik<FormValues>({
      initialValues: queryParams,
      onSubmit: (formData, { setSubmitting }) => {
         setSubmitting(false)
         setFormFilters({ ...formData })
         updateParams({
            ...formData,
            onlyFree:  formData.onlyFree ? formData.onlyFree : '',
            categories: selectedCategories,
         })
         props.close()
      },
   });

   const handleReset = () => {
      formik.setValues({
         availablePlaces: '',
         maxPrice: '',
         onlyFree: false,
         peopleRequired: '',
      })

      setSelectedCategories([])
      setFormFilters({
         availablePlaces: '',
         maxPrice: '',
         onlyFree: false,
         peopleRequired: ''
      })

      updateParams({
         availablePlaces: '',
         categories: [],
         maxPrice: '',
         onlyFree: '',
         peopleRequired: '',
      })

      props.close()
   }
   
   useEffect(() => {
      props.setFilters(prev => ({
         ...prev,
         ...formFilters,
         categories: selectedCategories,
      }))
   }, [formFilters]);
   
   return (
      <BodyBlur blurFlag={props.isOpened}>
         <div
            ref={props.filtersRef}
            className={conditionClassName(`${s.body} ${s.filterBody}`, props.isOpened, s.opened)}
         >
            <h3 className={s.heading}>Search event filters</h3>
            <button onClick={props.close} className={s.cross}>
               <Cross isHover size={17}  />
            </button>
            <form onSubmit={formik.handleSubmit} className={s.form}>
               <CategoriesLabel
                  onClick={() => setAreCategoriesOpened(true)}
                  selectedCategories={selectedCategories}
                  categories={props.categories}
               />
               <label className={s.filterField}>
                  People needed for event
                  <input
                     autoComplete='off'
                     type='number'
                     name='peopleRequired'
                     id='peopleRequired'
                     className={s.input}
                     onChange={formik.handleChange}
                     value={formik.values.peopleRequired}
                  />
               </label>
               <label className={s.filterField}>
                  Available places left
                  <input
                     autoComplete='off'
                     type='number'
                     name='availablePlaces'
                     id='availablePlaces'
                     className={s.input}
                     onChange={formik.handleChange}
                     value={formik.values.availablePlaces}
                  />
               </label>
               <label className={`${s.filterField} ${s.filterCheckbox}`}>
                  <input
                     autoComplete='off'
                     type='checkbox'
                     name='onlyFree'
                     id='onlyFree'
                     className={s.input}
                     onChange={(e) => formik.setFieldValue('onlyFree', e.target.checked)}
                     checked={formik.values.onlyFree}
                  />
                  Show only free
               </label>
               <label className={s.filterField}>
                  Maximum price
                  <input
                     autoComplete='off'
                     type='number'
                     name='maxPrice'
                     id='maxPrice'
                     className={s.input}
                     onChange={formik.handleChange}
                     value={formik.values.maxPrice}
                  />
               </label>
               <div className={s.buttons}>
                  <button className={s.reset} onClick={handleReset} type='reset'>Reset</button>
                  <button className={s.apply} disabled={formik.isSubmitting} type='submit'>Apply</button>
               </div>
            </form>
            <CategoriesSelection
               isOpened={areCategoriesOpened}
               close={() => setAreCategoriesOpened(false)}
               categoriesRef={categoriesRef}
               selectedCategories={selectedCategories}
               setSelectedCategories={setSelectedCategories}
               categories={props.categories}
               isLoading={props.isLoading}
            />
         </div>
      </BodyBlur>
   );
}

export default FiltersForm;