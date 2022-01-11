import { withIcon, WrappedIconType } from 'high-order-components';
import React from 'react';
import s from './SuccessMark.module.scss';

type PropsType = {
   color?: string
};

const SuccessMark: React.FC<PropsType & WrappedIconType> = ({ styles, color }) => {
   return (
      <svg style={styles} viewBox="0 0 36 36" xmlns="http://www.w3.org/2000/svg">
         <path fill={color} d="M12.8,28.7l-9.5-9.5c-0.4-0.4-0.4-1.1,0-1.6l1.5-1.5c0.4-0.4,1.1-0.4,1.6,0l7.2,7.2   l16-16c0.4-0.4,1.1-0.4,1.6,0l1.5,1.5c0.4,0.4,0.4,1.1,0,1.6L14.4,28.7C13.9,29.1,13.2,29.1,12.8,28.7z" id="check_x5F_mark_1_"/>
      </svg>
   );
};

export default withIcon(SuccessMark);