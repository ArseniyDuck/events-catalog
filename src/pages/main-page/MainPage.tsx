import React, { useState } from 'react';
import s from './MainPage.module.scss';
import Header from 'components/header/Header';
import { useGetCategoriesQuery, useGetEventsQuery } from 'redux/eventsApi';
import SubHeader from 'components/sub-header/SubHeader';
import { getArrayOfComponents } from 'tools/functions';
import EventCard, { CardsContainer, EventCardSkeleton } from 'components/card/Card';
import { usePopUp } from 'hooks/usePopUp';
import FiltersForm from 'components/filters-form/FiltersForm';
import { DefaultFilters, SortBy } from 'tools/variables';

type PropsType = {};

const MainPage: React.FC = () => {
   const [sortMode, setSortMode] = useState<string>(SortBy.NEWEST);
   const [filters, setFilters] = useState<CalalogEventFilters>(DefaultFilters);

   const { data: events, isLoading: isLoadingEvents } = useGetEventsQuery({sort: sortMode, filter: filters});
   const { data: categories, isLoading: isLoadingCategories } = useGetCategoriesQuery();

   const [isFilterOpened, setisFilterOpened, filterRef] = usePopUp<HTMLDivElement>();

   const setSearch = (search: string) => {
      setFilters(prev => ({ ...prev, search }))
   }
   
   return <>
      <Header setSearch={setSearch} />
      <SubHeader
         eventsCount={events ? events.length : 0}
         openFilters={() => setisFilterOpened(true)}
         sortMode={sortMode}
         setSortMode={setSortMode}
      />
      <FiltersForm
         isOpened={isFilterOpened}
         close={() => setisFilterOpened(false)}
         filtersRef={filterRef}
         categories={categories}
         isLoading={isLoadingCategories}
         setFilters={setFilters}
      />
      <CardsContainer>
         {isLoadingEvents
            ? getArrayOfComponents(EventCardSkeleton, 20)
            : events?.map(event => (
               <EventCard
                  key={event.id}
                  {...event}
                  // name={event.name}
                  // description={event.description}
                  // photo={event.photo}
                  // time={event.time}
                  // people_required={event.people_required}
                  // people_joined={event.people_joined}
                  // place={event.place}
                  // price={event.price}
                  // categories={event.categories}
               />
            ))
         }
      </CardsContainer>
   </>;
}

export default MainPage;