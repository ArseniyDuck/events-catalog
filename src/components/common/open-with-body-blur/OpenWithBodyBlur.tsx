import React from 'react';
import { conditionClass } from 'tools/functions';
import s from './OpenWithBodyBlur.module.scss';

type PropsType = {
   flag: boolean
   isHoverTransition?: boolean
};

const OpenWithBodyBlur: React.FC<PropsType> = (props) => {
   return (
      <div
         className={conditionClass(s.wrapper, props.flag, s.blur)}
         style={{transition: props.isHoverTransition ? 'var(--side-move)' : 'var(--hover)'}}
      >
         {props.children}
      </div>
   );
};

export default OpenWithBodyBlur;