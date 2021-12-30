import { Container } from 'components/common';
import { Field, Form, Formik, FormikHelpers } from 'formik';
import { MenuBurger } from 'icons';
import React from 'react';
import s from './SubHeader.module.scss';
import arrow from 'images/arrow.svg';
import { SortBy } from 'tools/variables'


type PropsType = {
   eventsCount: number
   openFilters: () => void
   sortMode: string
   setSortMode: React.Dispatch<React.SetStateAction<string>>
}

const SubHeader: React.FC<PropsType> = (props) => {
   return (
      <div className={s.subHeader}>
         <Container className={s.container}>
            <h1 className={s.heading}>{props.eventsCount} active events</h1>
            <Sorting
               sortMode={props.sortMode}
               setSortMode={props.setSortMode}
            />
            <button onClick={props.openFilters} className={s.filters}>
               <span>Filter events</span>
               <MenuBurger size={20} />
            </button>
         </Container>
      </div>
   );
}


type SortingProps = {
   sortMode: string
   setSortMode: React.Dispatch<React.SetStateAction<string>>
}

const Sorting: React.FC<SortingProps> = (props) => {
   const handleChange = (event: any) => {
      props.setSortMode(event.target.value)
   }
   
   return (
      <select
         value={props.sortMode}
         onChange={handleChange}
         className={s.select}
         style={{backgroundImage: `url(${arrow})`}}
      >
         <option value={SortBy.NEWEST}>Newest</option>
         <option value={SortBy.OLDEST}>Oldest</option>
         <option value={SortBy.PRICE_UP}>Price Low to High</option>
         <option value={SortBy.PRICE_DOWN}>Price High to Low</option>
         <option value={SortBy.DATE_UP}>Date Low to High</option>
         <option value={SortBy.DATE_DOWN}>Date High to Low</option>
      </select>
   );
}

export default SubHeader;