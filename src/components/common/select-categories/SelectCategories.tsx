import { Arrow } from 'icons';
import React from 'react';
import { conditionClassName, getArrayOfComponents } from 'tools/functions';
import { TransitionSkeleton } from '..';
import s from './SelectCategories.module.scss';


type PropsType = {
   onClick: () => void,
   selectedCategories: string[]
}

export const CategoriesLabel: React.FC<PropsType> = ({selectedCategories: categories, onClick}) => {
   return (
      <div onClick={onClick} className={s.formLabel}>
         <p className={s.labelName}>Categories</p>
         <p className={s.selectedItems}>
            {categories.length ? categories.join(', ') : 'All'}
         </p>
         <Arrow direction='right' size={15} color='var(--grey)' />
      </div>
   );
}


type CategoriesSelectionProps = {
   isOpened: boolean
   close: () => void
   categoriesRef: React.RefObject<HTMLDivElement>
   selectedCategories: string[]
   setSelectedCategories: (categories: string[] | ((categories: string[]) => string[])) => void
   categories?: PopularCategoryType[]
   isLoading: boolean
}

export const CategoriesSelection: React.FC<CategoriesSelectionProps> = (props) => {  
   const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSelectedCategories(prev => (
         event.target.checked
         ? [...prev, event.target.value]
         : prev.filter(category => category !== event.target.value)
      ))
   }

   return (
      <div ref={props.categoriesRef} className={conditionClassName(s.body, props.isOpened, s.opened)}>
         <div className={s.selectionHeader}>
            <button onClick={props.close} className={s.backToFilters}>
               <Arrow size={20} direction='left' />
               <h3 className={s.heading}>Select categories</h3>
            </button>
            <button onClick={() => props.setSelectedCategories([])} className={s.resetCategories}>
               reset
            </button>
         </div>

         <h6 className={s.subHeading}>Popular</h6>
         {props.isLoading
            ? getArrayOfComponents(() => <TransitionSkeleton width={'60%'} height={15} />, 6)
            : props.categories?.filter(category => category.is_popular).map(category => (
               <CategoryCheckBox
                  key={category.id}
                  name={category.name}
                  onChange={handleCheckboxChange}
                  checked={props.selectedCategories.includes(category.name)}
               />
            ))
         }

         <h6 className={s.subHeading}>By alphabet</h6>
         {props.isLoading
            ? getArrayOfComponents(() => <TransitionSkeleton width={'90%'} height={15} />, 19)
            : props.categories?.filter(category => !category.is_popular).map(category => (
               <CategoryCheckBox
                  key={category.id}
                  name={category.name}
                  onChange={handleCheckboxChange}
                  checked={props.selectedCategories.includes(category.name)}
               />
            ))
         }
      </div>
   );
}


type CategoryCheckBoxProps = {
   name: string,
   onChange: (event: React.ChangeEvent<HTMLInputElement>) => void,
   checked: boolean 
}

const CategoryCheckBox: React.FC<CategoryCheckBoxProps> = (props) => {
   return (
      <label className={s.selectionLabel}>
         <input
            type='checkbox'
            value={props.name}
            onChange={props.onChange}
            className={s.selectionCheckBox}
            checked={props.checked}
            />
         {props.name}
      </label>
   );
}