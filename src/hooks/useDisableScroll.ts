import { useEffect } from 'react';

export const useDisableScroll = (isDisabled: boolean) => {
   useEffect(() => {
      if (isDisabled) {
         document.body.classList.add('_disable-scroll');
      } else {
         document.body.classList.remove('_disable-scroll');
      }
      return () => {
         document.body.classList.remove('_disable-scroll');
      }
   }, [isDisabled]);
}