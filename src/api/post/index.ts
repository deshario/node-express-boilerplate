import express from 'express'
import postsController from './controller'
import { validateSchema } from '../../middlewares'
import { newPostSchema, postIdSchema } from './schema'

const router = express.Router()

router.get('/', postsController.getPosts)
router.post('/', validateSchema(newPostSchema), postsController.createPost)
router.get('/:postId', validateSchema(postIdSchema, 'params'), postsController.getPost)
router.patch('/:postId', validateSchema(postIdSchema, 'params'), postsController.updatePost)
router.delete('/:postId', validateSchema(postIdSchema, 'params'), postsController.deletePost)

export default router
