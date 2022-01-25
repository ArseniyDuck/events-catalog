import React, { useEffect, useState } from 'react';
import { Routes } from 'react-router-dom';
import { routes } from 'app-routing';
import { composeRoutesFromArr } from 'tools/functions';
import s from './App.module.scss';
import { useAppDispatch } from 'hooks';
import { me } from 'redux/auth-reducer';
import { BodyDisabledContext } from 'hooks/useDisableScroll';

const App: React.FC = () => {
   // for body disabling scroll
   const [disablesCount, setDisablesCount] = useState<number>(0);
   
   const dispatch = useAppDispatch();

   useEffect(() => {
      dispatch(me());
   }, [dispatch]);

   return (
      <BodyDisabledContext.Provider value={{
         flagsCount: disablesCount,
         setFlagsCount: setDisablesCount
      }}>
         <div className={s.wrapper}>
            <Routes>
               {composeRoutesFromArr(routes)}
            </Routes>
         </div>
      </BodyDisabledContext.Provider>
   )
}

export default App;