type User = {
   id: number | null
   username: string
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