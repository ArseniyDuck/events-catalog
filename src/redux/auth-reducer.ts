import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { AxiosError } from 'axios';
import { history } from 'app-routing';
import AuthService from 'services/AuthService';


type initialStateType = {
   user: User
   signUpErrors: string[]
};

const initialState: initialStateType = {
   user: {
      id: null,
      username: '',
   },
   signUpErrors: [],

};

export const signIn = createAsyncThunk(
   'auth/signIn',
   async (user: RegistrationUser, thunkAPI) => {
      try {
         const { data: { access, refresh } } = await AuthService.signIn(user);
         localStorage.setItem('accessToken', access)
         localStorage.setItem('refreshToken', refresh);
         thunkAPI.dispatch(me());
         history.push('/');
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

export const authSlice = createSlice({
   name: 'auth',
   initialState,
   reducers: {
      setUser(state, action) {
         state.user = action.payload
      },
      // todo: clear all reducer, not only user info
      logout(state) {
         state.user.username = ''
         state.user.id = null
         localStorage.removeItem('accessToken')
         localStorage.removeItem('refreshToken')
      },
      setErrors(state, action) {
         state.signUpErrors = action.payload
      }
   },
});

export default authSlice.reducer;
export const { setUser, logout, setErrors } = authSlice.actions;