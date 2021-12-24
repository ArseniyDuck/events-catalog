import React from 'react';
import s from './Card.module.scss';
import { Container, TransitionSkeleton } from 'components/common';


type PropsType = {
   title: string
   description: string
   photo: string | null
   time: string
   people_required: number
   people_joined: number
   place: string
   price: number
   categories: CategoryType[]
}

const EventCard: React.FC<PropsType> = (props) => {
   return (
      <div className={s.card}>
         <h5 className={s.title}>{props.title}</h5>
         <span className={s.time}>December 22, Wednesday</span>
         <p className={s.description}>{props.description}</p>
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
   );
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


const Category: React.FC<{name: string, color: string}> = ({ name, color }) => {
   return (
      <div className={s.category} style={{borderColor: color}}>
         <span style={{color: color}}>{name}</span>
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