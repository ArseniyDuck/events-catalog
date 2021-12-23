import { useEffect, useRef, useState } from 'react';
import { useDisableScroll } from './useDisableScroll';

export const usePopUp = <E extends HTMLElement>() => {
   const [isPopUpOpened, setIsPopUpOpened] = useState<boolean>(false);
   const popUpRef = useRef<E>(null);
   useDisableScroll(isPopUpOpened);
   
   useEffect(() => {
      const handleClick = (event: MouseEvent) => {
         if (popUpRef.current) {
            const { top, bottom, left, right } = popUpRef.current.getBoundingClientRect();
            // click was ouside the popUpRef
            if (isPopUpOpened && !((left <= event.x && event.x <= right) && (top <= event.y && event.y <= bottom))) {
               setIsPopUpOpened(false);
            }
         }
      }
      document.addEventListener('click', handleClick);
      return () => {
         document.removeEventListener('click', handleClick);
      }
   }, [isPopUpOpened]);

   return [isPopUpOpened, setIsPopUpOpened, popUpRef] as const;
};