import { Request, Response } from 'express'
import { IPost } from '../interfaces'
import Posts from './model'

const getPosts = async (req: Request, res: Response) => {
  try {
    const posts = await Posts.find()
    return res.json({ posts })
  } catch (err) {
    return res.json({ error: 'Something went wrong' })
  }
}

const getPost = async (req: Request, res: Response) => {
  try {
    const post = await Posts.findOne({ _id: req.params.postId })
    return res.json({ post })
  } catch (err) {
    return res.json({ error: 'Something went wrong' })
  }
}

const createPost = async (req: Request<IPost>, res: Response) => {
  try {
    const post = await Posts.exists({ title: req.body.title })
    if (post !== null) {
      return res.json({ error: 'Please insert unique title' })
    }

    const newPost = await Posts.create(req.body)
    return res.json({ post: newPost })
  } catch (err) {
    return res.json({ error: 'Something went wrong' })
  }
}

const updatePost = async (req: Request, res: Response) => {
  try {
    const { acknowledged, modifiedCount } = await Posts.updateOne(
      { _id: req.params.postId },
      req.body,
    )
    return res.json({ success: acknowledged && modifiedCount === 1 })
  } catch (err) {
    return res.json({ error: 'Something went wrong' })
  }
}

const deletePost = async (req: Request, res: Response) => {
  try {
    const { deletedCount } = await Posts.deleteOne({ _id: req.params.postId })
    return res.json({ success: deletedCount === 1 })
  } catch (err) {
    return res.json({ error: 'Something went wrong' })
  }
}

export default {
  getPost,
  getPosts,
  createPost,
  updatePost,
  deletePost,
}
