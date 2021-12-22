import React from 'react'
import Registration from 'pages/auth/Registration';
import SignIn from 'pages/auth/SignIn';
import MainPage from 'pages/main-page/MainPage';
import Profile from 'pages/profile/Profile';

export const routeLinks = {
   MAIN: '/',
   PROFILE: '/profile',
   SIGN_IN: '/sign-in',
   REGISTRATION: '/registration',
} as const;

export type RouteType = {
   path: typeof routeLinks[keyof typeof routeLinks]
   element: React.ReactElement<any>
}

export const routes: RouteType[] = [
   { path: routeLinks.MAIN, element: <MainPage /> },
   { path: routeLinks.PROFILE, element: <Profile /> },
   { path: routeLinks.SIGN_IN, element: <SignIn /> },
   { path: routeLinks.REGISTRATION, element: <Registration /> },
];