import { VerifyFunction } from 'passport-local'

export type TDoneCallback = Parameters<VerifyFunction>[2]

export type TExpressAuthUser = Express.User | false | null

export type TExpressAuthInfo = {
  message: string
}

export type TJwtPayload = {
  id: string
  email: string
  iat: number
  exp: number
}
