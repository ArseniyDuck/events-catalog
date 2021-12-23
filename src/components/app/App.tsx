import React from 'react';
import { Routes } from 'react-router-dom';
import { routes } from 'app-routing';
import { composeRoutesFromArr } from 'tools/functions';
import s from './App.module.scss';

const App: React.FC = () => {
   return (
      <div className={s.wrapper}>
         <Routes>
            {composeRoutesFromArr(routes)}
         </Routes>
      </div>
   )
}

export default App;