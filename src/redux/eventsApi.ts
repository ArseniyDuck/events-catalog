import $api from 'http-requests';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateQueryString, providesList } from 'tools/functions';
import { API_URL } from 'tools/variables';
import { logout } from './auth-reducer';
 

const baseQuery = fetchBaseQuery({
   baseUrl: API_URL,
   prepareHeaders: (headers) => {
      headers.set('Authorization', `Bearer ${localStorage.getItem('accessToken')}`)
      return headers
   }
})

const baseQueryWithReauth: BaseQueryFn<
   string | FetchArgs,
   unknown,
   FetchBaseQueryError
> = async (args, api, extraOptions) => {
   let result = await baseQuery(args, api, extraOptions)
   
   if (result.error && result.error.status === 401) {
      const { data: { access, refresh } } = await $api.post<JWTTokens>(
         'token/refresh/', {refresh: localStorage.getItem('refreshToken')}
      );

      if (access && refresh) {
         localStorage.setItem('accessToken', access)
         localStorage.setItem('refreshToken', refresh)

         result = await baseQuery(args, api, extraOptions)
      } else {
         api.dispatch(logout())
      }
   }
   return result
}


const eventsApi = createApi({
   reducerPath: 'eventsApi',
   baseQuery: baseQueryWithReauth,
   tagTypes: ['Events', 'Categories', 'UserEvents'],
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
         })}`,
         providesTags: (result) => providesList(result, 'Events')
      }),

      getCategories: build.query<PopularCategory[], void>({
         query: () => `categories/`,
         providesTags: (result) => providesList(result, 'Categories')
      }),

      getUserEvents: build.query<MyEvent[], string>({
         query: (search: string) => `events/mine/?${generateQueryString({ search })}`,
         providesTags: (result) => providesList(result, 'UserEvents')
      }),
      
      createEvent: build.mutation<CatalogEvent, EventCreation>({
         query: (body) => ({
            url: `event/create/`,
            method: 'POST',
            body: {
               name: body.name,
               description: body.description,
               time: body.time,
               people_required: body.peopleRequired,
               place: body.place,
               categories: body.categories,
               price: body.price || 0,
            },
         }),
         invalidatesTags: [{ type: 'Events', id: 'LIST' }]
      })
   })
})

export default eventsApi;
export const {
   useGetEventsQuery,
   useGetCategoriesQuery,
   useGetUserEventsQuery,
   useCreateEventMutation,
} = eventsApi;