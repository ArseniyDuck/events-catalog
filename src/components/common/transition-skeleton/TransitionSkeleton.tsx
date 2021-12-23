import React from 'react';
import s from './TransitionSkeleton.module.scss';

type PropsType = {
   width: number | string
   height: number | string
   styles?: React.CSSProperties
};

const TransitionSkeleton: React.FC<PropsType> = ({ width, height, ...props }) => {
   return (
      <div style={{ width, height, ...props.styles }} className={s.skeleton}>
         {props.children}
      </div>
   );
};

export default TransitionSkeleton;