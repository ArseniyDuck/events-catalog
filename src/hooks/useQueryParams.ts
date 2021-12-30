import { useSearchParams } from 'react-router-dom';

export enum Params {
   STRING = 'string',
   ARRAY = 'array',
   BOOLEAN = 'boolean',
}

type ParamType<P extends Params> =
   P extends Params.ARRAY ? string[]
   : P extends Params.BOOLEAN ? boolean
   : string

export function useQueryParams() {
   const [searchParams, setSearchParams] = useSearchParams();

   function getParam<P extends Params = Params.STRING>(param: keyof QueryParamsType, paramType?: P): ParamType<P>;
   function getParam(param: keyof QueryParamsType, paramType?: Params) {
      switch (paramType) {
         case Params.ARRAY: return searchParams.getAll(param) || []
         case Params.BOOLEAN:
            const match = searchParams.get(param) || 'false'
            return ['true', 'false'].includes(match) ? match === 'true' : match
         default: return searchParams.get(param) || ''
      }
   }

   const updateParams = (params: QueryParamsType) => {
      for (const [param, paramValue] of Object.entries(params)) {
         if (paramValue instanceof Array) {
            searchParams.delete(param)
            for (let listParam of paramValue) {
               searchParams.append(param, String(listParam))
            }
         } else {
            if (String(paramValue)) {
               searchParams.set(param, String(paramValue))
            } else {
               searchParams.delete(param)
            }
         }
      }

      setSearchParams(searchParams)
   }

   return { getParam, updateParams }
}