import React from 'react'
import Registration from 'pages/auth/Registration';
import SignIn from 'pages/auth/SignIn';
import MainPage from 'pages/main-page/MainPage';
import Profile from 'pages/profile/Profile';

export enum RouteLinks {
   MAIN = '/',
   PROFILE = '/profile',
   SIGN_IN = '/sign-in',
   REGISTRATION = '/registration',
}

export type RouteType = {
   path: RouteLinks
   element: React.ReactElement<any>
}

export const routes: RouteType[] = [
   { path: RouteLinks.MAIN, element: <MainPage /> },
   { path: RouteLinks.PROFILE, element: <Profile /> },
   { path: RouteLinks.SIGN_IN, element: <SignIn /> },
   { path: RouteLinks.REGISTRATION, element: <Registration /> },
];