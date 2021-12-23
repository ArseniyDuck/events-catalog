import React from 'react';
import { conditionClassName } from 'tools/functions';
import s from './BodyBlur.module.scss';

type PropsType = {
   blurFlag: boolean
};

const BodyBlur: React.FC<PropsType> = (props) => {
   return (
      <div className={conditionClassName(s.wrapper, props.blurFlag, s.blur)}>
         {props.children}
      </div>
   );
};

export default BodyBlur;