import React from 'react';
import s from './MainPage.module.scss';
import Header from 'components/header/Header';
import { useGetCategoriesQuery, useGetEventsQuery } from 'redux/events';
import SubHeader from 'components/sub-header/SubHeader';
import { getArrayOfComponents } from 'tools/functions';
import EventCard, { CardsContainer, EventCardSkeleton } from 'components/card/Card';
import { usePopUp } from 'hooks/usePopUp';
import FiltersForm from 'components/filters-form/FiltersForm';

type PropsType = {};

const MainPage: React.FC<PropsType> = (props) => {
   return <>
      <Header />
      <Main />
   </>;
};

const Main: React.FC = () => {
   const { data: events, isLoading: isLoadingEvents } = useGetEventsQuery();
   const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();
   const [isFilterOpened, setisFilterOpened, filterRef] = usePopUp<HTMLDivElement>();
   
   return <>
      <SubHeader
         eventsCount={events ? events.length : 0}
         openFilters={() => setisFilterOpened(true)}
      />
      <FiltersForm
         isOpened={isFilterOpened}
         close={() => setisFilterOpened(false)}
         filtersRef={filterRef}
         categories={categories}
         isLoading={isLoadingCategories}
      />
      <CardsContainer>
         {isLoadingEvents
            ? getArrayOfComponents(EventCardSkeleton, 20)
            : events?.map(event => (
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

export default MainPage;