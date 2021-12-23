import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const eventsApi = createApi({
   reducerPath: 'eventsApi',
   baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:8000/'}),
   endpoints: (build) => ({
      getEvents: build.query<EventType[], void>({
         query: () => `events/`
      })
   })
})

export const { useGetEventsQuery } = eventsApi;
export default eventsApi;