type EventType = {
   id: number
   name: string
   description: string
   photo: string | null
   time: strnig
   people_required: number
   people_joined: number
   place: string
   price: number
   categories: CategoryType[]
   creator: CreatorType
}

type CategoryType = {
   id: number
   name: string
   color: string
}

type CreatorType = {
   id: number
   fullname: string
   phone_number: string
   photo: string | null
}

type PopularCategoryType = CategoryType & {
   is_popular: boolean
}

type FilterType = {
   search: string
   price: string
   peopleRequired: string
   availablePlaces: string
   onlyFree: boolean
   categories: number[]
}

type QueryParamsType = {
   [P in keyof FilterType]?: boolean | string | number[]
}

type SmallCategoryType = {
   id: number
   name: string
}