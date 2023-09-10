import passport from 'passport'
import { Request, Response, NextFunction } from 'express'
import { IVerifyOptions } from 'passport-local'

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'jwt',
    { session: false },
    (err: unknown, user: Express.User | false, info: IVerifyOptions) => {
      if (err) return next(err)
      if (!user) {
        const error = info?.message || 'Not authenticated'
        return res.status(401).json({ error })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
  passport.authenticate(
    'local',
    (err: unknown, user: Express.User | false, info: IVerifyOptions) => {
      if (err) return next(err)
      if (!user) {
        return res.status(401).json({ success: false, error: info.message })
      }
      req.user = user
      return next()
    },
  )(req, res, next)
}
