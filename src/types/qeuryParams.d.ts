type CalalogEventFilters = {
   search: string
   maxPrice: string
   peopleRequired: string
   availablePlaces: string
   onlyFree: boolean
   categories: number[]
}

type CalalogQueryParams = {
   [k in keyof CalalogEventFilters]?: boolean | string | number[]
}

type ProfileQueryParams = {
   search: string
}