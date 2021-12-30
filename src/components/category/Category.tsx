import React from 'react';
import s from './Category.module.scss';

type PropsType = {
   name: string
   color: string
};

const Category: React.FC<PropsType> = ({ name, color }) => {
   return (
      <div className={s.category} style={{borderColor: color}}>
         <span style={{color: color}}>{name}</span>
      </div>
   );
};

export default Category;