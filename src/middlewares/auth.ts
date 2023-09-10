import passport from 'passport'
import { Request, Response, NextFunction } from 'express'

export const checkAuthentication = (req: Request, res: Response, next: NextFunction) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  passport.authenticate('jwt', { session: false }, (err, user, info) => {
    if (err) return next(err)
    if (!user) {
      const error = info?.message || 'Not authenticated'
      return res.status(401).json({ error })
    }
    req.user = user
    next()
  })(req, res, next)
}
