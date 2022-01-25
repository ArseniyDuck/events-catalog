import React from 'react'
import Registration from 'pages/auth/Registration';
import SignIn from 'pages/auth/SignIn';
import HomePage from 'pages/home-page/HomePage';
import Profile from 'pages/profile/Profile';

export enum RouteLinks {
   HOME = '/',
   PROFILE = '/profile',
   SIGN_IN = '/sign-in',
   REGISTRATION = '/registration',
}

export type RouteType = {
   path: RouteLinks
   element: React.ReactElement<any>
}

export const routes: RouteType[] = [
   { path: RouteLinks.HOME, element: <HomePage /> },
   { path: RouteLinks.PROFILE, element: <Profile /> },
   { path: RouteLinks.SIGN_IN, element: <SignIn /> },
   { path: RouteLinks.REGISTRATION, element: <Registration /> },
];