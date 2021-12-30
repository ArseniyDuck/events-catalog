import React from 'react';
import { Route } from 'react-router';
import { RouteType } from 'app-routing';


export function conditionClassName(initialClassName: string, condition: Boolean, optionalClassName: string) {
   if (condition) {
      return `${initialClassName} ${optionalClassName}`;
   } else {
      return initialClassName;
   }
}

export function getArrayOfComponents(Component: React.ComponentType, count: number) {
   const components = [];
   for (let i = 0; i < count; i++) {
      components.push(<Component key={i} />);
   }
   return components;
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

export function generateQueryString(params: {[k: string]: string | boolean | number[]}) {
   return Object.entries(params).reduce((acc, [paramName, paramValue]) => {
      switch (typeof paramValue) {
         // number[]
         case 'object': return acc += paramValue.length ? `&${paramName}=${paramValue.join('+')}` : ''

         // string
         case 'string': return acc += paramValue && `&${paramName}=${paramValue}`

         // boolean
         case 'boolean': return acc += paramValue ? `&${paramName}` : ''
      }
   }, '');
}