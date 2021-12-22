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