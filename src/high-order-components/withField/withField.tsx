import React from 'react';
import { Field } from 'formik';
import s from './withField.module.scss';
import { conditionClass } from 'tools/functions';


function withField<T extends {[k: string]: string}>() {
   type Props = {
      name: keyof T
      displayName: string
      placeholder?: string
      as?: 'textarea'
      type?: 'number' | 'datetime-local'
      error: string | undefined
      touched: boolean | undefined
   }

   const FieldComponent: React.FC<Props> & {Row: React.ComponentType} = ({
      as: is='input',
      type='string',
      ...props
   }) => {
      const isError = Boolean(props.error && props.touched)

      return (
         <div className={s.field}>
            <Field
               as={is}
               type={type}
               name={props.name}
               placeholder={props.placeholder || props.displayName}
               className={conditionClass(s.input, isError, s.error)}
            />
            <label className={s.label} htmlFor={props.name as string}>
               {props.displayName}
            </label>
            {isError && (
               <div className={s.error}>{props.error}</div>
            )}
         </div>
      );
   }

   const RowComponent: React.FC = (props) => {
      return (
         <div className={s.row}>
            {props.children}
         </div>
      );
   }

   FieldComponent.Row = RowComponent
   return FieldComponent
}

export default withField;