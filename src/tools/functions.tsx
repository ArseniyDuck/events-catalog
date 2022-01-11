import React from 'react';
import { Route } from 'react-router';
import { RouteType } from 'app-routing';
import { API_URL, monthNames } from './variables';


export function conditionClass(initialClassName: string, condition: boolean, optionalClassName: string) {
   if (condition) {
      return `${initialClassName} ${optionalClassName}`
   } else {
      return initialClassName
   }
}

export function componentList(Component: React.ComponentType, count: number) {
   const components = []

   for (let i = 0; i < count; i++) {
      components.push(<Component key={i} />)
   }

   return components
}

export function composeRoutesFromArr(arr: RouteType[]) {
   return arr.map((r, i) => (
      <Route
         key={i}
         path={r.path}
         element={r.element}
      />
   ))
}

export function addLeadingZero(n: number) {
   return n < 10 ? `0${n}` : `${n}`
}

export function generateQueryString(params: {[k: string]: string | boolean | number[] | number}) {
   return Object.entries(params).reduce((acc, [paramName, paramValue]) => {
      switch (typeof paramValue) {
         // number[]
         case 'object': return paramValue.length ? (acc+=`&${paramName}=${paramValue.join('+')}`) : acc

         // string
         case 'number':
         case 'string': return paramValue ? (acc+=`&${paramName}=${String(paramValue)}`) : acc

         // boolean
         case 'boolean': return paramValue ? (acc+=`&${paramName}`) : acc
      }
   }, '');
}

export function phoneNumber(roughNumber: string) {
   if (!roughNumber) {
      return ''
   } else {
      const countryCode = roughNumber.slice(0, 2)
      const operator = roughNumber.slice(2, 5)
      const subscriberNumberFragmetns = [
         roughNumber.slice(5, 8),
         roughNumber.slice(8, 10),
         roughNumber.slice(10, 12),
      ]
   
      return `${countryCode} (${operator}) ${subscriberNumberFragmetns.join('-')}`
   }
}

function removeRedutantSlashes(url: string) {
   let returnString = url
   const lastIndex = url.length - 1

   if (url[lastIndex] === '/') {
      returnString = url.slice(0, lastIndex)
   }

   if (url[0] === '/') {
      returnString = url.slice(1, lastIndex + 1)
   }

   return returnString
}

export function imageUrl(relativePath: string) {
   let domain = removeRedutantSlashes(API_URL)
   let path = removeRedutantSlashes(relativePath)

   return `${domain}/${path}/`
}

export function timeToString(time: string) {
   const date = new Date(time);

   const month = monthNames[date.getMonth()]
   const dayNumber = date.getDate()
   const hours = addLeadingZero(date.getHours())
   const minutes = addLeadingZero(date.getMinutes())

   return `${month} ${dayNumber}, ${hours}:${minutes}`
}

export function getHighlightedText(text: string, highlight: string, highlightStyle: React.CSSProperties) {
   const fragments = text.split(new RegExp(`(${highlight})`, 'gi'));
   
   return <>
      {fragments.map((fragment, index) => {
         const isHighlighted = fragment.toLowerCase() === highlight.toLowerCase()
         
         return (
            <span key={index} style={isHighlighted ? highlightStyle : {}}>
               {fragment}
            </span>
         );
      })}
   </>;
}

export function requiredFields<T extends {[k: string]: string}>(
   values: {[k in keyof T]: string},
   ...fields: (keyof T)[]
): {}
export function requiredFields(values: {}, ...fields: []) {
   return fields.reduce((errors, field) => {
      if (!values[field]) {
         return {
            ...errors,
            [field]: 'This field is required!'
         }
      }
      return errors
   }, {});
}