import React from 'react';
import { Form, Formik, FormikHelpers } from 'formik';
import s from './FiltersForm.module.scss';
import { BodyBlur } from 'components/common';
import { conditionClassName } from 'tools/functions';
import { Arrow } from 'icons';
import Cross from 'icons/cross/Cross';
import { usePopUp } from 'hooks';



type PropsType = {
   isOpened: boolean
   close: () => void
   filtersRef: React.RefObject<HTMLDivElement>
}

type FormValues = {}

const FiltersForm: React.FC<PropsType> = (props) => {
   const [areCategoriesOpened, setAreCategoriesOpened, categoriesRef] = usePopUp<HTMLDivElement>();
   
   const initialValues: FormValues = {}

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      setSubmitting(false);
      resetForm({});
      props.close();
   }

   return (
      <BodyBlur blurFlag={props.isOpened}>
         <div ref={props.filtersRef} className={conditionClassName(s.body, props.isOpened, s.opened)}>
            <h3 className={s.heading}>Search event filters</h3>
            <button onClick={props.close} className={s.cross}>
               <Cross size={17} />
            </button>
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
               {() => (
               <Form className={s.form}>
                  <CategoriesLabel onClick={() => setAreCategoriesOpened(true)} />
                  <button className={s.apply} type='submit'>Apply filters</button>
               </Form>
               )}
            </Formik>
            <CategoriesSelection
               isOpened={areCategoriesOpened}
               close={() => setAreCategoriesOpened(false)}
               categoriesRef={categoriesRef}
            />
         </div>
      </BodyBlur>
   );
}


const CategoriesLabel: React.FC<{onClick: () => void}> = (props) => {
   return (
      <div onClick={props.onClick} className={s.formLabel}>
         <p className={s.labelName}>Categories</p>
         <p className={s.selectedItems}>Sport, Active rest, Category, Category</p>
         <Arrow direction='right' size={15} color='var(--grey)' />
      </div>
   );
}


type CategoriesSelectionProps = {
   isOpened: boolean
   close: () => void
   categoriesRef: React.RefObject<HTMLDivElement>
}
const CategoriesSelection: React.FC<CategoriesSelectionProps> = (props) => {
   return (
      <div ref={props.categoriesRef} className={conditionClassName(s.body, props.isOpened, s.opened)}>
         <div className={s.selectionHeader}>
            <button onClick={props.close} className={s.backToFilters}>
               <Arrow size={20} direction='left' />
               <h3 className={s.heading}>Select categories</h3>
            </button>
            <button className={s.resetCategories}>reset</button>
         </div>
      </div>
   );
}

export default FiltersForm;