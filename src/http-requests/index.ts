import axios, { AxiosError, AxiosRequestHeaders } from 'axios';
import Cookies from 'js-cookie';
import { API_URL, unsafeMethods } from 'tools/variables';


const $api = axios.create({
   withCredentials: true,
   baseURL: API_URL,
});

$api.interceptors.request.use(
   (config) => {
      const headers = config.headers as AxiosRequestHeaders;
      const token = localStorage.getItem('accessToken');
      if (token) { headers['Authorization'] = `Bearer ${token}`; }

      if (unsafeMethods.includes(config.method as string)) {
         headers['X-CSRFToken'] = Cookies.get('csrftoken') as string;
      }

      return config;
   },
   (error) => {
      return Promise.reject(error);
   }
);

// todo: fix bug with endless loop
$api.interceptors.response.use(
   (res) => {
      return res;
   },
   async (err: AxiosError) => {
      const originalConfig = err.config;
      if (originalConfig.url !== 'token/obtain/' && err.response) {
         // Access Token was expired
         // @ts-ignore
         if (err.response.status === 401 && !originalConfig._retry) {
            // @ts-ignore
            originalConfig._retry = true
            try {
               type ResponseType = { access: string, refresh: string }
               const { data: { access, refresh } } = await $api.post<ResponseType>(
                  'token/refresh/', {refresh: localStorage.getItem('refreshToken')}
               );
               localStorage.setItem('accessToken', access);
               localStorage.setItem('refreshToken', refresh);
               return  $api(originalConfig);
            } catch (_error) {
               return Promise.reject(_error);
            }
         }
      }
      return Promise.reject(err);
   }
 );

 

 export default $api;