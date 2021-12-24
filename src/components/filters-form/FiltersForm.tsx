import React, { useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import s from './FiltersForm.module.scss';
import { BodyBlur, TransitionSkeleton } from 'components/common';
import { conditionClassName, getArrayOfComponents } from 'tools/functions';
import { Arrow } from 'icons';
import Cross from 'icons/cross/Cross';
import { usePopUp } from 'hooks';
import { CategoriesLabel, CategoriesSelection } from 'components/common/select-categories/SelectCategories';



type PropsType = {
   isOpened: boolean
   close: () => void
   filtersRef: React.RefObject<HTMLDivElement>
   categories?: PopularCategoryType[]
   isLoading: boolean
}

type FormValues = {
   peopleRequired: number | ''
   availablePlaces: number | ''
   onlyFree: boolean
   maxPrice: number | ''

}

const FiltersForm: React.FC<PropsType> = (props) => {
   const [areCategoriesOpened, setAreCategoriesOpened, categoriesRef] = usePopUp<HTMLDivElement>();
   const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
   
   const initialValues: FormValues = {
      peopleRequired: '',
      availablePlaces: '',
      onlyFree: false,
      maxPrice: '',
   }

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      console.log(formData, selectedCategories);
      
      setSubmitting(false);
      props.close();
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
                  <button className={s.apply} type='submit'>Apply filters</button>
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