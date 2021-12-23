import { withIcon, WrappedIconType } from 'high-order-components';
import React from 'react';

type PropsType = {
   color?: string
};

const MenuBurger: React.FC<PropsType & WrappedIconType> = ({ styles, color }) => {
   return (
      <svg style={styles} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path d="M3 12H21" stroke={color ? color : '#000'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M3 6H21" stroke={color ? color : '#000'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         <path d="M3 18H21" stroke={color ? color : '#000'} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
   );
};

export default withIcon(MenuBurger);