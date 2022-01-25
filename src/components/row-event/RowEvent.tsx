import React from 'react';
import s from './RowEvent.module.scss';
import { getHighlightedText, timeToString } from 'tools/functions';
import { SuccessMark, Cross } from 'icons';
import { TransitionSkeleton } from 'components/common'
import { useModal } from 'hooks';
import EventForm from 'components/event-form/EventForm';


type RowEventProps = MyEvent & {
   searchTerm: string
}
const RowEvent: React.FC<RowEventProps> = (props) => {
   const [
      isEditOpened,
      setIsEditOpened,
      editRef
   ] = useModal<HTMLDivElement>();

   return <>
      <EventForm
         mode='edit'
         isOpened={isEditOpened}
         close={() => setIsEditOpened(false)}
         innerRef={editRef}
         onSubmit={() => {}}
         initialValues={{
            categories: props.categories.map(c => c.id),
            name: props.name,
            description: props.description,
            time: props.time,
            peopleJoined: String(props.people_required),
            peopleRequired: String(props.people_required),
            price: String(props.price),
            place: props.place,
         }}
      />

      <div
         onClick={() => setIsEditOpened(true)}
         className={`${s.eventRow} greyOnInteract`}
      >
         <p className={s.eventName}>
            {getHighlightedText(props.name, props.searchTerm, {
               background: 'var(--main-color)',
               color: '#fff'
            })}
         </p>
         <time dateTime={props.time} className={s.eventTime}>{timeToString(props.time)}</time>
         <span className={s.isActive}>
            {props.is_active
               ? 
                  <span className={s.true}>
                     <SuccessMark size={13} color='#fff' />
                  </span>
               : 
                  <span className={s.false}>
                     <Cross color='#fff' size={10} stroke={5} />
                  </span>
            }
         </span>
      </div>
   </>;
}


export const RowEventSkeleton: React.FC = (props) => {
   return (
      <div className={s.eventRow}>
         <div className={s.eventName}>
            <TransitionSkeleton width={250} height={20} />   
         </div>
         <div className={s.eventTime}>
            <TransitionSkeleton width={150} height={16} />
         </div>
         <div className={s.isActive}>
            <TransitionSkeleton
               width={20}
               height={20}
               styles={{
                  borderRadius: '50%'
               }}
            />
         </div>
      </div>
   );
}

export default RowEvent;