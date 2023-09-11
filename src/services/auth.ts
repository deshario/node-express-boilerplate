import jwt from 'jsonwebtoken'
import env from '../config/environment'
import { TJwtSignPayload } from '../interfaces'

export const signAccessToken = (payload: TJwtSignPayload) => {
  return jwt.sign(payload, env.secret.accessToken, { expiresIn: '5m' })
}

export const signRefreshToken = (payload: TJwtSignPayload) => {
  return jwt.sign(payload, env.secret.refreshToken, { expiresIn: '7d' })
}

export const verifyRefreshToken = (refreshToken: string) => {
  try {
    return jwt.verify(refreshToken, env.secret.refreshToken) as TJwtSignPayload
  } catch (err) {
    return null
  }
}
