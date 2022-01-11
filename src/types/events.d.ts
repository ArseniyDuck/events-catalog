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

type MyEvent = CatalogEvent & {
   is_active: boolean
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

type SmallCategory = {
   id: number
   name: string
}