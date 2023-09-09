import express from 'express'
import postsController from './controller'
import { validateNewPost, validatePostId } from '../middlewares/validators'

const router = express.Router()

router.get('/', postsController.getPosts)
router.post('/', validateNewPost, postsController.createPost)
router.get('/:postId', validatePostId, postsController.getPost)
router.patch('/:postId', validatePostId, postsController.updatePost)
router.delete('/:postId', validatePostId, postsController.deletePost)

export default router
