import { createSlice, createAsyncThunk, Update } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import AuthService from 'services/AuthService';
import eventsApi from './eventsApi';


type initialStateType = {
   user: User
   signUpErrors: string[]
   isFetching: boolean
}

const intialUser: User = {
   id: null,
   username: '',
   fullname: '',
   phone_number: '',
   photo: null,
   is_profile_notification_shown: false
}

const initialState: initialStateType = {
   user: intialUser,
   signUpErrors: [],
   isFetching: false
};

export const deleteNotification = createAsyncThunk(
   'auth/deleteNotification',
   async (_, thunkAPI) => {
      try {
         await AuthService.hideNotification()
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const signIn = createAsyncThunk(
   'auth/signIn',
   async (user: RegistrationUser, thunkAPI) => {
      try {
         const { data: { access, refresh } } = await AuthService.signIn(user);
         localStorage.setItem('accessToken', access)
         localStorage.setItem('refreshToken', refresh);
         thunkAPI.dispatch(me());
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const signUp = createAsyncThunk(
   'auth/signUp',
   async (user: SignUpUser, thunkAPI) => {
      try {
         const response = await AuthService.signUp(user);
         if (response.status === 201) {
            thunkAPI.dispatch(signIn({ username: user.username, password: user.password1 }));
            thunkAPI.dispatch(setErrors([]));
         }
         return response.data;
      } catch (error) {
         const err = error as AxiosError;
         if (err.response?.status === 401) {
            // thunkAPI.dispatch(alertMessage({ message: 'Error occured: refresh', messageStatus: 'error' }));
         } else if (err.response?.status === 400) {
            thunkAPI.dispatch(setErrors(
               [...(err.response?.data.username || []), ...(err.response?.data.password1 || [])]
            ));
         } else {
            // thunkAPI.dispatch(alertMessage({ message: 'Error occured while registration', messageStatus: 'error' }))
         }
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const me = createAsyncThunk(
   'auth/me',
   async (_, thunkAPI) => {
      try {
         const { data } = await AuthService.me();
         thunkAPI.dispatch(setUser(data));
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const updateProfile = createAsyncThunk(
   'auth/updateProfile',
   async (userData: UpdateUser, thunkAPI) => {
      try {
         const { data: user } = await AuthService.updateProfile(userData)
         return user
      } catch (error) {
         const err = error as AxiosError;
         return thunkAPI.rejectWithValue(err.message);
      }
   }
)

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser(state, action) {
         state.user = action.payload
      },
      logout(state) {
         state.user = intialUser
         localStorage.removeItem('accessToken')
         localStorage.removeItem('refreshToken')
      },
      setErrors(state, action) {
         state.signUpErrors = action.payload
      }
   },
   extraReducers: (builder) => {
      // deleteNotification ---------------------------------
      builder.addCase(deleteNotification.pending, (state => {
         state.isFetching = true
      }))

      builder.addCase(deleteNotification.fulfilled, (state => {
         state.user.is_profile_notification_shown = false
         state.isFetching = false
      }))

      builder.addCase(deleteNotification.rejected, (state => {
         state.isFetching = false
      }))

      // updateProfile ---------------------------------
      builder.addCase(updateProfile.pending, (state => {
         state.isFetching = true
      }))

      builder.addCase(updateProfile.fulfilled, ((state, action) => {
         state.user = action.payload
         state.isFetching = false
      }))

      builder.addCase(updateProfile.rejected, (state => {
         state.isFetching = false
      }))

      // createEvent ---------------------------------
      builder.addMatcher(
         eventsApi.endpoints.createEvent.matchFulfilled,
         (state, action) => {
            
         }
      )
   }
});



export default authSlice.reducer;
export const { setUser, logout, setErrors } = authSlice.actions;