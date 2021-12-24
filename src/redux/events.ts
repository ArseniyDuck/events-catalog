import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const eventsApi = createApi({
   reducerPath: 'eventsApi',
   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
   endpoints: (build) => ({
      getEvents: build.query<EventType[], void>({
         query: () => `events/`
      }),
      getCategories: build.query<PopularCategoryType[], void>({
         query: () => `categories/`
      })
   })
})

export const { useGetEventsQuery, useGetCategoriesQuery } = eventsApi;
export default eventsApi;