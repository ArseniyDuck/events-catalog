import { Arrow } from 'icons';
import React from 'react';
import { conditionClassName, getArrayOfComponents } from 'tools/functions';
import { TransitionSkeleton } from '..';
import s from './SelectCategories.module.scss';


type PropsType = {
   onClick: () => void,
   selectedCategories: number[]
}

export const CategoriesLabel: React.FC<PropsType> = ({selectedCategories, onClick}) => {
   return (
      <div onClick={onClick} className={s.formLabel}>
         <p className={s.labelName}>Categories</p>
         <p className={s.selectedItems}>
            {selectedCategories.length ? selectedCategories.map(category => category).join(', ') : 'All'}
         </p>
         <Arrow direction='right' size={15} color='var(--grey)' />
      </div>
   );
}


type CategoriesSelectionProps = {
   isOpened: boolean
   close: () => void
   categoriesRef: React.RefObject<HTMLDivElement>
   selectedCategories: number[]
   setSelectedCategories: React.Dispatch<React.SetStateAction<number[]>>
   categories?: PopularCategory[]
   isLoading: boolean
}

export const CategoriesSelection: React.FC<CategoriesSelectionProps> = (props) => {  
   const handleCheckboxChange = (category: SmallCategory) => (event: React.ChangeEvent<HTMLInputElement>) => {
      props.setSelectedCategories(prev =>
         event.target.checked
         ? [...prev, category.id]
         : prev.filter(categoryId => categoryId !== category.id)
      )
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
                  id={category.id}
                  name={category.name}
                  onChange={handleCheckboxChange}
                  checked={props.selectedCategories.findIndex(categoryId => categoryId === category.id) !== -1}
               />
            ))
         }

         <h6 className={s.subHeading}>By alphabet</h6>
         {props.isLoading
            ? getArrayOfComponents(() => <TransitionSkeleton width={'90%'} height={15} />, 19)
            : props.categories?.filter(category => !category.is_popular).map(category => (
               <CategoryCheckBox
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  onChange={handleCheckboxChange}
                  checked={props.selectedCategories.findIndex(categoryId => categoryId === category.id) !== -1}
               />
            ))
         }
      </div>
   );
}


type CategoryCheckBoxProps = {
   id: number
   name: string
   onChange: (category: SmallCategory) => (event: React.ChangeEvent<HTMLInputElement>) => void
   checked: boolean 
}

const CategoryCheckBox: React.FC<CategoryCheckBoxProps> = (props) => {
   const category = {
      id: props.id,
      name: props.name,
   }

   return (
      <label className={s.selectionLabel}>
         <input
            type='checkbox'
            value={props.id}
            onChange={props.onChange(category)}
            className={s.selectionCheckBox}
            checked={props.checked}
            />
         {props.name}
      </label>
   );
}