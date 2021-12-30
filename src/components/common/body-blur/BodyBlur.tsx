import React from 'react';
import { conditionClassName } from 'tools/functions';
import s from './BodyBlur.module.scss';

type PropsType = {
   blurFlag: boolean
   isHoverTransition?: boolean
};

const BodyBlur: React.FC<PropsType> = (props) => {
   return (
      <div
         className={conditionClassName(s.wrapper, props.blurFlag, s.blur)}
         style={{transition: props.isHoverTransition ? 'var(--side-move)' : 'var(--hover)'}}
      >
         {props.children}
      </div>
   );
};

export default BodyBlur;