import { Container } from 'components/common';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { MenuBurger } from 'icons';
import React from 'react';
import s from './SubHeader.module.scss';
import arrow from 'images/arrow.svg';


type PropsType = {
   eventsCount: number
   openFilters: () => void
}

const SubHeader: React.FC<PropsType> = (props) => {
   return (
      <div className={s.subHeader}>
         <Container className={s.container}>
            <h1 className={s.heading}>{props.eventsCount} active events</h1>
            <Sorting />
            <button onClick={props.openFilters} className={s.filters}>
               <span>Filter events</span>
               <MenuBurger size={20} />
            </button>
         </Container>
      </div>
   );
}


const SortBy = { PRICE: 'price', DATE: 'date', }

type FormValues = {
   sortBy: typeof SortBy[keyof typeof SortBy]
};

const Sorting = () => {
   const initialValues: FormValues = { sortBy: 'price' };

   const handleSubmit = (formData: FormValues, { setSubmitting, resetForm }: FormikHelpers<FormValues>) => {
      console.log(formData.sortBy);
      setSubmitting(false);
      resetForm({});
   };
   
   return (
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
         {() => (
         <Form>
            <Field as='select' name='sortBy' className={s.select} style={{backgroundImage: `url(${arrow})`}}>
               <option value={SortBy.PRICE}>By price</option>
               <option value={SortBy.DATE}>By date</option>
            </Field>
         </Form>
         )}
      </Formik>
   );
}

export default SubHeader;