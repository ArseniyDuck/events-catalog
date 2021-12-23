import React from 'react';
import { conditionClassName } from 'tools/functions';
import s from './Container.module.scss';

type PropsType = {
   className?: string
};

const Container: React.FC<PropsType> = (props) => {
   return (
      <div className={conditionClassName('container', !!props.className, props.className as string)}>
         {props.children}
      </div>
   );
};

export default Container;