import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { TExpressAuthUser, TExpressAuthInfo } from '../interfaces'
import { verifyRefreshToken } from '../services'

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

export const validateRefreshToken = (req: Request, res: Response, next: NextFunction) => {
  const payload = verifyRefreshToken(req.body.refreshToken)
  if (payload) {
    req.user = { _id: payload.id, email: payload.email }
    return next()
  } else {
    return res.status(401).json({ success: false, error: 'Invalid refresh token' })
  }
}
