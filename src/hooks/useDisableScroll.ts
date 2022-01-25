import { useEffect, useContext, createContext } from 'react';

type ContextValues = {
   flagsCount: number
   setFlagsCount: React.Dispatch<React.SetStateAction<number>>
}

export const BodyDisabledContext = createContext<ContextValues>({
   flagsCount: 0,
   setFlagsCount: () => {},
})

export const useDisableScroll = (isDisabled: boolean) => {
   const { flagsCount, setFlagsCount } = useContext(BodyDisabledContext)

   useEffect(() => {
      if (isDisabled) {
         setFlagsCount(prev => prev += 1)
      } else {
         setFlagsCount(prev => prev > 0
            ? prev -= 1
            : prev
         )
      }
   }, [isDisabled]);

   useEffect(() => {
      if (flagsCount) {
         document.body.classList.add('_disable-scroll');
      } else {
         document.body.classList.remove('_disable-scroll');
      }
      
      return () => {
         document.body.classList.remove('_disable-scroll');
      }
   }, [flagsCount]);
}