export const DefaultFilters: FilterType = {
   search: '',
   availablePlaces: '',
   peopleRequired: '',
   price: '',
   onlyFree: false,
   categories: []
}

export const SortBy = {
   OLDEST: 'id',
   NEWEST: '-id',
   PRICE_UP: 'price',
   PRICE_DOWN: '-price',
   DATE_UP: 'time',
   DATE_DOWN: '-time',
}

export const monthNames = [
   'January', 'February', 'March', 'April', 'May', 'June',
   'July', 'August', 'September', 'October', 'November', 'December'
];

export const unsafeMethods = ['OPTIONS', 'HEAD', 'GET', 'POST', 'PUT', 'DELETE', 'TRACE', 'CONNECT'];