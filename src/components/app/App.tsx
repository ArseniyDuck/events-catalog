import { routes } from 'app-routing';
import React from 'react';
import { Routes } from 'react-router-dom';
import { composeRoutesFromArr } from 'tools/functions';

const App: React.FC = () => {
   return (
      <Routes>
         {composeRoutesFromArr(routes)}
      </Routes>
   )
}

export default App;