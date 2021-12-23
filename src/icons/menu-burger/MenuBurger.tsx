import React from 'react';
import { withIcon, WrappedIconType } from 'high-order-components';

type PropsType = {
   color?: string
};

const MenuBurger: React.FC<PropsType & WrappedIconType> = ({ styles, color='#000' }) => {
   return (
      <svg style={styles} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
         <path stroke={color} d="M3 12H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         <path stroke={color} d="M3 6H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
         <path stroke={color} d="M3 18H21" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
   );
};

export default withIcon(MenuBurger);