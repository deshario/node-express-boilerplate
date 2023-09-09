import { Request, Response, NextFunction } from 'express'
import { isValidObjectId } from 'mongoose'
import { IPost } from '../interfaces'

export const validateNewPost = (req: Request<IPost>, res: Response, next: NextFunction) => {
  const { title, desc, author } = req.body
  if (!title || !desc || !author) {
    return res.status(400).json({ error: 'Please provide all required fields' })
  }
  return next()
}

export const validatePostId = (req: Request, res: Response, next: NextFunction) => {
  const { postId } = req.params
  if (!isValidObjectId(postId)) {
    return res.status(400).json({ error: 'Invalid postId detected' })
  }
  return next()
}
