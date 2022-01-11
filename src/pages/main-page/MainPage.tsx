import React, { useState } from 'react';
import s from './MainPage.module.scss';
import Header from 'components/header/Header';
import { useGetCategoriesQuery, useGetEventsQuery } from 'redux/eventsApi';
import SubHeader from 'components/sub-header/SubHeader';
import { componentList } from 'tools/functions';
import EventCard, { CardsContainer, EventCardSkeleton } from 'components/card/Card';
import { useModal } from 'hooks';
import FiltersForm from 'components/filters-form/FiltersForm';
import { DefaultFilters, SortBy } from 'tools/variables';
import EventCreation from 'components/event-creation/EventCreation';

type PropsType = {};

const MainPage: React.FC = () => {
   const [sortMode, setSortMode] = useState<string>(SortBy.NEWEST);
   const [filters, setFilters] = useState<CalalogEventFilters>(DefaultFilters);

   const {data: catalogEvents=[], isLoading: isLoadingEvents} = useGetEventsQuery({sort: sortMode, filter: filters});

   const [isFilterOpened, setisFilterOpened, filterRef] = useModal<HTMLDivElement>()
   const [isCreationOpened, setIsCreationOpened, creationRef] = useModal<HTMLDivElement>()

   const setSearch = (search: string) => {
      setFilters(prev => ({ ...prev, search }))
   }
   
   return <>
      <Header
         setSearch={setSearch}
         openCreation={() => setIsCreationOpened(true)}
      />
      <SubHeader
         eventsCount={catalogEvents ? catalogEvents.length : 0}
         openFilters={() => setisFilterOpened(true)}
         sortMode={sortMode}
         setSortMode={setSortMode}
      />
      <FiltersForm
         isOpened={isFilterOpened}
         close={() => setisFilterOpened(false)}
         filtersRef={filterRef}
         setFilters={setFilters}
      />
      <EventCreation
         isOpened={isCreationOpened}
         close={() => setIsCreationOpened(false)}
         innerRef={creationRef}
      />
      <CardsContainer>
         {isLoadingEvents
            ? componentList(EventCardSkeleton, 20)
            : catalogEvents?.map(event => (
               <EventCard
                  key={event.id}
                  id={event.id}
                  name={event.name}
                  description={event.description}
                  photo={event.photo}
                  time={event.time}
                  people_required={event.people_required}
                  people_joined={event.people_joined}
                  place={event.place}
                  price={event.price}
                  categories={event.categories}
                  creator={event.creator}
               />
            ))
         }
      </CardsContainer>
   </>;
}

export default MainPage;