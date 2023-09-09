import { NextFunction } from 'express'
import { isValidObjectId } from 'mongoose'
import { TPost, IRequestBody, TPostIdParam, IRequestParams, IResponse } from '../types'

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
