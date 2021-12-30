import { configureStore } from '@reduxjs/toolkit';
import eventsApi from './eventsApi';
import authReducer from './auth-reducer'


const store = configureStore({
  reducer: {
     auth: authReducer,
     [eventsApi.reducerPath]: eventsApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(eventsApi.middleware) 
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;