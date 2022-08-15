export interface SignUpInputDto {
  name: string
  email: string
  phone: string
  password: string
  // rePassword: string
  acceptEmail: boolean
}

export type LoginInputDto = Pick<SignUpInputDto, 'email' | 'password'>

export type ForgotPasswordInputDto = Pick<SignUpInputDto, 'email'>

export type NewPasswordInputDto = Pick<SignUpInputDto, 'password'> & {
  rePassword: string
}
