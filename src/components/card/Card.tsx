import React from 'react';
import s from './Card.module.scss';
import { Container, TransitionSkeleton } from 'components/common';
import { usePopUp } from 'hooks';
import EventPopUp from 'components/event-pop-up/EventPopUp';
import Category from 'components/category/Category';
import { timeToString } from 'tools/functions';


type PropsType = CatalogEvent

const EventCard: React.FC<PropsType> = (props) => {
   const [isOpened, setIsOpened, popUpRef] = usePopUp<HTMLDivElement>();

   return <>
      <div className={s.card} onClick={() => setIsOpened(true)}>
         <h5 className={s.title}>{props.name}</h5>
         <time className={s.time}>{timeToString(props.time)}</time>
         <div className={s.descriptionWrapper}>
            <p className={s.description}>{props.description}</p>
         </div>
         {props.price > 0 && (
            <p className={s.price}>Price: ${props.price}</p>
         )}
         <p className={s.people}>{props.people_joined}/{props.people_required} people – {props.people_required - props.people_joined} places left</p>
         <div className={s.categories}>
            {props.price === 0 && (
               <Category name='Free' color='green' />
            )}
            {props.categories.map(category => (
               <Category
                  key={category.id}
                  name={category.name}
                  color={category.color}
               />
            ))}
         </div>
      </div>
      <EventPopUp
         isOpened={isOpened}
         close={() => setIsOpened(false)}
         popUpRef={popUpRef}
         event={{
            ...props,
            time: timeToString(props.time)
         }}
      /> 
   </>;
}


export const EventCardSkeleton = () => {
   return (
      <div className={s.card}>
         <TransitionSkeleton width={'100%'} height={20} />
         <TransitionSkeleton width={'80%'} height={10} />
         <TransitionSkeleton width={'100%'} height={120} styles={{marginTop: 30}} />
         <TransitionSkeleton width={'50%'} height={10} styles={{marginTop: 20}} />
         <TransitionSkeleton width={'80%'} height={15} styles={{marginTop: 20}} />

         <div className={s.categories} style={{marginTop: 20}}>
            <TransitionSkeleton width={'30%'} height={30} />
            <TransitionSkeleton width={'55%'} height={30} styles={{marginTop: 0}} />
         </div>
      </div>
   );
}


export const CardsContainer: React.FC = ({ children }) => {
   return (
      <Container className={s.container}>
         {children}
      </Container>
   );
}

export default EventCard;