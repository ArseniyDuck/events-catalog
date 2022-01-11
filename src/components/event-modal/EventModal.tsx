import Category from 'components/category/Category';
import { OpenWithBodyBlur } from 'components/common';
import React from 'react';
import { Link } from 'react-router-dom';
import { conditionClass } from 'tools/functions';
import s from './EventModal.module.scss';

type PropsType = {
   isOpened: boolean
   close: () => void
   innerRef: React.RefObject<HTMLDivElement>
   event: CatalogEvent
};

const EventModal: React.FC<PropsType> = (props) => {
   return (
      <OpenWithBodyBlur isHoverTransition flag={props.isOpened}>
         <div ref={props.innerRef} className={conditionClass(s.wrapper, props.isOpened, s.opened)}>
            <p className={s.heading}>{props.event.name}</p>
            <time className={s.time}>{props.event.time}</time>
            <p className={s.description}>{props.event.description}</p>
            <table className={s.table}>
               <tbody>
                  <tr>
                     <th>Place</th>
                     <th>Price</th>
                     <th>Places left</th>
                  </tr>
                  <tr>
                     <td>{props.event.place}</td>
                     <td>{props.event.price > 0 ? `$${props.event.price}` : 'Free'}</td>
                     <td>{props.event.people_joined}/{props.event.people_required} people – {props.event.people_required - props.event.people_joined} places left</td>
                  </tr>
               </tbody>
            </table>
            <div className={s.bottom}>
               <div className={s.categoriesWrapper}>
                  <p className={s.categories}>Categories:</p>
                  <div className={s.categoriesContainer}>
                     {props.event.price === 0 && (
                        <Category name='Free' color='green' />
                     )}
                     {props.event.categories.map(category => (
                        <Category
                           key={category.id}
                           name={category.name}
                           color={category.color}
                        />
                     ))}
                  </div>
               </div>
               <div className={s.contactsWrapper}>
                  <p className={s.creator}>{props.event.creator.fullname}</p>
                  <a className={s.phone} href={`tel:${props.event.creator.phone_number}`}>
                     {props.event.creator.phone_number}
                  </a>
               </div>
            </div>
         </div>
      </OpenWithBodyBlur>
   );
};

export default EventModal;