import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateQueryString } from 'tools/functions';

const eventsApi = createApi({
   reducerPath: 'eventsApi',
   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
   endpoints: (build) => ({
      getEvents: build.query<CatalogEvent[], {sort?: string, filter: CalalogEventFilters}>({
         query: ({sort='', filter}) => `events/?${generateQueryString({
            ordering: sort,
            search: filter.search,
            price: filter.maxPrice,
            people_required: filter.peopleRequired,
            available_places: filter.availablePlaces,
            only_free: filter.onlyFree,
            categories: filter.categories,
         })}`
      }),
      getCategories: build.query<PopularCategory[], void>({
         query: () => `categories/`
      })
   })
})

export const { useGetEventsQuery, useGetCategoriesQuery } = eventsApi;
export default eventsApi;