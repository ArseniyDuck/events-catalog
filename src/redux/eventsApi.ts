import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateQueryString } from 'tools/functions';

const eventsApi = createApi({
   reducerPath: 'eventsApi',
   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
   endpoints: (build) => ({
      getEvents: build.query<EventType[], {sort?: string, filter: FilterType}>({
         query: ({sort='', filter}) => `events/?${generateQueryString({
            ordering: sort,
            search: filter.search,
            price: filter.price,
            people_required: filter.peopleRequired,
            available_places: filter.availablePlaces,
            only_free: filter.onlyFree,
            categories: filter.categories,
         })}`
      }),
      getCategories: build.query<PopularCategoryType[], void>({
         query: () => `categories/`
      })
   })
})

export const { useGetEventsQuery, useGetCategoriesQuery } = eventsApi;
export default eventsApi;