import jwt from 'jsonwebtoken'
import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { TExpressAuthUser, TExpressAuthInfo, TJwtPayload } from '../interfaces'
import env from '../config/environment'

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user?: TExpressAuthUser, info?: TExpressAuthInfo) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ success: false, error: info?.message || 'Invalid credentials' })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: unknown, user?: TExpressAuthUser, info?: TExpressAuthInfo) => {
      if (err || !user) {
        return res
          .status(401)
          .json({ success: false, error: info?.message || 'Invalid credentials' })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}

export const verifyRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const payload = jwt.verify(req.body.refreshToken, env.secret.refreshToken) as TJwtPayload
    req.user = { _id: payload.id, email: payload.email }
    return next()
  } catch (err) {
    return res.status(401).json({ success: false, error: 'Invalid refresh token' })
  }
}
