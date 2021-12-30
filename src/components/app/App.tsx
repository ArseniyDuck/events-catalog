import React, { useEffect } from 'react';
import { Routes } from 'react-router-dom';
import { routes } from 'app-routing';
import { composeRoutesFromArr } from 'tools/functions';
import s from './App.module.scss';
import { useAppDispatch } from 'hooks';
import { me } from 'redux/auth-reducer';

const App: React.FC = () => {
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(me());
   }, [dispatch]);

   return (
      <div className={s.wrapper}>
         <Routes>
            {composeRoutesFromArr(routes)}
         </Routes>
      </div>
   )
}

export default App;