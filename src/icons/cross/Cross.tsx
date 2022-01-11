import React from 'react';
import s from './Cross.module.scss';
import { withIcon, WrappedIconType } from 'high-order-components';
import { conditionClass } from 'tools/functions';

type PropsType = {
   color?: string
   stroke?: number
   isHover?: boolean
};

const Cross: React.FC<PropsType & WrappedIconType> = ({ styles, color='#000', stroke=2, isHover=false }) => {
   return (
      <div className={conditionClass(s.cross, isHover, 'greyOnInteract')}>
         <svg style={styles} viewBox="0 0 28 29" fill="none" xmlns="http://www.w3.org/2000/svg">
            <line stroke={color} strokeWidth={stroke} x1="0.707107" y1="1.29289" x2="26.7834" y2="27.3692"/>
            <line stroke={color} strokeWidth={stroke} x1="1.21672" y1="27.6921" x2="27.293" y2="1.61577" />
         </svg>
      </div>
   );
};

export default withIcon(Cross);