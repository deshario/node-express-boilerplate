import passport from 'passport'
import { isValidObjectId } from 'mongoose'
import { Request, Response, NextFunction } from 'express'
import { TPost, IRequestBody, TPostIdParam, IRequestParams, IResponse } from '../interfaces'

export const validateNewPost = (
  req: IRequestBody<TPost>,
  res: IResponse<void>,
  next: NextFunction,
) => {
  const { title, desc, author } = req.body
  if (!title || !desc || !author) {
    return res.status(400).json({ success: false, error: 'Please provide all required fields' })
  }
  return next()
}

export const validatePostId = (
  req: IRequestParams<TPostIdParam>,
  res: IResponse<void>,
  next: NextFunction,
) => {
  const { postId } = req.params
  if (!isValidObjectId(postId)) {
    return res.status(400).json({ success: false, error: 'Invalid postId detected' })
  }
  return next()
}

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
