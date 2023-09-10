import { IVerifyOptions } from 'passport-local'

export type TDoneCallback = (
  error: unknown,
  user?: Express.User | false,
  options?: IVerifyOptions,
) => void

export type TJwtPayload = {
  id: string
  email: string
  iat: number
  exp: number
}
