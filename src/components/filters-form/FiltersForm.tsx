import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
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
   const { getParam, updateParams, resetParams } = useQueryParams<FilterQueryParams>();
   const [areCategoriesOpened, setAreCategoriesOpened, categoriesRef] = usePopUp<HTMLDivElement>();

   const queryParams = {
      peopleRequired: getParam('peopleRequired'),
      availablePlaces: getParam('availablePlaces'),
      onlyFree:  getParam('onlyFree', Params.BOOLEAN),
      maxPrice: getParam('maxPrice'),
   }

   const initialValues: FormValues = queryParams
   
   const [formFilters, setFormFilters] = useState<Omit<CalalogEventFilters, 'categories' | 'search'>>(queryParams);
   const [selectedCategories, setSelectedCategories] = useState<number[]>(
      getParam('categories', Params.ARRAY).map(id => Number(id))
   );
   
   const handleSubmit = (formData: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setSubmitting(false);
      props.close();
      setFormFilters({ ...formData });
      updateParams({
         ...formData,
         onlyFree:  formData.onlyFree ? formData.onlyFree : '',
         categories: selectedCategories,
      })
   };
   
   useEffect(() => {
      props.setFilters(prev => ({
         ...prev,
         ...formFilters,
         categories: selectedCategories,
      }))
   }, [formFilters]);

   const reset = () => {
      setFormFilters({
         availablePlaces: '',
         maxPrice: '',
         onlyFree: false,
         peopleRequired: ''
      })
      setSelectedCategories([])
      resetParams()
      props.close()
   }
   
   return (
      <BodyBlur blurFlag={props.isOpened}>
         <div
            ref={props.filtersRef}
            className={conditionClassName(`${s.body} ${s.filterBody}`, props.isOpened, s.opened)}
         >
            <h3 className={s.heading}>Search event filters</h3>
            <button onClick={props.close} className={s.cross}>
               <Cross size={17} />
            </button>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
               {() => (
               <Form className={s.form}>
                  <CategoriesLabel
                     onClick={() => setAreCategoriesOpened(true)}
                     selectedCategories={selectedCategories}
                     categories={props.categories}
                  />
                  <label className={s.filterField}>
                     People needed for event
                     <Field
                        autoComplete='off'
                        type='number'
                        name='peopleRequired'
                        id='peopleRequired'
                        className={s.input}
                     />
                  </label>
                  <label className={s.filterField}>
                     Available places left
                     <Field
                        autoComplete='off'
                        type='number'
                        name='availablePlaces'
                        id='availablePlaces'
                        className={s.input}
                     />
                  </label>
                  <label className={`${s.filterField} ${s.filterCheckbox}`}>
                     <Field
                        autoComplete='off'
                        type='checkbox'
                        name='onlyFree'
                        id='onlyFree'
                        className={s.input}
                     />
                     Show only free
                  </label>
                  <label className={s.filterField}>
                     Maximum price
                     <Field
                        autoComplete='off'
                        type='number'
                        name='maxPrice'
                        id='maxPrice'
                        className={s.input}
                     />
                  </label>
                  <div className={s.buttons}>
                     <button className={s.reset} onClick={reset} type='reset'>Reset</button>
                     <button className={s.apply} type='submit'>Apply</button>
                  </div>
               </Form>
               )}
            </Formik>
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