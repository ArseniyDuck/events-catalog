import Category from 'components/category/Category';
import { BodyBlur } from 'components/common';
import React from 'react';
import { Link } from 'react-router-dom';
import { conditionClassName } from 'tools/functions';
import s from './EventPopUp.module.scss';

type PropsType = {
   isOpened: boolean
   close: () => void
   popUpRef: React.RefObject<HTMLDivElement>
   event: CatalogEvent
};

const EventPopUp: React.FC<PropsType> = (props) => {
   return (
      <BodyBlur isHoverTransition blurFlag={props.isOpened}>
         <div ref={props.popUpRef} className={conditionClassName(s.wrapper, props.isOpened, s.opened)}>
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
      </BodyBlur>
   );
};

export default EventPopUp;