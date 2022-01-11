import { OpenWithBodyBlur } from 'components/common';
import { Cross } from 'icons';
import React from 'react';
import s from './ModalBody.module.scss';

type PropsType = {
   title: string
   width: number
   isOpened: boolean
   close: () => void
   innerRef: React.RefObject<HTMLDivElement>
};

const ModalBody: React.FC<PropsType> = (props) => {
   return (
      <OpenWithBodyBlur flag={props.isOpened}>
         <div
            ref={props.innerRef}
            className={s.body}
            style={{
               width: props.width
            }}
         >
            <div className={s.header}>
               <h5 className={s.title}>
                  {props.title}
               </h5>
               <button onClick={props.close}>
                  <Cross isHover />
               </button>
            </div>
            {props.children}
         </div>
      </OpenWithBodyBlur>
   );
};

export default ModalBody;