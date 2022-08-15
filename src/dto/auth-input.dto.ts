export type LoginInputDto = Pick<RegisterInputDto, 'email' | 'password'>

export interface RegisterInputDto {
  name: string
  email: string
  phone: string
  password: string
  // rePassword: string
  acceptEmail: boolean
}
