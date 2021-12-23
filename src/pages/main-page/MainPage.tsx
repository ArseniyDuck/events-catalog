import React from 'react';
import s from './MainPage.module.scss';
import Header from 'components/header/Header';
import { useGetEventsQuery } from 'redux/events';
import SubHeader from 'components/sub-header/SubHeader';
import { conditionClassName, getArrayOfComponents } from 'tools/functions';
import EventCard, { CardsContainer, EventCardSkeleton } from 'components/card/Card';
import { usePopUp } from 'hooks/usePopUp';
import { BodyBlur } from 'components/common';
import { Field, Form, Formik, FormikHelpers } from 'formik';

type PropsType = {};

const MainPage: React.FC<PropsType> = (props) => {
   return <>
      <Header />
      <Main />
   </>;
};

const Main: React.FC = () => {
   const { data, isLoading } = useGetEventsQuery();
   const [isFilterOpened, setisFilterOpened, filterRef] = usePopUp<HTMLDivElement>();
   
   return <>
      <SubHeader
         eventsCount={data ? data.length : 0}
         openFilters={() => setisFilterOpened(true)}
      />
      <FiltersForm
         isOpened={isFilterOpened}
         close={() => setisFilterOpened(false)}
         filtersRef={filterRef}
      />
      <CardsContainer>  
         {isLoading
            ? getArrayOfComponents(EventCardSkeleton, 20)
            : data?.map(event => (
               <EventCard
                  key={event.id}
                  title={event.name}
                  description={event.description}
                  photo={event.photo}
                  time={event.time}
                  people_required={event.people_required}
                  people_joined={event.people_joined}
                  place={event.place}
                  price={event.price}
                  categories={event.categories}
               />
            ))
         }
      </CardsContainer>
   </>;
}


type FiltersFormProps = {
   isOpened: boolean
   close: () => void
   filtersRef: React.RefObject<HTMLDivElement>
}

type FormValues = {

}

const FiltersForm: React.FC<FiltersFormProps> = (props) => {
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
            <Formik initialValues={initialValues} onSubmit={handleSubmit}>
               {() => (
               <Form className={s.form}>
                  <button className={s.apply} type='submit'>Apply filters</button>
               </Form>
               )}
            </Formik>
         </div>
      </BodyBlur>
   );
}


export default MainPage;