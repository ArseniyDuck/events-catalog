type User = {
   id: number | null
   username: string
   fullname: string
   phone_number: string
   photo: string | null
   is_profile_notification_shown: boolean
}

type SignUpUser = {
   username: string,
   password1: string,
   password2: string
}

type UpdateUser = {
   first_name: string
   last_name: string
   phone_number: string
}

type RegistrationUser = {
   username: string
   password: string
}

type JWTTokens = {
   access: string,
   refresh: string
}