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

   
export function useQueryParams<F extends {[k: string]: undefined | string | boolean | number[]}>() {
   const [searchParams, setSearchParams] = useSearchParams();
   
   function getParam<P extends Params = Params.STRING>(param: keyof F, paramType?: P): ParamType<P>;
   function getParam(param: keyof F, paramType?: Params) {
      switch (paramType) {
         case Params.ARRAY: return searchParams.getAll(param as string) || []
         case Params.BOOLEAN:
            const match = searchParams.get(param as string) || 'false'
            return ['true', 'false'].includes(match) ? match === 'true' : match
         default: return searchParams.get(param as string) || ''
      }
   }

   const updateParams = (params: F) => {
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

      console.log(searchParams.toString());
      

      setSearchParams(searchParams)
   }

   return { getParam, updateParams }
}