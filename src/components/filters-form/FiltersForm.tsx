import React, { useEffect, useState } from 'react';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { useModal, useQueryParams } from 'hooks';
import { Params } from 'hooks/useQueryParams';
import { conditionClass } from 'tools/functions';
import s from './FiltersForm.module.scss';
import { OpenWithBodyBlur } from 'components/common';
import SelectCategories from 'components/common/select-categories/SelectCategories';
import { Cross } from 'icons';



type PropsType = {
   isOpened: boolean
   close: () => void
   filtersRef: React.RefObject<HTMLDivElement>
   setFilters: React.Dispatch<React.SetStateAction<CalalogEventFilters>>
}

type FormValues = {
   peopleRequired: string
   availablePlaces: string
   onlyFree: boolean
   maxPrice: string
   categories: number[]
}

const FiltersForm: React.FC<PropsType> = (props) => {
   const [
      areCategoriesOpened,
      setAreCategoriesOpened,
      categoriesRef
   ] = useModal<HTMLDivElement>();

   const { getParam, updateParams } = useQueryParams<Omit<CalalogQueryParams, 'search'>>();
   const queryParams: FormValues = {
      peopleRequired: getParam('peopleRequired'),
      availablePlaces: getParam('availablePlaces'),
      onlyFree:  getParam('onlyFree', Params.BOOLEAN),
      maxPrice: getParam('maxPrice'),
      categories: getParam('categories', Params.ARRAY).map(id => Number(id))
   };

   const [
      formFilters,
      setFormFilters
   ] = useState<Omit<CalalogEventFilters, 'search'>>(queryParams);

   const handleSubmit = (formData: FormValues, { setSubmitting }: FormikHelpers<FormValues>) => {
      setSubmitting(false)
      setFormFilters({ ...formData })
      updateParams({
         ...formData,
         onlyFree:  formData.onlyFree ? formData.onlyFree : '',
      })
      props.close()
   }

   const handleReset = (values: FormValues, { setValues, setFieldValue, resetForm }: FormikHelpers<FormValues>) => {
      setValues({
         availablePlaces: '',
         maxPrice: '',
         onlyFree: false,
         peopleRequired: '',
         categories: [],
      })

      setFormFilters({
         availablePlaces: '',
         maxPrice: '',
         onlyFree: false,
         peopleRequired: '',
         categories: [],
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
      }))
   }, [formFilters]);

   return (
      <OpenWithBodyBlur flag={props.isOpened}>
         <div
            ref={props.filtersRef}
            className={conditionClass(`${s.body} ${s.filterBody}`, props.isOpened, s.opened)}
         >
            <h3 className={s.heading}>Search event filters</h3>
            <button onClick={props.close} className={s.cross}>
               <Cross isHover size={17}  />
            </button>
            <Formik
               initialValues={queryParams}
               onSubmit={handleSubmit}
               onReset={handleReset}
            >
               {({ isSubmitting }) => (
               <Form autoComplete='off' className={s.form}>
                  <SelectCategories
                     emptyStateName='All'
                     as='aside'
                     isOpened={areCategoriesOpened}
                     setIsOpened={setAreCategoriesOpened}
                     modalRef={categoriesRef}
                     styles={{
                        padding: '10px 5px',
                        margin: '0 -5px',
                     }}
                  />
                  <label className={s.filterField}>
                     People needed for event
                     <Field
                        type='number'
                        name='peopleRequired'
                        className={s.input}
                     />
                  </label>
                  <label className={s.filterField}>
                     Available places left
                     <Field
                        type='number'
                        name='availablePlaces'
                        className={s.input}
                     />
                  </label>
                  <label className={`${s.filterField} ${s.filterCheckbox}`}>
                     <Field
                        type='checkbox'
                        name='onlyFree'
                        className={s.input}
                     />
                     Show only free
                  </label>
                  <label className={s.filterField}>
                     Maximum price
                     <Field
                        type='number'
                        name='maxPrice'
                        className={s.input}
                     />
                  </label>
                  <div className={s.buttons}>
                     <button className={`${s.reset} greyOnInteract`} type='reset'>
                        Reset
                     </button>
                     <button className={s.apply} disabled={isSubmitting} type='submit'>
                        Apply
                     </button>
                  </div>
               </Form>
               )}
            </Formik>
         </div>
      </OpenWithBodyBlur>
   );
}

export default FiltersForm;