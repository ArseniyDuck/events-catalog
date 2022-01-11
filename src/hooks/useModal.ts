import { useEffect, useRef, useState } from 'react';
import { useDisableScroll } from './useDisableScroll';

export const useModal = <E extends HTMLElement>() => {
   const [isOpened, setIsOpened] = useState<boolean>(false);
   const ref = useRef<E>(null);
   useDisableScroll(isOpened);
   
   useEffect(() => {
      const handleClick = (event: MouseEvent) => {
         if (ref.current) {
            const { top, bottom, left, right } = ref.current.getBoundingClientRect();
            // click was ouside
            if (isOpened && !((left <= event.x && event.x <= right) && (top <= event.y && event.y <= bottom))) {
               setIsOpened(false);
            }
         }
      }
      document.addEventListener('click', handleClick);
      return () => {
         document.removeEventListener('click', handleClick);
      }
   }, [isOpened]);

   return [isOpened, setIsOpened, ref] as const;
};