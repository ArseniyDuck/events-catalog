import $api from 'http-requests';
import { BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query'
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { generateQueryString } from 'tools/functions';
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
      }),
      getUserEvents: build.query<MyEvent[], string>({
         query: (search: string) => `events/mine/?${generateQueryString({ search })}`
      })
   })
})

export default eventsApi;
export const {
   useGetEventsQuery,
   useGetCategoriesQuery,
   useGetUserEventsQuery,
} = eventsApi;