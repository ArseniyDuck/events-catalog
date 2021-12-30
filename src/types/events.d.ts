type CatalogEvent = {
   id: number
   name: string
   description: string
   photo: string | null
   time: strnig
   people_required: number
   people_joined: number
   place: string
   price: number
   categories: Category[]
   creator: CalalogEventAuthor
}

type Category = {
   id: number
   name: string
   color: string
}

type CalalogEventAuthor = {
   id: number
   fullname: string
   phone_number: string
   photo: string | null
}

type PopularCategory = Category & {
   is_popular: boolean
}

type CalalogEventFilters = {
   search: string
   maxPrice: string
   peopleRequired: string
   availablePlaces: string
   onlyFree: boolean
   categories: number[]
}

type FilterQueryParams = {
   [P in keyof CalalogEventFilters]?: boolean | string | number[]
}

type SmallCategory = {
   id: number
   name: string
}