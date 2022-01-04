type User = {
   id: number | null
   username: string
   fullname: string
   phone_number: string
   photo: string | null
}

type SignUpUser = {
   username: string,
   password1: string,
   password2: string
}

type RegistrationUser = {
   username: string
   password: string
}

type JWTTokens = {
   access: string,
   refresh: string
}