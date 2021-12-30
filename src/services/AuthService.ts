import $api from 'http-requests';
import { AxiosResponse } from 'axios';


export default class AuthService {
   static async me(): Promise<AxiosResponse<User>> {
      return $api.get('me/');
   }
   
   static async signIn(user: RegistrationUser): Promise<AxiosResponse<JWTTokens>> {
      return $api.post('token/obtain/', { ...user });
   }

   static async refresh(): Promise<AxiosResponse<JWTTokens>> {
      return $api.post('token/refresh/', { refresh: localStorage.getItem('refreshToken') });
   }

   static async signUp(user: SignUpUser): Promise<AxiosResponse<void>> {
      return $api.post('register/', { ...user });
   }
};