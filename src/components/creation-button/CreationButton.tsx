import React from 'react';
import s from './CreationButton.module.scss';

type PropsType = {
   text: string
};

const CreationButton: React.FC<PropsType> = (props) => {
   return (
      <button className={s.create}>{props.text}</button>
   );
};

export default CreationButton;