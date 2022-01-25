import React from 'react';
import { useField } from 'formik';
import { useGetCategoriesQuery } from 'redux/eventsApi';
import { conditionClass, componentList } from 'tools/functions';
import s from './SelectCategories.module.scss';
import { OpenWithBodyBlur, TransitionSkeleton } from 'components/common';
import { Arrow } from 'icons';


type SelectProps = {
   as: 'modal' | 'aside'
   isOpened: boolean
   setIsOpened: (isOpened: boolean) => void
   modalRef: React.RefObject<HTMLDivElement>
   emptyStateName?: string
   styles?: React.CSSProperties
}

const SelectCategories: React.FC<SelectProps> = ({
   as: is,
   isOpened,
   setIsOpened,
   modalRef,
   emptyStateName='Nothing selected',
   styles,
}) => {
   const [
      {value: selectedCategories },
      { touched, error },
      { setValue }
   ] = useField<number[]>({name: 'categories'});

   const isError = Boolean(touched && error);

   const {
      data: categories=[],
      isLoading: isLoadingCategories
   } = useGetCategoriesQuery();

   return <>
      <div
         onClick={() => setIsOpened(true)}
         className={conditionClass(`${s.formLabel} greyOnInteract`, isError, s.error)}
         style={styles}
      >
         <p className={s.labelName}>
            Categories
         </p>
         <p className={s.selectedItems}>
            {selectedCategories.length
               ? categories.filter(category =>(
                  selectedCategories.includes(category.id)
               )).map(category => category.name).join(', ')
               : emptyStateName
            }
         </p>
         <Arrow
            direction='right'
            size={15}
            color='var(--grey)'
         />
      </div>
      {isError && (
         <div className={s.fieldError}>{error}</div>
      )}

      {is === 'modal'
         ? (
            <OpenWithBodyBlur flag={isOpened}>
               <div ref={modalRef} className={s.categoriesModal}>
                  <CategoriesSelection
                     close={() => setIsOpened(false)}
                     isLoading={isLoadingCategories}
                     selectedCategories={selectedCategories}
                     setSelectedCategories={setValue}
                     categories={categories}
                  />
               </div>
            </OpenWithBodyBlur>
         )
         : (
            <div ref={modalRef} className={conditionClass(s.categoriesSide, isOpened, s.opened)}>
               <CategoriesSelection
                  close={() => setIsOpened(false)}
                  isLoading={isLoadingCategories}
                  selectedCategories={selectedCategories}
                  setSelectedCategories={setValue}
                  categories={categories}
               />
            </div>
         )
      }
   </>;
}


type CategoriesSelectionProps = {
   close: () => void
   selectedCategories: number[]
   setSelectedCategories: (categories: number[]) => void
   categories: PopularCategory[]
   isLoading: boolean
}

export const CategoriesSelection: React.FC<CategoriesSelectionProps> = (props) => {  
   const handleCheckboxChange = (category: SmallCategory) => (event: React.ChangeEvent<HTMLInputElement>) => {
      const prev = [...props.selectedCategories]

      props.setSelectedCategories(
         event.target.checked
         ? [...prev, category.id]
         : prev.filter(categoryId => categoryId !== category.id)
      )
   }

   return (
      <div className={s.body}>
         <div className={s.selectionHeader}>
            <button onClick={props.close} className={s.backToFilters} type='button'>
               <Arrow size={16} direction='left' />
               <h3 className={s.heading}>Select categories</h3>
            </button>
            <button
               onClick={() => props.setSelectedCategories([])}
               className={`${s.resetCategories} greyOnInteract`}
               type='button'
            >
               reset
            </button>
         </div>

         <p className={s.incentive}>Mark categories that you are interested in</p>

         <h6 className={s.subHeading}>Popular</h6>
         {props.isLoading
            ? componentList(() => <TransitionSkeleton width={'60%'} height={15} />, 6)
            : props.categories?.filter(category => category.is_popular).map(category => (
               <CategoryCheckBox
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  onChange={handleCheckboxChange}
                  checked={props.selectedCategories.findIndex(categoryId => categoryId === category.id) > -1}
               />
            ))
         }

         <h6 className={s.subHeading}>By alphabet</h6>
         {props.isLoading
            ? componentList(() => <TransitionSkeleton width={'90%'} height={15} />, 19)
            : props.categories?.filter(category => !category.is_popular).map(category => (
               <CategoryCheckBox
                  key={category.id}
                  id={category.id}
                  name={category.name}
                  onChange={handleCheckboxChange}
                  checked={props.selectedCategories.findIndex(categoryId => categoryId === category.id) > -1}
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


export default SelectCategories;