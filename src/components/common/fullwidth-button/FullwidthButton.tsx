import React from 'react';
import s from './FullwidthButton.module.scss';

type PropsType = {
   text: string
   type?: 'submit' | 'button'
};

const FullwidthButton: React.FC<PropsType> = ({
   text,
   type='button',
}) => {
   return (
      <button className={s.button} type={type}>
         {text}
      </button>
   );
};

export default FullwidthButton;