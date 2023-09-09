import { Request } from 'express'
import {
  TPost,
  IResponse,
  TPostIdParam,
  IRequestBody,
  IRequestParams,
  IRequestParamsBody,
} from '../types'
import Posts from './model'

const getPosts = async (req: Request, res: IResponse<TPost[]>) => {
  try {
    const posts = await Posts.find()
    return res.json({ success: true, data: posts })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

const getPost = async (req: IRequestParams<TPostIdParam>, res: IResponse<TPost>) => {
  try {
    const post = await Posts.findOne({ _id: req.params.postId })
    if (!post) {
      return res.json({ success: false, error: 'Post not found' })
    }
    return res.json({ success: true, data: post })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

const createPost = async (req: IRequestBody<TPost>, res: IResponse<TPost>) => {
  try {
    const post = await Posts.exists({ title: req.body.title })
    if (post !== null) {
      return res.json({ success: false, error: 'Please insert unique title' })
    }
    const newPost = await Posts.create(req.body)
    return res.json({ success: true, data: newPost })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

const updatePost = async (req: IRequestParamsBody<TPostIdParam, TPost>, res: IResponse<void>) => {
  try {
    const { acknowledged, modifiedCount } = await Posts.updateOne(
      { _id: req.params.postId },
      req.body,
    )
    return res.json({ success: acknowledged && modifiedCount === 1 })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

const deletePost = async (req: Request, res: IResponse<void>) => {
  try {
    const { deletedCount } = await Posts.deleteOne({ _id: req.params.postId })
    return res.json({ success: deletedCount === 1 })
  } catch (err) {
    return res.json({ success: false, error: 'Something went wrong' })
  }
}

export default {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
}
