import React, { useCallback, useEffect, useRef, useState } from 'react';
import { conditionClass } from 'tools/functions';
import { useDisableScroll, useModal } from 'hooks';
import s from './Dropdown.module.scss';


type PropsType = {
   label: React.ReactElement
   showOn: 'hover' | 'click'
   initialPosition: 'top' | 'bottom'
   dropdownStyles?: React.CSSProperties
   isOverflow?: boolean
   trackVerticalPosition?: boolean
   closeOnBody?: boolean
}

export const Dropdown: React.FC<PropsType> = (props) => {
   const [isOpened, setIsOpened, dropdownBodyRef] = useModal<HTMLDivElement>();
   useDisableScroll(isOpened);
   const labelRef = useRef<HTMLButtonElement>(null);

   const [maxHeight, setMaxHeight] = useState(0);
   const [isTopPositioned, setIsTopPositioned] = useState(props.initialPosition === 'top');

   const calculateAndSetMaxHeight = useCallback(() => {
      if (isTopPositioned) {
         setMaxHeight(dropdownBodyRef.current?.getBoundingClientRect().bottom as number);
      } else {
         setMaxHeight(window.innerHeight - Math.abs(dropdownBodyRef.current?.getBoundingClientRect().top as number));
      }
   }, [isTopPositioned, setMaxHeight, dropdownBodyRef]);

   // sync maxHeight
   useEffect(() => {
      calculateAndSetMaxHeight();
   }, [isTopPositioned, calculateAndSetMaxHeight]);
   
   // runs some logic on each possible showOn event
   const eventCallbackCreator = (func?: () => void) => () => {
      func && func();
      if (props.trackVerticalPosition) {
         setIsTopPositioned(labelRef.current?.getBoundingClientRect().y as number > window.innerHeight / 2);
      }
      if (props.isOverflow) {
         calculateAndSetMaxHeight();
      }
   };

   // onClick event listener
   const toggleDropdownState = eventCallbackCreator(() => {
      setIsOpened(prev => !prev);
   });

   //  onMouseEnter event listener. sync position on hover if showOn=='hover'
   const hoverEventListener: any = {};
   if (props.showOn === 'hover') {
      hoverEventListener.onMouseEnter = eventCallbackCreator();
   }
   
   let dropdownBodyClassName = s.dropdownBody;
   if (props.showOn === 'click') {
      dropdownBodyClassName += ` ${s.clickIsEnabled}`
   }
   if (isOpened) {
      dropdownBodyClassName += ` ${s.clicked}`
   }
   if (props.trackVerticalPosition) {
      if (isTopPositioned) {
         dropdownBodyClassName += ` ${s.topPositioned}`
      } else {
         dropdownBodyClassName += ` ${s.bottomPositioned}`
      }
   } else {
      dropdownBodyClassName += ` ${s.defaultPositioned}`
   }
   if (props.isOverflow) {
      dropdownBodyClassName += ` ${s.overflow}`
   }

   return <>
      <div className={conditionClass(s.dropdown, props.showOn === 'hover', s.hoverIsEnabled)}>
         {/* Label element */}
         <button onClick={toggleDropdownState} {...hoverEventListener} className={s.label} ref={labelRef}>
            {props.label}
         </button>

         {/* Dropdown element */}
         <div
            ref={dropdownBodyRef}
            onClick={() => props.closeOnBody && setIsOpened(false)}
            className={dropdownBodyClassName}
            style={{
               maxHeight: props.isOverflow ? maxHeight : 'auto',
               ...props.dropdownStyles,
            }}
         >
            {props.children}
         </div>
      </div>
   </>;
}

export default Dropdown;