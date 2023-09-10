import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { TExpressAuthUser, TExpressAuthInfo } from '../interfaces'

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user?: TExpressAuthUser, info?: TExpressAuthInfo) => {
      if (err) return next(err)
      if (!user) {
        return res.status(401).json({ error: info?.message || 'Invalid credentials' })
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
      if (err) return next(err)
      if (!user) {
        return res.status(401).json({ error: info?.message || 'Invalid credentials' })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}
